import { FraudDetectionService } from '../services/fraudDetection';
import { EvidenceBundle } from '../types';

describe('FraudDetectionService', () => {
  beforeEach(() => {
    FraudDetectionService.clearStore();
  });

  describe('detectReuse', () => {
    it('should not flag first use of evidence', async () => {
      const result = await FraudDetectionService.detectReuse(
        'hash123',
        'grievance1',
        '28.6139,77.2090'
      );

      expect(result.isFraudulent).toBe(false);
      expect(result.reasons).toHaveLength(0);
    });

    it('should flag reused evidence', async () => {
      await FraudDetectionService.detectReuse('hash123', 'grievance1', '28.6139,77.2090');
      const result = await FraudDetectionService.detectReuse('hash123', 'grievance2', '28.6139,77.2090');

      expect(result.isFraudulent).toBe(true);
      expect(result.reasons).toContain('Evidence file reused across 2 grievances');
    });

    it('should flag evidence reused in different locations', async () => {
      await FraudDetectionService.detectReuse('hash123', 'grievance1', '28.6139,77.2090');
      const result = await FraudDetectionService.detectReuse('hash123', 'grievance2', '19.0760,72.8777');

      expect(result.isFraudulent).toBe(true);
      expect(result.reasons).toContain('Same evidence used in different locations');
    });
  });

  describe('detectMetadataAnomalies', () => {
    const createMockBundle = (overrides?: any): EvidenceBundle => ({
      fileHash: 'hash123',
      metadata: {
        latitude: 28.6139,
        longitude: 77.2090,
        timestamp: Date.now(),
        deviceFingerprint: 'device123',
        ...overrides,
      },
      tokenId: 'token123',
      bundleSignature: 'sig123',
      uploadedAt: Date.now(),
    });

    it('should not flag normal metadata', () => {
      const bundle = createMockBundle();
      const result = FraudDetectionService.detectMetadataAnomalies(bundle);

      expect(result.isFraudulent).toBe(false);
    });

    it('should flag suspiciously precise coordinates', () => {
      const bundle = createMockBundle({
        latitude: 28.613912345678901,
        longitude: 77.209012345678901,
      });
      const result = FraudDetectionService.detectMetadataAnomalies(bundle);

      expect(result.isFraudulent).toBe(true);
      expect(result.reasons).toContain('Suspiciously precise GPS coordinates');
    });

    it('should flag low GPS accuracy', () => {
      const bundle = createMockBundle({ accuracy: 150 });
      const result = FraudDetectionService.detectMetadataAnomalies(bundle);

      expect(result.isFraudulent).toBe(true);
      expect(result.reasons).toContain('GPS accuracy too low (>100m)');
    });

    it('should flag old timestamps', () => {
      const bundle = createMockBundle({
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      });
      const result = FraudDetectionService.detectMetadataAnomalies(bundle);

      expect(result.isFraudulent).toBe(true);
      expect(result.reasons).toContain('Evidence timestamp too old');
    });
  });

  describe('performFraudCheck', () => {
    it('should perform comprehensive fraud check', async () => {
      const bundle: EvidenceBundle = {
        fileHash: 'hash123',
        metadata: {
          latitude: 28.6139,
          longitude: 77.2090,
          timestamp: Date.now(),
          deviceFingerprint: 'device123',
        },
        tokenId: 'token123',
        bundleSignature: 'sig123',
        uploadedAt: Date.now(),
      };

      const result = await FraudDetectionService.performFraudCheck(
        bundle,
        'grievance1',
        '28.6139,77.2090'
      );

      expect(result.isFraudulent).toBe(false);
    });

    it('should detect multiple fraud indicators', async () => {
      const bundle: EvidenceBundle = {
        fileHash: 'hash123',
        metadata: {
          latitude: 28.613912345678901, // Too precise
          longitude: 77.209012345678901,
          timestamp: Date.now() - 2 * 60 * 60 * 1000, // Too old
          deviceFingerprint: 'device123',
        },
        tokenId: 'token123',
        bundleSignature: 'sig123',
        uploadedAt: Date.now(),
      };

      const result = await FraudDetectionService.performFraudCheck(
        bundle,
        'grievance1',
        '28.6139,77.2090'
      );

      expect(result.isFraudulent).toBe(true);
      expect(result.reasons.length).toBeGreaterThan(1);
    });
  });
});
