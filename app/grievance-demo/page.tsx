'use client';
import { useState } from 'react';
import GrievanceResolutionFlow from '../components/grievance/GrievanceResolutionFlow';
import '../components/grievance/grievance.module.scss';

export default function GrievanceDemoPage() {
  const [mode, setMode] = useState<'authority' | 'citizen'>('authority');

  // Mock grievance data
  const mockGrievance = {
    id: 'GRV-DEMO-001',
    authorityId: 'AUTH-DEMO-123',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'Connaught Place, New Delhi, India',
    },
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>Verifiable OnGround Resolution System</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Cryptographic Proof & Geo-Temporal Validation Demo
        </p>
      </header>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button
          onClick={() => setMode('authority')}
          style={{
            padding: '0.75rem 1.5rem',
            margin: '0 0.5rem',
            background: mode === 'authority' ? '#007bff' : '#e0e0e0',
            color: mode === 'authority' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Authority View
        </button>
        <button
          onClick={() => setMode('citizen')}
          style={{
            padding: '0.75rem 1.5rem',
            margin: '0 0.5rem',
            background: mode === 'citizen' ? '#007bff' : '#e0e0e0',
            color: mode === 'citizen' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Citizen View
        </button>
      </div>

      <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0 }}>System Features:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ Cryptographically signed Resolution Proof Tokens (RPT)</li>
          <li>✅ Geo-fence validation (100m radius)</li>
          <li>✅ Time-bound evidence capture (15-minute window)</li>
          <li>✅ SHA-256 file hashing for integrity</li>
          <li>✅ Automatic fraud detection (reuse prevention)</li>
          <li>✅ Citizen verification layer</li>
          <li>✅ Device fingerprinting</li>
          <li>✅ Immutable evidence bundles</li>
        </ul>
      </div>

      <GrievanceResolutionFlow
        grievanceId={mockGrievance.id}
        authorityId={mockGrievance.authorityId}
        grievanceLocation={mockGrievance.location}
        mode={mode}
      />

      <footer style={{ marginTop: '3rem', padding: '2rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Implementation Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <h4>Backend APIs</h4>
            <ul style={{ fontSize: '0.9rem' }}>
              <li>POST /api/grievance/generate-token</li>
              <li>POST /api/grievance/submit-evidence</li>
              <li>POST /api/grievance/verify-resolution</li>
            </ul>
          </div>
          <div>
            <h4>Security Features</h4>
            <ul style={{ fontSize: '0.9rem' }}>
              <li>HMAC-SHA256 signing</li>
              <li>Replay attack prevention</li>
              <li>Geo-temporal validation</li>
              <li>Anti-fraud detection</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
          <strong>Note:</strong> This is a demonstration interface. In production, integrate with your existing
          grievance management system, authentication layer, and database.
        </div>
      </footer>
    </div>
  );
}
