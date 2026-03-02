"use client";
import React, { useState, useMemo } from "react";
import bcrypt from 'bcryptjs';

// Custom styles for the range slider
const sliderStyles = `
  .slider-thumb::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3b82f6, #1d4ed8);
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
  }
  
  .slider-thumb::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
  
  .slider-thumb::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3b82f6, #1d4ed8);
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
  }
  
  .slider-thumb::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

const BcryptGenerator = () => {
  const [password, setPassword] = useState("");
  const [saltRounds, setSaltRounds] = useState(10);
  const [hashedPassword, setHashedPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyHashInput, setVerifyHashInput] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple bcrypt-like hash function (for demonstration - not cryptographically secure)
  const generateHash = async (text: string, rounds: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(rounds, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(text, salt, (err2, hash) => {
          if (err2) return reject(err2);
          resolve(hash);
        });
      });
    });
  };

  // Simple verification function (for demonstration)
  const verifyHash = async (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        bcrypt.compare(password, hash, (err, res) => {
          if (err) return resolve(false);
          resolve(Boolean(res));
        });
      } catch {
        resolve(false);
      }
    });
  };

  const handleGenerateHash = async () => {
    if (!password.trim()) return;
    
    setLoading(true);
    try {
      const hash = await generateHash(password, saltRounds);
      setHashedPassword(hash);
    } catch (error) {
      console.error('Error generating hash:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPassword = async () => {
    if (!verifyPassword.trim() || !verifyHashInput.trim()) return;
    
    setLoading(true);
    try {
      const isValid = await verifyHash(verifyPassword, verifyHashInput);
      setVerificationResult(isValid);
    } catch (error) {
      console.error('Error verifying password:', error);
      setVerificationResult(false);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setPassword("");
    setHashedPassword("");
    setVerifyPassword("");
    setVerifyHashInput("");
    setVerificationResult(null);
  };

  const samplePasswords = [
    "mypassword123",
    "SecurePass!2024",
    "admin@123",
    "user_password"
  ];

  const saltRoundInfo = useMemo(() => {
    const info = {
      4: "Very fast, not recommended for production",
      6: "Fast, acceptable for testing",
      10: "Good balance of security and performance (recommended)",
      12: "More secure, slower",
      14: "High security, very slow",
      16: "Maximum security, very slow"
    };
    return info[saltRounds as keyof typeof info] || "Custom rounds";
  }, [saltRounds]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto">
            <div className="flex flex-col gap-6 md:my-5 mt-2">
              {/* Main Content - Side by Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hash Generator Section */}
                <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-blue-400 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold">Generate Bcrypt Hash</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="block text-sm font-semibold mb-3 text-white/90">Password to Hash</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password..."
                          className="w-full px-4 py-3 bg-black border border-[#222222] rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <span className="text-white/40">🔒</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                      <label className="block text-sm font-semibold mb-3 text-white/90">
                        Security Level: {saltRounds} rounds
                        <span className="text-xs text-primary ml-2 font-normal">({saltRoundInfo})</span>
                      </label>
                      
                      <div className="relative">
                        <input
                          type="range"
                          min="4"
                          max="16"
                          value={saltRounds}
                          onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                          className="w-full h-2 bg-gradient-to-r from-primary via-primary to-primary rounded-lg appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-white/60 mt-2">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            Fast (4)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            Balanced (10)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            Secure (16)
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateHash}
                      disabled={!password.trim() || loading}
                      className="w-full text-black font-bold py-3 px-8 rounded-lg transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          Generating Hash...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>🔐</span>
                          Generate Hash
                        </div>
                      )}
                    </button>

                    {hashedPassword && (
                      <div className="mt-4 p-4 bg-primary/10 border border-primary rounded-xl">
                        <label className="block text-sm font-semibold mb-2 text-primary">Generated Hash</label>
                        <div className="flex gap-2">
                          <textarea
                            value={hashedPassword}
                            readOnly
                            className="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-xs font-mono resize-none focus:outline-none"
                            rows={3}
                          />
                          <button
                            onClick={() => copyToClipboard(hashedPassword)}
                            className="px-3 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300"
                            title="Copy to clipboard"
                          >
                            <span className="text-sm">📋</span>
                          </button>
                        </div>
                        <p className="text-xs text-primary/70 mt-1">Hash generated successfully!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Verification Section */}
                <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-emerald-400 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold">Verify Password</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="block text-sm font-semibold mb-3 text-white/90">Password to Verify</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={verifyPassword}
                          onChange={(e) => setVerifyPassword(e.target.value)}
                          placeholder="Enter password to verify..."
                          className="w-full px-4 py-3 bg-black border border-[#222222] rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <span className="text-white/40">🔍</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold mb-3 text-white/90">Bcrypt Hash</label>
                      <textarea
                        value={verifyHashInput}
                        onChange={(e) => setVerifyHashInput(e.target.value)}
                        placeholder="Paste the bcrypt hash to verify against..."
                        className="w-full px-4 py-3 bg-black border border-[#222222] rounded-xl text-white placeholder-white/50 focus:border-primary focus:outline-none resize-none font-mono text-sm"
                        rows={3}
                      />
                    </div>

                    <button
                      onClick={handleVerifyPassword}
                      disabled={!verifyPassword.trim() || !verifyHashInput.trim() || loading}
                      className="w-full text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Verifying...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>🔐</span>
                          Verify Password
                        </div>
                      )}
                    </button>

                    {verificationResult !== null && (
                      <div className={`p-4 rounded-xl border-2 ${
                        verificationResult 
                          ? "bg-primary/20 border-primary/50 text-primary" 
                          : "bg-red/20 border-red/50 text-red"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            verificationResult ? "bg-primary/30" : "bg-red/30"
                          }`}>
                            <span className="text-sm">{verificationResult ? "✅" : "❌"}</span>
                          </div>
                          <div>
                            <span className="font-semibold">
                              {verificationResult ? "Password Verified!" : "Verification Failed"}
                            </span>
                            <p className="text-xs opacity-80">
                              {verificationResult ? "The password matches the hash." : "The password does not match the provided hash."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sample Passwords */}
              <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-pink-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold">Quick Test Passwords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {samplePasswords.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setPassword(sample)}
                      className="px-3 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-white/60 mt-2">Click any password above to quickly test the hash generation</p>
              </div>

              {/* Actions */}
              <div className="flex justify-center">
                <button
                  onClick={clearAll}
                  className="text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] bg-red hover:bg-red/90 text-black"
                >
                  <div className="flex items-center gap-2 text-black">
                    Clear All
                  </div>
                </button>
              </div>

              {/* Information Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold">Features</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Generate bcrypt hashes with configurable salt rounds (4-16)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Verify passwords against existing bcrypt hashes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Real-time security level feedback and recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>One-click copy to clipboard functionality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Sample passwords for quick testing and demos</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-orange-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold">Security Tips</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use at least 10 salt rounds for production applications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Never store plain text passwords in your database</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>This is a demo implementation - use proper bcrypt libraries in production</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Higher salt rounds = more secure but slower processing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Always use HTTPS in production environments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BcryptGenerator;
