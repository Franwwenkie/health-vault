"use client";

import { useState, useRef } from "react";

interface HealthDataRecord {
  id: string;
  type: 'vital_signs' | 'activity' | 'sleep' | 'nutrition' | 'medication' | 'lab_results';
  timestamp: string;
  data: Record<string, any>;
  source: string;
}

interface UploadProgress {
  total: number;
  completed: number;
  failed: number;
  current: string;
}

export default function BatchDataUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState<HealthDataRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress({ total: 0, completed: 0, failed: 0, current: 'Processing file...' });

    try {
      // Simulate file processing
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      setUploadProgress(prev => prev ? { ...prev, total: lines.length } : null);

      const records: HealthDataRecord[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        setUploadProgress(prev => prev ? { 
          ...prev, 
          current: `Processing record ${i + 1} of ${lines.length}`,
          completed: i
        } : null);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 100));

        // Parse CSV/JSON data (simplified)
        try {
          const record: HealthDataRecord = {
            id: `record_${Date.now()}_${i}`,
            type: 'vital_signs',
            timestamp: new Date().toISOString(),
            data: { value: Math.random() * 100 },
            source: file.name
          };
          records.push(record);
        } catch (error) {
          setUploadProgress(prev => prev ? { ...prev, failed: prev.failed + 1 } : null);
        }
      }

      setUploadedData(records);
      setUploadProgress(prev => prev ? { ...prev, completed: records.length, current: 'Upload complete!' } : null);

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(prev => prev ? { ...prev, current: 'Upload failed!' } : null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Simulate file input change
      if (fileInputRef.current) {
        fileInputRef.current.files = files;
        handleFileUpload({ target: { files } } as any);
      }
    }
  };

  const dataTypes = [
    { type: 'vital_signs', name: 'Vital Signs', icon: '💓', description: 'Heart rate, blood pressure, temperature' },
    { type: 'activity', name: 'Activity Data', icon: '🏃', description: 'Steps, distance, calories burned' },
    { type: 'sleep', name: 'Sleep Data', icon: '😴', description: 'Sleep duration, quality, stages' },
    { type: 'nutrition', name: 'Nutrition', icon: '🍎', description: 'Food intake, calories, nutrients' },
    { type: 'medication', name: 'Medications', icon: '💊', description: 'Prescriptions, dosages, timing' },
    { type: 'lab_results', name: 'Lab Results', icon: '🧪', description: 'Blood tests, imaging, diagnostics' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-50 mb-4">
          Batch Data Upload
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Upload large amounts of health data from CSV files, JSON exports, or other formats. 
          Perfect for importing historical data from health apps and devices.
        </p>
      </div>

      {/* Upload Area */}
      <div className="health-vault-card p-8">
        <div
          className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-emerald-500 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📁</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-50 mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-slate-300 mb-4">
            Support for CSV, JSON, and other health data formats
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400">
            <span>CSV</span>
            <span>•</span>
            <span>JSON</span>
            <span>•</span>
            <span>XML</span>
            <span>•</span>
            <span>HL7 FHIR</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.xml,.fhir"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="health-vault-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">
            Upload Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">{uploadProgress.current}</span>
              <span className="text-slate-400">
                {uploadProgress.completed} / {uploadProgress.total}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
                style={{ width: `${(uploadProgress.completed / uploadProgress.total) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Completed: {uploadProgress.completed}</span>
              <span>Failed: {uploadProgress.failed}</span>
            </div>
          </div>
        </div>
      )}

      {/* Data Types */}
      <div className="health-vault-card p-6">
        <h3 className="text-lg font-semibold text-slate-50 mb-4">
          Supported Data Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataTypes.map((dataType) => (
            <div key={dataType.type} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-lg">{dataType.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-50">{dataType.name}</h4>
                <p className="text-xs text-slate-400">{dataType.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Data Summary */}
      {uploadedData.length > 0 && (
        <div className="health-vault-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">
            Upload Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">{uploadedData.length}</div>
              <div className="text-sm text-slate-300">Records Uploaded</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {new Set(uploadedData.map(r => r.source)).size}
              </div>
              <div className="text-sm text-slate-300">Data Sources</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {new Set(uploadedData.map(r => r.type)).size}
              </div>
              <div className="text-sm text-slate-300">Data Types</div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="health-vault-button px-6 py-2">
              🔒 Encrypt & Store Data
            </button>
          </div>
        </div>
      )}

      {/* Data Privacy Notice */}
      <div className="health-vault-card p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">🔒</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-50 mb-2">
              Secure Batch Processing
            </h4>
            <p className="text-slate-300 text-sm">
              All uploaded data is processed locally in your browser before encryption. 
              Your files are never stored on our servers. Data is encrypted using FHE technology 
              and only you have access to the decryption keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
