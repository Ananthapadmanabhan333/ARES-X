"use client";

import React, { useState } from 'react';
import { Upload, ShieldCheck, FileType, Hash, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EvidenceIntake() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0); // 0: idle, 1: hashing, 2: scanning, 3: storing, 4: complete

  const handleUpload = () => {
    setIsUploading(true);
    setUploadStep(1);
    
    // Simulate forensic intake pipeline
    setTimeout(() => setUploadStep(2), 1500);
    setTimeout(() => setUploadStep(3), 3000);
    setTimeout(() => setUploadStep(4), 4500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Evidence Intake</h1>
        <p className="text-muted-foreground">Secure ingestion and cryptographic verification of digital evidence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="md:col-span-2 space-y-6">
          <div 
            className={cn(
              "border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center transition-all",
              isUploading ? "opacity-50 pointer-events-none" : "hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
            )}
            onClick={handleUpload}
          >
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drop evidence files here</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Support for raw images, memory dumps, disk clones, and multimedia files.
            </p>
            <div className="mt-8 flex gap-4">
              <FileTypeBadge label="IMG/ISO" />
              <FileTypeBadge label="PDF/DOC" />
              <FileTypeBadge label="MP4/MOV" />
              <FileTypeBadge label="PCAP" />
            </div>
          </div>

          {/* Guidelines */}
          <div className="cyber-panel p-6 bg-accent/20">
            <h4 className="font-semibold flex items-center gap-2 mb-4 text-sm">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Intake Protocol (Standard 800-101)
            </h4>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex gap-2">• SHA256 hashing performed at source before transmission.</li>
              <li className="flex gap-2">• All evidence is placed in an encrypted sandbox for quarantine scanning.</li>
              <li className="flex gap-2">• Metadata is extracted in a read-only environment to preserve temporal integrity.</li>
              <li className="flex gap-2">• Chain-of-custody is immutable and recorded on the forensic ledger.</li>
            </ul>
          </div>
        </div>

        {/* Status / Sidebar */}
        <div className="space-y-6">
          <div className="cyber-panel p-6">
            <h4 className="font-semibold mb-4 text-sm">Active Ingestion</h4>
            {!isUploading ? (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-xs text-muted-foreground">No active uploads in pipeline.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <PipelineStep 
                  icon={Hash} 
                  label="Cryptographic Hashing" 
                  status={uploadStep >= 1 ? (uploadStep > 1 ? 'complete' : 'active') : 'idle'} 
                />
                <PipelineStep 
                  icon={ShieldCheck} 
                  label="Integrity Verification" 
                  status={uploadStep >= 2 ? (uploadStep > 2 ? 'complete' : 'active') : 'idle'} 
                />
                <PipelineStep 
                  icon={FileType} 
                  label="Forensic Sandboxing" 
                  status={uploadStep >= 3 ? (uploadStep > 3 ? 'complete' : 'active') : 'idle'} 
                />
                
                {uploadStep === 4 && (
                  <div className="pt-4 border-t border-border mt-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-1" />
                      <p className="text-[10px] font-bold text-green-500">INGESTION SUCCESSFUL</p>
                      <p className="text-[8px] text-muted-foreground mt-1 font-mono">HASH: 7f83b1...e92c</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="cyber-panel p-6">
            <h4 className="font-semibold mb-4 text-sm">Evidence Vault Stats</h4>
            <div className="space-y-4">
              <VaultStat label="Total Volume" value="1.2 PB" />
              <VaultStat label="Encrypted Slices" value="14,294" />
              <VaultStat label="Verified Integrity" value="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileTypeBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-accent border border-border text-muted-foreground">
      {label}
    </span>
  );
}

interface PipelineStepProps {
  icon: any;
  label: string;
  status: 'idle' | 'active' | 'complete';
}

function PipelineStep({ icon: Icon, label, status }: PipelineStepProps) {
  const statusStyles = {
    idle: "text-muted-foreground opacity-50",
    active: "text-primary animate-pulse",
    complete: "text-green-500",
  };

  return (
    <div className={cn("flex items-center gap-3 transition-all", statusStyles[status])}>
      {status === 'active' ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Icon className="w-4 h-4" />
      )}
      <span className="text-xs font-medium">{label}</span>
      {status === 'complete' && <CheckCircle2 className="w-3 h-3 ml-auto" />}
    </div>
  );
}

function VaultStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="text-xs font-bold font-mono">{value}</span>
    </div>
  );
}
