import { EvidenceHasher } from '../crypto/evidenceHasher';

describe('EvidenceHasher', () => {
  const mockFileBuffer = Buffer.from('test image data');
  const mockMetadata = {
    latitude: 28.6139,
    longitude: 77.2090,
    timestamp: Date.now(),
    deviceFingerprint: 'device-123',
  };
  const mockTokenId = 'token-456';

  describe('hashFile', () => {
    it('should generate consistent hash for same file', () => {
      const hash1 = EvidenceHasher.hashFile(mockFileBuffer);
      const hash2 = EvidenceHasher.hashFile(mockFileBuffer);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 hex length
    });

    it('should generate different hashes for different files', () => {
      const buffer1 = Buffer.from('file1');
      const buffer2 = Buffer.from('file2');

      const hash1 = EvidenceHasher.hashFile(buffer1);
      const hash2 = EvidenceHasher.hashFile(buffer2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('generateDeviceFingerprint', () => {
    it('should generate consistent fingerprint for same input', () => {
      const fp1 = EvidenceHasher.generateDeviceFingerprint('Mozilla/5.0');
      const fp2 = EvidenceHasher.generateDeviceFingerprint('Mozilla/5.0');

      expect(fp1).toBe(fp2);
    });

    it('should generate different fingerprints for different inputs', () => {
      const fp1 = EvidenceHasher.generateDeviceFingerprint('Mozilla/5.0');
      const fp2 = EvidenceHasher.generateDeviceFingerprint('Chrome/90.0');

      expect(fp1).not.toBe(fp2);
    });
  });

  describe('createEvidenceBundle', () => {
    it('should create valid evidence bundle', () => {
      const fileHash = EvidenceHasher.hashFile(mockFileBuffer);
      const bundle = EvidenceHasher.createEvidenceBundle(fileHash, mockMetadata, mockTokenId);

      expect(bundle.fileHash).toBe(fileHash);
      expect(bundle.metadata).toEqual(mockMetadata);
      expect(bundle.tokenId).toBe(mockTokenId);
      expect(bundle.bundleSignature).toBeDefined();
      expect(bundle.uploadedAt).toBeDefined();
    });
  });

  describe('verifyBundle', () => {
    it('should verify valid bundle', () => {
      const fileHash = EvidenceHasher.hashFile(mockFileBuffer);
      const bundle = EvidenceHasher.createEvidenceBundle(fileHash, mockMetadata, mockTokenId);

      const result = EvidenceHasher.verifyBundle(bundle);

      expect(result.valid).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    it('should reject tampered bundle', () => {
      const fileHash = EvidenceHasher.hashFile(mockFileBuffer);
      const bundle = EvidenceHasher.createEvidenceBundle(fileHash, mockMetadata, mockTokenId);
      
      // Tamper with metadata
      bundle.metadata.latitude = 99.9999;

      const result = EvidenceHasher.verifyBundle(bundle);

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Bundle signature mismatch');
    });
  });

  describe('verifyFileHash', () => {
    it('should verify matching file hash', () => {
      const hash = EvidenceHasher.hashFile(mockFileBuffer);
      const result = EvidenceHasher.verifyFileHash(mockFileBuffer, hash);

      expect(result).toBe(true);
    });

    it('should reject non-matching file hash', () => {
      const hash = EvidenceHasher.hashFile(mockFileBuffer);
      const differentBuffer = Buffer.from('different data');
      const result = EvidenceHasher.verifyFileHash(differentBuffer, hash);

      expect(result).toBe(false);
    });
  });
});
