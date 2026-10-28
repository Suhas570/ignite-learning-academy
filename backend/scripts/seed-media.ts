import fs from "fs";
import path from "path";

const BASE_URL = process.env.PAYLOAD_URL || "http://127.0.0.1:3000";

async function seedMediaFromManifest() {
  console.log("=== SEEDING MEDIA FROM INSTAGRAM / MANIFEST ===");

  // 1. Authenticate with Payload Admin
  console.log("\n1. Authenticating as admin...");
  const authRes = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@igniteacademy.com",
      password: "Password123!@#",
    }),
  });

  if (!authRes.ok) {
    throw new Error(`Admin login failed with status ${authRes.status}`);
  }

  const { token } = await authRes.json();
  const authHeaders = {
    Authorization: `JWT ${token}`,
  };
  console.log("✓ Authenticated successfully with JWT token.");

  // 2. Locate manifest.json
  const candidateDirs = [
    "/tmp/ignite-real-media",
    "C:/tmp/ignite-real-media",
    path.resolve("./tmp/ignite-real-media"),
    path.resolve("../tmp/ignite-real-media"),
    "/tmp/ignite-seed-media",
    "C:/tmp/ignite-seed-media",
    path.resolve("./tmp/ignite-seed-media"),
    path.resolve("../tmp/ignite-seed-media"),
  ];

  let seedDir = "";
  let manifestPath = "";

  for (const d of candidateDirs) {
    const p = path.join(d, "manifest.json");
    if (fs.existsSync(p)) {
      seedDir = d;
      manifestPath = p;
      break;
    }
  }

  if (!manifestPath) {
    throw new Error("Could not locate manifest.json in any candidate /tmp directory.");
  }

  console.log(`\n2. Found manifest at: ${manifestPath}`);
  const manifestData = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  console.log(`Found ${manifestData.length} items to upload.\n`);

  // 3. Upload each item via REST API
  const uploadedResults: Array<{ id: string | number; title: string; category: string; status: string }> = [];

  for (let i = 0; i < manifestData.length; i++) {
    const item = manifestData[i];
    const filePath = path.join(seedDir, item.filename);

    console.log(`[${i + 1}/${manifestData.length}] Processing "${item.title}" (${item.mediaType || item.type})...`);

    const isVideo = (item.mediaType === "video" || (item.type && item.type.toLowerCase() === "video"));

    if (isVideo && item.videoUrl && !fs.existsSync(filePath)) {
      // External video URL via JSON
      const res = await fetch(`${BASE_URL}/api/media`, {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          description: item.caption || item.description,
          altText: item.altText || item.title,
          category: item.category || "courses",
          mediaType: "video",
          videoUrl: item.videoUrl,
          status: "published",
          order: i + 1,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.warn(`  ⚠️ Failed to create video record: ${err}`);
        continue;
      }

      const json = await res.json();
      const doc = json.doc || json;
      console.log(`  ✓ Created video (ID: ${doc.id})`);
      uploadedResults.push({ id: doc.id, title: doc.title, category: doc.category, status: doc.status });
    } else if (fs.existsSync(filePath)) {
      // File upload via multipart/form-data
      const fileBytes = fs.readFileSync(filePath);
      const isMp4 = item.filename.endsWith(".mp4");
      const mimeType = isMp4 ? "video/mp4" : "image/jpeg";
      const blob = new Blob([fileBytes], { type: mimeType });

      const form = new FormData();
      form.append("file", blob, item.filename);
      form.append(
        "_payload",
        JSON.stringify({
          title: item.title,
          description: item.caption || item.description,
          altText: item.altText || item.title,
          category: item.category || "courses",
          mediaType: isVideo ? "video" : "image",
          videoUrl: item.videoUrl || undefined,
          status: "published",
          order: i + 1,
        })
      );

      const res = await fetch(`${BASE_URL}/api/media`, {
        method: "POST",
        headers: authHeaders,
        body: form,
      });

      if (!res.ok) {
        const err = await res.text();
        console.warn(`  ⚠️ Upload failed (${res.status}): ${err}`);
        continue;
      }

      const json = await res.json();
      const doc = json.doc || json;
      console.log(`  ✓ Uploaded media file (ID: ${doc.id}) -> Category: ${doc.category}, Status: ${doc.status}`);
      uploadedResults.push({ id: doc.id, title: doc.title, category: doc.category, status: doc.status });
    } else {
      console.warn(`  ⚠️ File not found at ${filePath}, skipping.`);
    }
  }

  console.log("\n=== SEED SUMMARY ===");
  console.log(`Successfully seeded ${uploadedResults.length} published items to Payload Media collection:`);
  console.table(uploadedResults);
}

seedMediaFromManifest().catch((err) => {
  console.error("\nSeed script error:", err.message);
  process.exit(1);
});
