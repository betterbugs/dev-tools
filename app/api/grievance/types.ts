// Core types for the Verifiable OnGround Resolution System

export interface ResolutionProofToken {
  id: string;
  grievanceId: string;
  authorityId: string;
  geoFence: {
    latitude: number;
    longitude: number;
    radiusMeters: number;
  };
  validityWindow: {
    startTime: number;
    endTime: number;
  };
  nonce: string;
  signature: string;
  createdAt: number;
}

export interface GeoTemporalMetadata {
  latitude: number;
  longitude: number;
  timestamp: number;
  deviceFingerprint: string;
  accuracy?: number;
}

export interface EvidenceBundle {
  fileHash: string;
  metadata: GeoTemporalMetadata;
  tokenId: string;
  bundleSignature: string;
  uploadedAt: number;
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'verified' | 'reopened';
  citizenId: string;
  assignedAuthorityId?: string;
  createdAt: number;
  updatedAt: number;
  resolutionProof?: ResolutionProof;
}

export interface ResolutionProof {
  tokenId: string;
  evidenceBundle: EvidenceBundle;
  verificationStatus: {
    locationMatch: boolean;
    timestampValid: boolean;
    hashIntegrity: boolean;
    noReuse: boolean;
  };
  verifiedAt: number;
  citizenVerified: boolean;
}

export interface FraudDetectionResult {
  isFraudulent: boolean;
  reasons: string[];
  confidence: number;
  duplicateHashes?: string[];
}
