"use client";

import React, { useState } from 'react';
import { 
  Scan, 
  Image as ImageIcon, 
  Info, 
  Layers, 
  Target, 
  AlertCircle,
  Download,
  Share2,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForensicLab() {
  const [activeLayer, setActiveLayer] = useState('original'); // original, ela, high-pass, noise

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forensic Media Lab</h1>
          <p className="text-muted-foreground">Advanced manipulation detection and artifact analysis.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-xs font-medium hover:bg-accent">
            <Download className="w-3 h-3" />
            Export Lab Report
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Scan className="w-4 h-4" />
            New Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analysis Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="cyber-panel relative aspect-video bg-black overflow-hidden group">
            {/* Mock Image Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              {activeLayer === 'original' && (
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
              )}
              {activeLayer === 'ela' && (
                <div className="w-full h-full bg-[#050505] flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-primary/20 bg-primary/5 relative">
                     {/* Mock ELA noise */}
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:4px_4px]" />
                     <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                     <div className="absolute top-10 left-10 text-[10px] font-mono text-primary/50">ELA OFFSET: 95%</div>
                  </div>
                </div>
              )}
              {activeLayer === 'noise' && (
                <div className="w-full h-full bg-[#111] opacity-50 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              )}
            </div>

            {/* Overlays */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono">
                COORD: 40.7128° N, 74.0060° W
              </span>
              <span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono">
                ISO: 800 | F/2.8 | 1/125s
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
               <button className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded hover:bg-primary/20 transition-colors">
                 <Layers className="w-4 h-4" />
               </button>
            </div>
            
            {/* Detection Reticle (Mock) */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 border border-red-500/40 pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-red-500" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-red-500" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-red-500" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-red-500" />
              <div className="absolute top-0 right-0 -translate-y-full text-[8px] font-bold text-red-500 uppercase py-1">
                Anomaly: Synthetically Generated (92%)
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <LayerButton 
              active={activeLayer === 'original'} 
              onClick={() => setActiveLayer('original')} 
              label="Visual Spectrum" 
            />
            <LayerButton 
              active={activeLayer === 'ela'} 
              onClick={() => setActiveLayer('ela')} 
              label="Error Level (ELA)" 
            />
            <LayerButton 
              active={activeLayer === 'noise'} 
              onClick={() => setActiveLayer('noise')} 
              label="Noise Variance" 
            />
            <LayerButton 
              active={activeLayer === 'high-pass'} 
              onClick={() => setActiveLayer('high-pass')} 
              label="Frequency Analysis" 
            />
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <div className="cyber-panel p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm">
              <Cpu className="w-4 h-4 text-primary" />
              AI Reasoning Engine
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-[11px] leading-relaxed italic text-muted-foreground">
                  "Localized JPEG quantization inconsistencies, abnormal high-frequency distributions, and asymmetric facial texture smoothing indicate probable synthetic modification in the lower facial region."
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase">Confidence Score</span>
                  <span className="text-sm font-bold text-primary">94.8%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Findings Checklist</h4>
                <ChecklistItem label="DCT Block Alignment Anomaly" status="danger" />
                <ChecklistItem label="Metadata Temporal Inconsistency" status="warning" />
                <ChecklistItem label="GAN Artifact Signature" status="danger" />
                <ChecklistItem label="Illumination Vector Match" status="success" />
              </div>
            </div>
          </div>

          <div className="cyber-panel p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm">
              <Info className="w-4 h-4 text-primary" />
              Evidence Metadata
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">FILENAME</span>
                <span className="text-foreground">CCTV_VALT_04.MP4</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">SHA256</span>
                <span className="text-foreground">8F23...92A1</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">CAMERA</span>
                <span className="text-foreground">AXIS Q1615</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">MIME</span>
                <span className="text-foreground">video/mp4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LayerButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function LayerButton({ active, onClick, label }: LayerButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 py-2 px-4 rounded text-[10px] font-bold uppercase transition-all border",
        active 
          ? "bg-primary text-white border-primary" 
          : "bg-accent text-muted-foreground border-border hover:bg-accent/80"
      )}
    >
      {label}
    </button>
  );
}

interface ChecklistItemProps {
  label: string;
  status: 'danger' | 'warning' | 'success';
}

function ChecklistItem({ label, status }: ChecklistItemProps) {
  const statusColors = {
    danger: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-1 h-1 rounded-full", status === 'danger' ? 'bg-red-500' : (status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'))} />
      <span className="text-[11px] flex-1">{label}</span>
      <span className={cn("text-[8px] font-bold uppercase", statusColors[status])}>{status}</span>
    </div>
  );
}
