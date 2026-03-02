import crypto from 'crypto';
import { ResolutionProofToken } from '../types';

// In production, use environment variables and proper key management
const SERVER_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY || 'dev-private-key-replace-in-production';
const TOKEN_VALIDITY_MINUTES = 15;

export class TokenGenerator {
  /**
   * Generate a cryptographically signed Resolution Proof Token
   */
  static generateToken(
    grievanceId: string,
    authorityId: string,
    geoFence: { latitude: number; longitude: number; radiusMeters: number }
  ): ResolutionProofToken {
    const now = Date.now();
    const tokenId = crypto.randomUUID();
    const nonce = crypto.randomBytes(32).toString('hex');

    const token: Omit<ResolutionProofToken, 'signature'> = {
      id: tokenId,
      grievanceId,
      authorityId,
      geoFence,
      validityWindow: {
        startTime: now,
        endTime: now + TOKEN_VALIDITY_MINUTES * 60 * 1000,
      },
      nonce,
      createdAt: now,
    };

    // Sign the token payload
    const signature = this.signToken(token);

    return {
      ...token,
      signature,
    };
  }

  /**
   * Sign token using HMAC-SHA256
   */
  private static signToken(token: Omit<ResolutionProofToken, 'signature'>): string {
    const payload = JSON.stringify(token);
    const hmac = crypto.createHmac('sha256', SERVER_PRIVATE_KEY);
    hmac.update(payload);
    return hmac.digest('hex');
  }

  /**
   * Verify token signature and validity
   */
  static verifyToken(token: ResolutionProofToken): { valid: boolean; reason?: string } {
    // Check expiry
    const now = Date.now();
    if (now > token.validityWindow.endTime) {
      return { valid: false, reason: 'Token expired' };
    }

    if (now < token.validityWindow.startTime) {
      return { valid: false, reason: 'Token not yet valid' };
    }

    // Verify signature
    const { signature, ...tokenWithoutSig } = token;
    const expectedSignature = this.signToken(tokenWithoutSig);

    if (signature !== expectedSignature) {
      return { valid: false, reason: 'Invalid signature' };
    }

    return { valid: true };
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  /**
   * Validate geo-fence compliance
   */
  static validateGeoFence(
    token: ResolutionProofToken,
    actualLat: number,
    actualLon: number
  ): { valid: boolean; distance: number } {
    const distance = this.calculateDistance(
      token.geoFence.latitude,
      token.geoFence.longitude,
      actualLat,
      actualLon
    );

    return {
      valid: distance <= token.geoFence.radiusMeters,
      distance,
    };
  }
}
