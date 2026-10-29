import { Course, COURSES } from "@/data/courses";

export interface MediaItem {
  id: string | number;
  title: string;
  description?: string;
  altText: string;
  category: "general" | "campus" | "courses" | "events" | string;
  mediaType: "image" | "video";
  url?: string;
  videoUrl?: string;
  status: "draft" | "published";
  order?: number;
  width?: number;
  height?: number;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  thumbnailURL?: string;
  coverImage?: string | { url?: string };
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  whatsappNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    id?: string;
  }>;
}

export interface PaginatedMedia {
  docs: MediaItem[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Helper to construct absolute media URLs.
 * If URL is relative (e.g. /api/media/file/campus.png), prepends the Payload backend origin.
 */
export function resolveMediaUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("/gallery/") || url.startsWith("/hero/") || url.startsWith("/logo") || url.startsWith("/images/")) {
    return url;
  }
  const cleanBase = API_BASE_URL.replace(/\/+$/, "");
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Extracts a YouTube Video ID from any standard or shortened YouTube URL.
 */
export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Extracts Instagram shortcode and type (reel or p) from Instagram URL.
 */
export function extractInstagramShortcode(url?: string): { shortcode: string; type: "reel" | "p" } | null {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:[^\/]+\/)?(reel|p)\/([A-Za-z0-9_-]+)/i);
  return match ? { type: match[1].toLowerCase() as "reel" | "p", shortcode: match[2] } : null;
}

/**
 * Generates an optimized video thumbnail URL:
 * - If YouTube: Returns standard maxresdefault or hqdefault YouTube thumbnail.
 * - Otherwise: Returns resolved Cloudinary or direct image URL.
 */
export function getVideoThumbnail(item: MediaItem): string {
  // 1. If explicit thumbnailURL is provided by backend
  if (item.thumbnailURL) {
    return resolveMediaUrl(item.thumbnailURL);
  }

  // 2. If coverImage is provided (string or object)
  if (item.coverImage) {
    const coverUrl = typeof item.coverImage === "object" ? item.coverImage?.url : item.coverImage;
    if (coverUrl) return resolveMediaUrl(coverUrl);
  }

  // 3. YouTube thumbnail
  const ytId = extractYouTubeId(item.videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }

  // 4. Cloudinary video -> direct JPG frame extraction
  if (item.url) {
    if (item.url.includes("cloudinary.com") && (item.url.endsWith(".mp4") || item.url.includes("/video/upload/"))) {
      return item.url.replace(/\.[a-zA-Z0-9]+$/, ".jpg");
    }
    // 5. Local video -> point to backend thumbnail endpoint
    if (item.url.endsWith(".mp4")) {
      const filename = item.filename || item.url.split("/").pop();
      return resolveMediaUrl(`/api/media/thumbnail/${filename}.jpg`);
    }
    return resolveMediaUrl(item.url);
  }

  return "/logo.png";
}

/**
 * Fetches published photos (images) from Payload REST API with 60s cache revalidation.
 */
export async function getPublishedPhotos(): Promise<MediaItem[]> {
  try {
    const query = new URLSearchParams({
      "where[status][equals]": "published",
      sort: "-order,-createdAt",
      limit: "100",
    });

    const res = await fetch(`${API_BASE_URL}/api/media?${query.toString()}`, {
      next: { revalidate: 60, tags: ['media'] },
    });

    if (!res.ok) {
      console.warn(`[API] getPublishedPhotos failed with status ${res.status}`);
      return [];
    }

    const data: PaginatedMedia = await res.json();
    return (data.docs || []).filter(
      (item) =>
        item.mediaType?.toLowerCase() === "image" &&
        !item.videoUrl &&
        !item.filename?.endsWith(".mp4") &&
        Boolean(
          item.url &&
            (item.url.startsWith("http://") ||
              item.url.startsWith("https://") ||
              item.url.startsWith("/gallery/"))
        )
    );
  } catch (error) {
    console.error("[API] Error fetching published photos:", error);
    return [];
  }
}

/**
 * Fetches published videos from Payload REST API with 60s cache revalidation.
 */
export async function getPublishedVideos(): Promise<MediaItem[]> {
  try {
    const query = new URLSearchParams({
      "where[status][equals]": "published",
      sort: "-order,-createdAt",
      limit: "100",
    });

    const res = await fetch(`${API_BASE_URL}/api/media?${query.toString()}`, {
      next: { revalidate: 60, tags: ['media'] },
    });

    if (!res.ok) {
      console.warn(`[API] getPublishedVideos failed with status ${res.status}`);
      return [];
    }

    const data: PaginatedMedia = await res.json();
    return (data.docs || []).filter(
      (item) =>
        item.mediaType?.toLowerCase() === "video" ||
        Boolean(item.videoUrl) ||
        Boolean(item.filename && item.filename.endsWith(".mp4"))
    );
  } catch (error) {
    console.error("[API] Error fetching published videos:", error);
    return [];
  }
}

/**
 * Fetches published media filtered by category with 60s cache revalidation.
 */
export async function getMediaByCategory(category: string): Promise<MediaItem[]> {
  try {
    const params: Record<string, string> = {
      "where[status][equals]": "published",
      sort: "-order,-createdAt",
      limit: "100",
    };

    if (category && category !== "all") {
      params["where[category][equals]"] = category;
    }

    const query = new URLSearchParams(params);
    const res = await fetch(`${API_BASE_URL}/api/media?${query.toString()}`, {
      next: { revalidate: 60, tags: ['media'] },
    });

    if (!res.ok) {
      return [];
    }

    const data: PaginatedMedia = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error(`[API] Error fetching media for category ${category}:`, error);
    return [];
  }
}

