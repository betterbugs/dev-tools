import { NextRequest, NextResponse } from 'next/server';
import { TokenGenerator } from '../crypto/tokenGenerator';
import { EvidenceHasher } from '../crypto/evidenceHasher';
import { FraudDetectionService } from '../services/fraudDetection';
import { ResolutionProofToken } from '../types';

/**
 * POST /api/grievance/submit-evidence
 * Submit resolution evidence with cryptographic proof
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const tokenData = formData.get('token') as string;
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);
    const timestamp = parseInt(formData.get('timestamp') as string);
    const accuracy = formData.get('accuracy') ? parseFloat(formData.get('accuracy') as string) : undefined;

    // Validate inputs
    if (!file || !tokenData || isNaN(latitude) || isNaN(longitude) || isNaN(timestamp)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const token: ResolutionProofToken = JSON.parse(tokenData);

    // Verify token validity
    const tokenVerification = TokenGenerator.verifyToken(token);
    if (!tokenVerification.valid) {
      return NextResponse.json(
        { success: false, error: `Token validation failed: ${tokenVerification.reason}` },
        { status: 401 }
      );
    }

    // Verify geo-fence compliance
    const geoValidation = TokenGenerator.validateGeoFence(token, latitude, longitude);
    if (!geoValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: `Location outside geo-fence. Distance: ${geoValidation.distance.toFixed(2)}m, Allowed: ${token.geoFence.radiusMeters}m`,
        },
        { status: 403 }
      );
    }

    // Verify timestamp is within token validity
    if (timestamp < token.validityWindow.startTime || timestamp > token.validityWindow.endTime) {
      return NextResponse.json(
        { success: false, error: 'Evidence timestamp outside token validity window' },
        { status: 403 }
      );
    }

    // Hash the file
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileHash = EvidenceHasher.hashFile(fileBuffer);

    // Generate device fingerprint
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const deviceFingerprint = EvidenceHasher.generateDeviceFingerprint(userAgent);

    // Create evidence bundle
    const evidenceBundle = EvidenceHasher.createEvidenceBundle(
      fileHash,
      { latitude, longitude, timestamp, deviceFingerprint, accuracy },
      token.id
    );

    // Perform fraud detection
    const fraudCheck = await FraudDetectionService.performFraudCheck(
      evidenceBundle,
      token.grievanceId,
      `${latitude},${longitude}`
    );

    if (fraudCheck.isFraudulent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Evidence failed fraud detection',
          fraudDetails: fraudCheck,
        },
        { status: 403 }
      );
    }

    // In production: Store file in object storage (S3, etc.) and bundle in database
    // For now, return success with verification details

    return NextResponse.json({
      success: true,
      data: {
        evidenceBundle,
        verificationStatus: {
          locationMatch: true,
          timestampValid: true,
          hashIntegrity: true,
          noReuse: true,
        },
        geoValidation: {
          distance: geoValidation.distance,
          withinFence: true,
        },
        message: 'Evidence submitted and verified successfully',
      },
    });
  } catch (error) {
    console.error('Evidence submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit evidence' },
      { status: 500 }
    );
  }
}
