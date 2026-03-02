'use client';
import { useState } from 'react';
import { EvidenceBundle } from '@/app/api/grievance/types';

interface CitizenVerificationProps {
  evidenceBundle: EvidenceBundle;
  grievanceLocation: { latitude: number; longitude: number };
}

export default function CitizenVerification({ evidenceBundle, grievanceLocation }: CitizenVerificationProps) {
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const verifyResolution = async () => {
    setVerifying(true);

    try {
      const response = await fetch('/api/grievance/verify-resolution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidenceBundle }),
      });

      const result = await response.json();
      setVerificationResult(result);
    } catch (error) {
      setVerificationResult({ success: false, error: 'Verification failed' });
    } finally {
      setVerifying(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const distance = calculateDistance(
    grievanceLocation.latitude,
    grievanceLocation.longitude,
    evidenceBundle.metadata.latitude,
    evidenceBundle.metadata.longitude
  );

  return (
    <div className="citizen-verification">
      <h3>Resolution Verification</h3>

      <div className="verification-details">
        <div className="detail-item">
          <span className="label">Evidence Hash:</span>
          <code className="hash">{evidenceBundle.fileHash.substring(0, 16)}...</code>
        </div>

        <div className="detail-item">
          <span className="label">Captured At:</span>
          <span>{new Date(evidenceBundle.metadata.timestamp).toLocaleString()}</span>
        </div>

        <div className="detail-item">
          <span className="label">Location Match:</span>
          <span className={distance < 100 ? 'status-good' : 'status-warning'}>
            {distance.toFixed(2)}m from grievance location
          </span>
        </div>

        <div className="detail-item">
          <span className="label">Uploaded At:</span>
          <span>{new Date(evidenceBundle.uploadedAt).toLocaleString()}</span>
        </div>

        <div className="detail-item">
          <span className="label">Device Fingerprint:</span>
          <code className="hash">{evidenceBundle.metadata.deviceFingerprint.substring(0, 16)}...</code>
        </div>
      </div>

      {!verificationResult && (
        <button onClick={verifyResolution} disabled={verifying} className="btn-verify">
          {verifying ? 'Verifying...' : 'Verify Resolution Authenticity'}
        </button>
      )}

      {verificationResult && (
        <div className={`verification-result ${verificationResult.success ? 'success' : 'error'}`}>
          {verificationResult.success ? (
            <>
              <div className="verified-badge">✓ VERIFIED</div>
              <p>{verificationResult.data.message}</p>
              <div className="verification-proof">
                <h4>Cryptographic Proof:</h4>
                <ul>
                  <li>Evidence integrity: Confirmed</li>
                  <li>Location validation: Passed</li>
                  <li>Timestamp validation: Passed</li>
                  <li>No reuse detected: Confirmed</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="error-badge">✗ VERIFICATION FAILED</div>
              <p>{verificationResult.error}</p>
            </>
          )}
        </div>
      )}

      <div className="transparency-info">
        <h4>Transparency Features:</h4>
        <ul>
          <li>All evidence is cryptographically signed</li>
          <li>Hash fingerprints prevent tampering</li>
          <li>Geo-temporal validation ensures authenticity</li>
          <li>Reuse detection prevents fraud</li>
        </ul>
      </div>
    </div>
  );
}
