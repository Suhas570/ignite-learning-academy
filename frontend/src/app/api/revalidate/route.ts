import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

async function handleRevalidation(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  const expectedSecret =
    process.env.REVALIDATION_SECRET || 'dev-revalidate-secret-ignite-2026'

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Invalid or missing revalidation secret token' },
      { status: 401 }
    )
  }

  const path = searchParams.get('path')
  const tag = searchParams.get('tag')
  const items: string[] = []

  if (path) {
    revalidatePath(path)
    items.push(`path:${path}`)
  }

  if (tag) {
    revalidateTag(tag)
    items.push(`tag:${tag}`)
  }

  if (!path && !tag) {
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/courses')
    revalidatePath('/gallery')
    revalidatePath('/videos')
    items.push('layout:/', 'path:/courses', 'path:/gallery', 'path:/videos')
  }

  return NextResponse.json({
    revalidated: true,
    items,
    now: Date.now(),
  })
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request)
}

export async function POST(request: NextRequest) {
  return handleRevalidation(request)
}

