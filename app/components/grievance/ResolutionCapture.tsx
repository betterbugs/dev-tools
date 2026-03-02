'use client';
import { useState, useRef, useEffect } from 'react';
import { ResolutionProofToken } from '@/app/api/grievance/types';

interface ResolutionCaptureProps {
  token: ResolutionProofToken;
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
}

export default function ResolutionCapture({ token, onSuccess, onError }: ResolutionCaptureProps) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Request GPS permission and get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          onError(`GPS error: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      onError('Geolocation not supported');
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCapturing(true);
    } catch (error) {
      onError('Camera access denied');
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || !location) {
      onError('Camera or location not ready');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        onError('Failed to capture image');
        return;
      }

      await uploadEvidence(blob);
    }, 'image/jpeg', 0.95);
  };

  const uploadEvidence = async (blob: Blob) => {
    if (!location) {
      onError('Location not available');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', blob, 'evidence.jpg');
      formData.append('token', JSON.stringify(token));
      formData.append('latitude', location.latitude.toString());
      formData.append('longitude', location.longitude.toString());
      formData.append('timestamp', Date.now().toString());

      const response = await fetch('/api/grievance/submit-evidence', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.data);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      } else {
        onError(result.error || 'Upload failed');
      }
    } catch (error) {
      onError('Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resolution-capture">
      <div className="capture-header">
        <h3>Capture Resolution Evidence</h3>
        <p>Token expires in: {Math.floor((token.validityWindow.endTime - Date.now()) / 60000)} minutes</p>
      </div>

      {!location && (
        <div className="location-status">
          <p>⏳ Acquiring GPS location...</p>
        </div>
      )}

      {location && (
        <div className="location-status">
          <p>✓ Location acquired: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
        </div>
      )}

      {!capturing && location && (
        <button onClick={startCamera} className="btn-primary">
          Start Camera
        </button>
      )}

      {capturing && (
        <div className="camera-view">
          <video ref={videoRef} autoPlay playsInline />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <div className="camera-controls">
            <button onClick={capturePhoto} disabled={uploading} className="btn-capture">
              {uploading ? 'Uploading...' : 'Capture Evidence'}
            </button>
          </div>
        </div>
      )}

      <div className="capture-info">
        <p>⚠️ Evidence must be captured:</p>
        <ul>
          <li>Within {token.geoFence.radiusMeters}m of grievance location</li>
          <li>Within the token validity window</li>
          <li>Using device camera (no gallery uploads)</li>
        </ul>
      </div>
    </div>
  );
}
