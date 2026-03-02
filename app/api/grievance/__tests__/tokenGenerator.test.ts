import { TokenGenerator } from '../crypto/tokenGenerator';

describe('TokenGenerator', () => {
  const mockGrievanceId = 'grievance-123';
  const mockAuthorityId = 'authority-456';
  const mockGeoFence = {
    latitude: 28.6139,
    longitude: 77.2090,
    radiusMeters: 100,
  };

  describe('generateToken', () => {
    it('should generate a valid token with all required fields', () => {
      const token = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);

      expect(token.id).toBeDefined();
      expect(token.grievanceId).toBe(mockGrievanceId);
      expect(token.authorityId).toBe(mockAuthorityId);
      expect(token.geoFence).toEqual(mockGeoFence);
      expect(token.nonce).toBeDefined();
      expect(token.signature).toBeDefined();
      expect(token.validityWindow.startTime).toBeLessThan(token.validityWindow.endTime);
    });

    it('should generate unique tokens', () => {
      const token1 = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);
      const token2 = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);

      expect(token1.id).not.toBe(token2.id);
      expect(token1.nonce).not.toBe(token2.nonce);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);
      const result = TokenGenerator.verifyToken(token);

      expect(result.valid).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    it('should reject token with invalid signature', () => {
      const token = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);
      token.signature = 'invalid-signature';

      const result = TokenGenerator.verifyToken(token);

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Invalid signature');
    });

    it('should reject expired token', () => {
      const token = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);
      token.validityWindow.endTime = Date.now() - 1000;

      const result = TokenGenerator.verifyToken(token);

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Token expired');
    });
  });

  describe('validateGeoFence', () => {
    it('should validate location within geo-fence', () => {
      const token = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);
      
      // Same location
      const result = TokenGenerator.validateGeoFence(
        token,
        mockGeoFence.latitude,
        mockGeoFence.longitude
      );

      expect(result.valid).toBe(true);
      expect(result.distance).toBeLessThan(1);
    });

    it('should reject location outside geo-fence', () => {
      const token = TokenGenerator.generateToken(mockGrievanceId, mockAuthorityId, mockGeoFence);
      
      // Location 1km away
      const result = TokenGenerator.validateGeoFence(token, 28.6239, 77.2190);

      expect(result.valid).toBe(false);
      expect(result.distance).toBeGreaterThan(100);
    });
  });

  describe('calculateDistance', () => {
    it('should calculate distance correctly', () => {
      const distance = TokenGenerator.calculateDistance(
        28.6139, 77.2090, // Delhi
        28.6239, 77.2190  // ~1.5km away
      );

      expect(distance).toBeGreaterThan(1000);
      expect(distance).toBeLessThan(2000);
    });

    it('should return 0 for same coordinates', () => {
      const distance = TokenGenerator.calculateDistance(
        28.6139, 77.2090,
        28.6139, 77.2090
      );

      expect(distance).toBeLessThan(1);
    });
  });
});
