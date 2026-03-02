import { NextRequest, NextResponse } from 'next/server';
import { EvidenceHasher } from '../crypto/evidenceHasher';
import { EvidenceBundle } from '../types';

/**
 * POST /api/grievance/verify-resolution
 * Citizen verification endpoint - allows citizens to verify resolution authenticity
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { evidenceBundle } = body;

    if (!evidenceBundle) {
      return NextResponse.json(
        { success: false, error: 'Evidence bundle required' },
        { status: 400 }
      );
    }

    const bundle: EvidenceBundle = evidenceBundle;

    // Verify bundle integrity
    const bundleVerification = EvidenceHasher.verifyBundle(bundle);
    if (!bundleVerification.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Evidence bundle integrity check failed',
          reason: bundleVerification.reason,
        },
        { status: 400 }
      );
    }

    // Return verification details for citizen review
    return NextResponse.json({
      success: true,
      data: {
        verified: true,
        evidenceHash: bundle.fileHash,
        location: {
          latitude: bundle.metadata.latitude,
          longitude: bundle.metadata.longitude,
        },
        capturedAt: new Date(bundle.metadata.timestamp).toISOString(),
        uploadedAt: new Date(bundle.uploadedAt).toISOString(),
        integrityStatus: 'VERIFIED',
        message: 'Resolution evidence is cryptographically verified and authentic',
      },
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify resolution' },
      { status: 500 }
    );
  }
}
