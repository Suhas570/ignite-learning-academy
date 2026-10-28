import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = process.env.PAYLOAD_URL || 'http://127.0.0.1:3000'

async function replaceVideos() {
  console.log('=== TASK 1: REPLACING VIDEOS IN PAYLOAD MEDIA COLLECTION ===\n')

  // 1. Authenticate with Payload Admin
  console.log('1. Authenticating as admin...')
  const authRes = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@igniteacademy.com',
      password: 'Password123!@#',
    }),
  })

  if (!authRes.ok) {
    const err = await authRes.text()
    throw new Error(`Admin login failed (${authRes.status}): ${err}`)
  }

  const { token } = await authRes.json()
  const authHeaders = {
    Authorization: `JWT ${token}`,
  }
  console.log('✓ Successfully authenticated as Admin.\n')

  // 2. Fetch all media items
  console.log('2. Fetching existing media items...')
  const mediaRes = await fetch(`${BASE_URL}/api/media?limit=200`, {
    headers: authHeaders,
  })
  if (!mediaRes.ok) {
    throw new Error(`Failed to fetch media: ${mediaRes.status}`)
  }
  const mediaData = await mediaRes.json()
  const allDocs = mediaData.docs || []
  console.log(`Found ${allDocs.length} total media documents in collection.\n`)

  // 3. Separate videos and photos
  const videosToDelete = allDocs.filter((doc) => {
    const type = (doc.mediaType || '').toLowerCase()
    const isPhoto = type === 'image' && !doc.videoUrl
    if (isPhoto) return false
    return type === 'video' || Boolean(doc.videoUrl) || (doc.filename && doc.filename.endsWith('.mp4'))
  })

  const photosPreserved = allDocs.filter((doc) => !videosToDelete.includes(doc))

  console.log(`Preserving ${photosPreserved.length} photo media item(s):`)
  photosPreserved.forEach((p) => console.log(`  - [KEEP PHOTO] ID ${p.id}: "${p.title}"`))

  console.log(`\nDeleting ${videosToDelete.length} placeholder video item(s):`)
  for (const v of videosToDelete) {
    console.log(`  - [DELETING VIDEO] ID ${v.id}: "${v.title}" (${v.mediaType || 'video'})`)
    const delRes = await fetch(`${BASE_URL}/api/media/${v.id}`, {
      method: 'DELETE',
      headers: authHeaders,
    })
    if (!delRes.ok) {
      console.warn(`    ⚠️ Failed to delete ID ${v.id}: ${delRes.status}`)
    } else {
      console.log(`    ✓ Deleted ID ${v.id}`)
    }
  }

  // 4. Locate seed-videos folder
  const seedVideosDir = path.resolve(__dirname, '../seed-videos')
  if (!fs.existsSync(seedVideosDir)) {
    throw new Error(`seed-videos folder not found at: ${seedVideosDir}`)
  }

  const videoFiles = fs
    .readdirSync(seedVideosDir)
    .filter((f) => f.endsWith('.mp4'))

  console.log(`\n3. Found ${videoFiles.length} new compressed video(s) in seed-videos directory:`)
  videoFiles.forEach((f, i) => console.log(`  [${i + 1}] ${f}`))

  // 5. Upload each video file
  console.log('\n4. Uploading new videos to Payload Media collection...')
  const uploadedVideos = []

  for (let i = 0; i < videoFiles.length; i++) {
    const filename = videoFiles[i]
    const filePath = path.join(seedVideosDir, filename)
    const fileBytes = fs.readFileSync(filePath)
    const blob = new Blob([fileBytes], { type: 'video/mp4' })

    const title = filename.replace(/\.mp4$/i, '').trim()
    const safeFilename = filename.replace(/[^\w.-]/g, '_')

    const formData = new FormData()
    formData.append('file', blob, safeFilename)
    formData.append(
      '_payload',
      JSON.stringify({
        title: filename,
        altText: title,
        description: `Classroom demonstration and early educator training practicum: ${title}`,
        category: 'Classroom',
        mediaType: 'Video',
        status: 'published',
        order: i + 1,
      })
    )

    console.log(`\nUploading [${i + 1}/${videoFiles.length}]: "${title}" (${(fileBytes.length / (1024 * 1024)).toFixed(2)} MB)...`)
    const uploadRes = await fetch(`${BASE_URL}/api/media`, {
      method: 'POST',
      headers: authHeaders,
      body: formData,
    })

    if (!uploadRes.ok) {
      const errText = await uploadRes.text()
      console.error(`  ❌ Upload failed (${uploadRes.status}):`, errText)
      throw new Error(`Failed to upload ${filename}: ${errText}`)
    }

    const resJson = await uploadRes.json()
    const doc = resJson.doc || resJson
    console.log(`  ✓ Successfully uploaded ID ${doc.id}!`)
    console.log(`    URL: ${doc.url}`)
    console.log(`    Category: ${doc.category}, Status: ${doc.status}, MediaType: ${doc.mediaType}`)
    uploadedVideos.push({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      mediaType: doc.mediaType,
      status: doc.status,
      url: doc.url,
    })
  }

  console.log('\n=== VIDEO REPLACEMENT SUMMARY ===')
  console.log(`✓ Preserved photos: ${photosPreserved.length}`)
  console.log(`✓ Deleted old placeholder videos: ${videosToDelete.length}`)
  console.log(`✓ Uploaded new videos: ${uploadedVideos.length}`)
  console.table(uploadedVideos)
}

replaceVideos().catch((err) => {
  console.error('\nFatal error in replaceVideos:', err)
  process.exit(1)
})
