import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://www.learnbycards.com/api/public/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = `${API_BASE_URL}/${path}${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await fetch(url, {
      headers: {
        accept: 'application/ld+json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Public API Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from public API' },
      { status: 500 }
    );
  }
}