/**
 * Fetches SiteSettings global data from Payload REST API with 60s cache revalidation.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/globals/site-settings`, {
      next: { revalidate: 60, tags: ['site-settings'] },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("[API] Error fetching site settings:", error);
    return null;
  }
}

/**
 * Fetches the 4 latest published videos from Payload API for the Home page Campus Life section.
 */
export async function getCampusLifeVideos(limit = 4): Promise<MediaItem[]> {
  try {
    const query = new URLSearchParams({
      "where[status][equals]": "published",
      "where[mediaType][equals]": "Video",
      sort: "-order,-createdAt",
      limit: String(limit),
    });

    const res = await fetch(`${API_BASE_URL}/api/media?${query.toString()}`, {
      next: { revalidate: 60, tags: ['media'] },
    });

    if (res.ok) {
      const data: PaginatedMedia = await res.json();
      if (data.docs && data.docs.length > 0) {
        return data.docs;
      }
    }
  } catch (error) {
    console.warn("[API] getCampusLifeVideos query failed, falling back to getPublishedVideos:", error);
  }

  const allVideos = await getPublishedVideos();
  return allVideos.slice(0, limit);
}

interface PayloadCourseDoc {
  id?: string | number;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  shortDescription?: string;
  duration?: string;
  eligibility?: string;
  mode?: string;
  badge?: string;
  featured?: boolean;
  syllabus?: Array<string | { module?: string; title?: string }>;
  learningOutcomes?: Array<string | { outcome?: string; title?: string }>;
  status?: string;
  [key: string]: unknown;
}

/**
 * Normalizes Payload CMS Course document into frontend Course interface.
 */
function mapPayloadCourseToCourse(doc: PayloadCourseDoc): Course {
  const isTeacher =
    doc.category === "Teacher Training" ||
    doc.category === "teachers" ||
    (doc.title && /teacher|ntt|play-based/i.test(doc.title));
  const cat: "students" | "teachers" = isTeacher ? "teachers" : "students";

  const syllabusStrings: string[] = Array.isArray(doc.syllabus)
    ? doc.syllabus
        .map((s) => (typeof s === "string" ? s : s?.module || s?.title || ""))
        .filter(Boolean)
    : [];

  const outcomeStrings: string[] = Array.isArray(doc.learningOutcomes)
    ? doc.learningOutcomes
        .map((o) => (typeof o === "string" ? o : o?.outcome || o?.title || ""))
        .filter(Boolean)
    : [];

  return {
    id: String(doc.id || doc.slug || ""),
    slug: doc.slug || String(doc.id || ""),
    title: doc.title || "Untitled Course",
    shortDescription: doc.shortDescription || doc.description?.slice(0, 160) || "",
    description: doc.description || "",
    duration: doc.duration || "",
    eligibility: doc.eligibility || "Open to all qualified applicants",
    mode: doc.mode || "Hybrid Classroom & Online",
    modules: syllabusStrings,
    syllabus: syllabusStrings,
    learningOutcomes: outcomeStrings,
    badge: doc.badge || (cat === "teachers" ? "Teacher Certification" : "Student Program"),
    featured: Boolean(doc.featured),
    category: cat,
  };
}

/**
 * Fetches all published courses from Payload REST API with 60s cache revalidation.
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const query = new URLSearchParams({
      "where[status][equals]": "Published",
      sort: "id",
      limit: "100",
    });

    const res = await fetch(`${API_BASE_URL}/api/courses?${query.toString()}`, {
      next: { revalidate: 60, tags: ['courses'] },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.docs) && data.docs.length > 0) {
        return data.docs.map(mapPayloadCourseToCourse);
      }
    }
  } catch (error) {
    console.warn("[API] getCourses query failed, using static fallback:", error);
  }

  return COURSES;
}

/**
 * Fetches a single course by its slug from Payload REST API with 60s cache revalidation.
 */
export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  try {
    const query = new URLSearchParams({
      "where[slug][equals]": slug,
      "where[status][equals]": "Published",
      limit: "1",
    });

    const res = await fetch(`${API_BASE_URL}/api/courses?${query.toString()}`, {
      next: { revalidate: 60, tags: ['courses', 'course-' + slug] },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.docs) && data.docs.length > 0) {
        return mapPayloadCourseToCourse(data.docs[0]);
      }
    }

    // Native /boost: check canonical slug if alias requested
    if (slug === "public-speaking-spoken-english-for-teachers") {
      const aliasQuery = new URLSearchParams({
        "where[slug][equals]": "communication-for-impact",
        "where[status][equals]": "Published",
        limit: "1",
      });
      const aliasRes = await fetch(`${API_BASE_URL}/api/courses?${aliasQuery.toString()}`, {
        next: { revalidate: 60, tags: ['courses', 'course-' + slug] },
      });
      if (aliasRes.ok) {
        const aliasData = await aliasRes.json();
        if (aliasData && Array.isArray(aliasData.docs) && aliasData.docs.length > 0) {
          return mapPayloadCourseToCourse(aliasData.docs[0]);
        }
      }
    }
  } catch (error) {
    console.warn(`[API] getCourseBySlug(${slug}) query failed, using static fallback:`, error);
  }

  // Fallback to static courses
  return COURSES.find(
    (c) =>
      c.slug === slug ||
      (c.id === "communication-for-impact" &&
        (slug === "public-speaking-spoken-english-for-teachers" ||
          slug === "public-speaking-and-spoken-english-for-teachers"))
  );
}

