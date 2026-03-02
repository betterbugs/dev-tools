# Verifiable OnGround Resolution System

## Overview

This system implements cryptographically verifiable, geo-temporally bound resolution proof for grievance platforms. It ensures that resolution evidence is authentic, tamper-proof, and independently verifiable by citizens.

## Architecture

### Core Components

1. **Resolution Proof Token (RPT)** - Cryptographically signed, time-limited tokens
2. **Geo-Temporal Evidence Capture** - Location and time-bound evidence collection
3. **Cryptographic Evidence Hashing** - SHA-256 hashing with bundle signing
4. **Citizen Verification Layer** - Public verification interface
5. **Anti-Fraud Detection** - Automated reuse and anomaly detection

## API Endpoints

### 1. Generate Token
```
POST /api/grievance/generate-token
```

**Request:**
```json
{
  "grievanceId": "string",
  "authorityId": "string",
  "geoFence": {
    "latitude": number,
    "longitude": number,
    "radiusMeters": number
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": ResolutionProofToken,
    "expiresIn": "15 minutes"
  }
}
```

### 2. Submit Evidence
```
POST /api/grievance/submit-evidence
```

**Request:** FormData
- `file`: Image/video file
- `token`: JSON string of ResolutionProofToken
- `latitude`: number
- `longitude`: number
- `timestamp`: number
- `accuracy`: number (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "evidenceBundle": EvidenceBundle,
    "verificationStatus": {
      "locationMatch": boolean,
      "timestampValid": boolean,
      "hashIntegrity": boolean,
      "noReuse": boolean
    }
  }
}
```

### 3. Verify Resolution
```
POST /api/grievance/verify-resolution
```

**Request:**
```json
{
  "evidenceBundle": EvidenceBundle
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": boolean,
    "evidenceHash": string,
    "location": { latitude, longitude },
    "capturedAt": string,
    "integrityStatus": string
  }
}
```

## Security Features

### 1. Token Security
- HMAC-SHA256 signing
- 15-minute validity window
- Single-use enforcement
- Nonce-based replay protection

### 2. Geo-Fence Validation
- Haversine formula for distance calculation
- Configurable radius (default: 100m)
- Real-time location verification

### 3. Evidence Integrity
- SHA-256 file hashing
- Immutable bundle signing
- Device fingerprinting
- Timestamp validation

### 4. Fraud Detection
- Duplicate hash detection
- Cross-grievance reuse prevention
- Metadata anomaly detection
- Location consistency checks

## Frontend Components

### 1. ResolutionCapture
Authority-facing component for capturing evidence:
- GPS permission enforcement
- Camera-only capture (no gallery)
- Real-time validation feedback
- Token expiry countdown

### 2. CitizenVerification
Citizen-facing verification interface:
- Evidence hash display
- Location match indicator
- Timestamp verification
- Cryptographic proof details

### 3. GrievanceResolutionFlow
Complete workflow orchestration:
- Token generation
- Evidence capture
- Verification display
- Error handling

## Usage Example

### Authority Flow
```typescript
// 1. Generate token
const token = await generateToken(grievanceId, authorityId, geoFence);

// 2. Capture evidence with token
<ResolutionCapture 
  token={token}
  onSuccess={handleSuccess}
  onError={handleError}
/>

// 3. Evidence automatically validated and stored
```

### Citizen Flow
```typescript
// View and verify resolution
<CitizenVerification
  evidenceBundle={bundle}
  grievanceLocation={location}
/>
```

## Configuration

### Environment Variables
```env
SERVER_PRIVATE_KEY=your-secure-key-here
TOKEN_VALIDITY_MINUTES=15
GEO_FENCE_RADIUS_METERS=100
```

### Production Considerations

1. **Key Management**: Use AWS KMS, Azure Key Vault, or similar
2. **Storage**: Integrate S3/Azure Blob for evidence files
3. **Database**: Add PostgreSQL with immutable audit tables
4. **Caching**: Use Redis for token expiry management
5. **Monitoring**: Add logging and alerting for fraud attempts

## Anti-Fraud Mechanisms

### Automatic Detection
- Duplicate file hashes across grievances
- Same evidence in different locations
- Suspiciously precise GPS coordinates
- Low GPS accuracy (>100m)
- Old timestamps (>1 hour)

### Escalation
Fraudulent submissions trigger:
- Automatic rejection
- Authority notification
- Audit log entry
- Escalation to supervisors

## Acceptance Criteria

✅ Grievance cannot be resolved without valid cryptographic proof  
✅ Evidence outside geo-fence is rejected  
✅ Reused media is automatically detected  
✅ Citizens can transparently verify authenticity  
✅ System scales without human moderation  

## Testing

### Unit Tests
```bash
npm test app/api/grievance
```

### Integration Tests
```bash
npm test:integration
```

### Manual Testing
1. Generate token via API
2. Capture evidence with valid location
3. Verify evidence integrity
4. Test fraud detection with duplicate hash
5. Verify citizen verification flow

## Future Enhancements

1. **Blockchain Integration**: Optional immutable audit trail
2. **Multi-Evidence Support**: Multiple photos/videos per resolution
3. **Video Analysis**: Automated scene verification
4. **ML Fraud Detection**: Advanced pattern recognition
5. **Mobile Apps**: Native iOS/Android apps with better GPS

## License

MIT

## Contributors

- Implementation for Issue #292
- VishwaGuru Platform
