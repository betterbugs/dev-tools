'use client';
import { useState } from 'react';
import ResolutionCapture from './ResolutionCapture';
import CitizenVerification from './CitizenVerification';
import { ResolutionProofToken, EvidenceBundle } from '@/app/api/grievance/types';

interface GrievanceResolutionFlowProps {
  grievanceId: string;
  authorityId: string;
  grievanceLocation: { latitude: number; longitude: number; address: string };
  mode: 'authority' | 'citizen';
}

export default function GrievanceResolutionFlow({
  grievanceId,
  authorityId,
  grievanceLocation,
  mode,
}: GrievanceResolutionFlowProps) {
  const [token, setToken] = useState<ResolutionProofToken | null>(null);
  const [evidenceBundle, setEvidenceBundle] = useState<EvidenceBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/grievance/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grievanceId,
          authorityId,
          geoFence: {
            latitude: grievanceLocation.latitude,
            longitude: grievanceLocation.longitude,
            radiusMeters: 100, // 100m radius
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setToken(result.data.token);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate token');
    } finally {
      setLoading(false);
    }
  };

  const handleEvidenceSuccess = (result: any) => {
    setEvidenceBundle(result.evidenceBundle);
    setError(null);
  };

  const handleEvidenceError = (errorMsg: string) => {
    setError(errorMsg);
  };

  if (mode === 'authority') {
    return (
      <div className="resolution-flow authority-mode">
        <h2>Mark Grievance as Resolved</h2>
        <div className="grievance-info">
          <p><strong>Grievance ID:</strong> {grievanceId}</p>
          <p><strong>Location:</strong> {grievanceLocation.address}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!token && !evidenceBundle && (
          <button onClick={generateToken} disabled={loading} className="btn-primary">
            {loading ? 'Generating Token...' : 'Start Resolution Process'}
          </button>
        )}

        {token && !evidenceBundle && (
          <ResolutionCapture
            token={token}
            onSuccess={handleEvidenceSuccess}
            onError={handleEvidenceError}
          />
        )}

        {evidenceBundle && (
          <div className="success-message">
            <h3>✓ Resolution Evidence Submitted</h3>
            <p>Evidence has been cryptographically verified and stored.</p>
            <div className="evidence-summary">
              <p><strong>Hash:</strong> {evidenceBundle.fileHash.substring(0, 32)}...</p>
              <p><strong>Timestamp:</strong> {new Date(evidenceBundle.metadata.timestamp).toLocaleString()}</p>
              <p><strong>Status:</strong> Awaiting citizen verification</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Citizen mode
  return (
    <div className="resolution-flow citizen-mode">
      <h2>Verify Grievance Resolution</h2>
      <div className="grievance-info">
        <p><strong>Grievance ID:</strong> {grievanceId}</p>
        <p><strong>Location:</strong> {grievanceLocation.address}</p>
      </div>

      {evidenceBundle ? (
        <CitizenVerification
          evidenceBundle={evidenceBundle}
          grievanceLocation={grievanceLocation}
        />
      ) : (
        <div className="no-evidence">
          <p>No resolution evidence submitted yet.</p>
        </div>
      )}
    </div>
  );
}
