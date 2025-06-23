import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { validateBookData } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ favorites })
  } catch (error: any) {
    console.error('Get favorites error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const bookValidation = validateBookData(body)
    if (!bookValidation.isValid) {
      return NextResponse.json(
        { error: bookValidation.message },
        { status: 400 }
      )
    }

    const { bookId, bookTitle, bookAuthor, bookCover } = body

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId: decoded.userId,
          bookId
        }
      }
    })

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Book already in favorites' },
        { status: 400 }
      )
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: decoded.userId,
        bookId,
        bookTitle,
        bookAuthor,
        bookCover
      }
    })

    return NextResponse.json({ favorite })
  } catch (error: any) {
    console.error('Add favorite error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const url = new URL(request.url)
    const bookId = url.searchParams.get('bookId')

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    await prisma.favorite.delete({
      where: {
        userId_bookId: {
          userId: decoded.userId,
          bookId
        }
      }
    })

    return NextResponse.json({ message: 'Favorite removed' })
  } catch (error: any) {
    console.error('Remove favorite error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}