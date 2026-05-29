import { NextResponse } from 'next/server';
import { developmentToolsCategoryContent } from '@/app/libs/constants';

export const dynamic = 'force-static';

export async function GET() {
  console.log(
    'developmentToolsCategoryContent',
    developmentToolsCategoryContent
  );
  try {
    return NextResponse.json(
      {
        success: true,
        data: developmentToolsCategoryContent,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch development tools category content',
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
