import { NextRequest, NextResponse } from 'next/server';
import { TokenGenerator } from '../crypto/tokenGenerator';

/**
 * POST /api/grievance/generate-token
 * Generate a Resolution Proof Token for authority to mark grievance as resolved
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { grievanceId, authorityId, geoFence } = body;

    // Validate input
    if (!grievanceId || !authorityId || !geoFence) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!geoFence.latitude || !geoFence.longitude || !geoFence.radiusMeters) {
      return NextResponse.json(
        { success: false, error: 'Invalid geo-fence data' },
        { status: 400 }
      );
    }

    // Generate token
    const token = TokenGenerator.generateToken(grievanceId, authorityId, geoFence);

    return NextResponse.json({
      success: true,
      data: {
        token,
        expiresIn: '15 minutes',
        instructions: 'Use this token to capture evidence within the geo-fenced area',
      },
    });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
