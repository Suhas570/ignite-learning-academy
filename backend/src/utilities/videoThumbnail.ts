import { spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * Returns the directory used to cache local video thumbnail JPEGs.
 */
export function getThumbnailsDir(): string {
  const dir = path.resolve(process.cwd(), 'seed-videos/thumbnails')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

/**
 * Extracts a single JPEG frame from a video file using FFmpeg.
 * Uses 1-second mark (or specified seekSeconds) with high JPEG quality (q:v 2).
 */
export function extractVideoFrame(
  videoPath: string,
  outputPath: string,
  seekSeconds = 1
): boolean {
  try {
    const parentDir = path.dirname(outputPath)
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true })
    }

    const res = spawnSync(
      'ffmpeg',
      [
        '-ss',
        String(seekSeconds),
        '-i',
        videoPath,
        '-vframes',
        '1',
        '-q:v',
        '2',
        outputPath,
        '-y',
      ],
      { stdio: 'ignore', timeout: 10000 }
    )

    return (
      res.status === 0 &&
      fs.existsSync(outputPath) &&
      fs.statSync(outputPath).size > 0
    )
  } catch (err) {
    console.error(`[VideoThumbnail] Failed to extract frame from ${videoPath}:`, err)
    return false
  }
}

/**
 * Converts a Cloudinary video URL to an automatic thumbnail image URL.
 * e.g., https://res.cloudinary.com/.../upload/v123/video.mp4 -> https://res.cloudinary.com/.../upload/so_auto,w_800,c_limit/video.jpg
 */
export function getCloudinaryThumbnailUrl(videoUrl: string): string {
  if (!videoUrl || !videoUrl.includes('cloudinary.com')) return ''
  return videoUrl.replace(/\.[a-zA-Z0-9]+$/, '.jpg')
}
