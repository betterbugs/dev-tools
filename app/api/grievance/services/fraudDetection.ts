import { EvidenceBundle, FraudDetectionResult } from '../types';

// In-memory store for demo. In production, use database with indexes
const evidenceHashStore = new Map<string, Array<{ grievanceId: string; timestamp: number; location: string }>>();

export class FraudDetectionService {
  /**
   * Check for evidence reuse across grievances
   */
  static async detectReuse(
    fileHash: string,
    grievanceId: string,
    location: string
  ): Promise<FraudDetectionResult> {
    const existingUses = evidenceHashStore.get(fileHash) || [];
    const reasons: string[] = [];
    let isFraudulent = false;

    // Check for duplicate hash
    if (existingUses.length > 0) {
      isFraudulent = true;
      reasons.push(`Evidence file reused across ${existingUses.length + 1} grievances`);

      // Check for different locations
      const differentLocations = existingUses.filter(use => use.location !== location);
      if (differentLocations.length > 0) {
        reasons.push('Same evidence used in different locations');
      }
    }

    // Store this usage
    evidenceHashStore.set(fileHash, [
      ...existingUses,
      { grievanceId, timestamp: Date.now(), location },
    ]);

    return {
      isFraudulent,
      reasons,
      confidence: isFraudulent ? 0.95 : 0.0,
      duplicateHashes: isFraudulent ? existingUses.map(u => u.grievanceId) : undefined,
    };
  }

  /**
   * Detect metadata anomalies
   */
  static detectMetadataAnomalies(bundle: EvidenceBundle): FraudDetectionResult {
    const reasons: string[] = [];
    let isFraudulent = false;

    // Check for suspiciously precise coordinates (possible spoofing)
    const latDecimals = bundle.metadata.latitude.toString().split('.')[1]?.length || 0;
    const lonDecimals = bundle.metadata.longitude.toString().split('.')[1]?.length || 0;

    if (latDecimals > 8 || lonDecimals > 8) {
      reasons.push('Suspiciously precise GPS coordinates');
      isFraudulent = true;
    }

    // Check for low accuracy (if provided)
    if (bundle.metadata.accuracy && bundle.metadata.accuracy > 100) {
      reasons.push('GPS accuracy too low (>100m)');
      isFraudulent = true;
    }

    // Check timestamp is recent
    const timeDiff = Date.now() - bundle.metadata.timestamp;
    if (timeDiff > 60 * 60 * 1000) {
      // More than 1 hour old
      reasons.push('Evidence timestamp too old');
      isFraudulent = true;
    }

    return {
      isFraudulent,
      reasons,
      confidence: isFraudulent ? 0.7 : 0.0,
    };
  }

  /**
   * Comprehensive fraud check
   */
  static async performFraudCheck(
    bundle: EvidenceBundle,
    grievanceId: string,
    location: string
  ): Promise<FraudDetectionResult> {
    const reuseCheck = await this.detectReuse(bundle.fileHash, grievanceId, location);
    const metadataCheck = this.detectMetadataAnomalies(bundle);

    const allReasons = [...reuseCheck.reasons, ...metadataCheck.reasons];
    const isFraudulent = reuseCheck.isFraudulent || metadataCheck.isFraudulent;

    return {
      isFraudulent,
      reasons: allReasons,
      confidence: Math.max(reuseCheck.confidence, metadataCheck.confidence),
      duplicateHashes: reuseCheck.duplicateHashes,
    };
  }

  /**
   * Clear evidence store (for testing)
   */
  static clearStore(): void {
    evidenceHashStore.clear();
  }
}
