import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const params = req.nextUrl.searchParams
  const keyword = params.get('q')

  // 必要なパラメータが提供されているか確認
  if (!keyword) {
    return new NextResponse('キーワードは必須です', { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const url = `https://www.googleapis.com/books/v1/volumes/?q=${keyword}&key=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return new NextResponse('Failed to fetch elevation data', { status: response.status })
    }

    const data = await response.json() // 型を指定

    return NextResponse.json(data) // 型に基づいたJSONレスポンス
  } catch (error) {
    console.error('Elevation API error:', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}
