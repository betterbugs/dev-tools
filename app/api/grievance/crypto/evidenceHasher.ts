import crypto from 'crypto';
import { EvidenceBundle, GeoTemporalMetadata } from '../types';

const SERVER_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY || 'dev-private-key-replace-in-production';

export class EvidenceHasher {
  /**
   * Generate SHA-256 hash of file buffer
   */
  static hashFile(fileBuffer: Buffer): string {
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  }

  /**
   * Generate device fingerprint from user agent and other metadata
   */
  static generateDeviceFingerprint(userAgent: string, additionalData?: Record<string, any>): string {
    const data = JSON.stringify({
      userAgent,
      ...additionalData,
    });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Create evidence bundle with cryptographic proof
   */
  static createEvidenceBundle(
    fileHash: string,
    metadata: GeoTemporalMetadata,
    tokenId: string
  ): EvidenceBundle {
    const bundle: Omit<EvidenceBundle, 'bundleSignature' | 'uploadedAt'> = {
      fileHash,
      metadata,
      tokenId,
    };

    const bundleSignature = this.signBundle(bundle);

    return {
      ...bundle,
      bundleSignature,
      uploadedAt: Date.now(),
    };
  }

  /**
   * Sign evidence bundle
   */
  private static signBundle(bundle: Omit<EvidenceBundle, 'bundleSignature' | 'uploadedAt'>): string {
    const payload = JSON.stringify(bundle);
    const hmac = crypto.createHmac('sha256', SERVER_PRIVATE_KEY);
    hmac.update(payload);
    return hmac.digest('hex');
  }

  /**
   * Verify evidence bundle integrity
   */
  static verifyBundle(bundle: EvidenceBundle): { valid: boolean; reason?: string } {
    const { bundleSignature, uploadedAt, ...bundleWithoutSig } = bundle;
    const expectedSignature = this.signBundle(bundleWithoutSig);

    if (bundleSignature !== expectedSignature) {
      return { valid: false, reason: 'Bundle signature mismatch' };
    }

    return { valid: true };
  }

  /**
   * Verify file hash matches the actual file
   */
  static verifyFileHash(fileBuffer: Buffer, expectedHash: string): boolean {
    const actualHash = this.hashFile(fileBuffer);
    return actualHash === expectedHash;
  }
}
