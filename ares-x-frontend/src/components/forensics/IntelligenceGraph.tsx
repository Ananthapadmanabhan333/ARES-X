"use client";

import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { 
  Network, 
  Database, 
  User, 
  MapPin, 
  Globe, 
  Zap,
  Filter,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const elements = [
  // Nodes
  { data: { id: 'case', label: 'CASE #AR-294', type: 'case' } },
  { data: { id: 'attacker', label: 'UNC2544 (Storm-055)', type: 'actor' } },
  { data: { id: 'evidence1', label: 'CCTV_VALT.MP4', type: 'evidence' } },
  { data: { id: 'evidence2', label: 'LOG_AUTH_SRV.TXT', type: 'evidence' } },
  { data: { id: 'ip1', label: '185.22.14.102', type: 'network' } },
  { data: { id: 'ip2', label: '45.11.22.33', type: 'network' } },
  { data: { id: 'domain', label: 'secure-vault-update.com', type: 'network' } },
  { data: { id: 'malware', label: 'CobaltStrike.BEACON', type: 'malware' } },
  
  // Edges
  { data: { source: 'case', target: 'attacker', label: 'attributed_to' } },
  { data: { source: 'case', target: 'evidence1', label: 'contains' } },
  { data: { source: 'case', target: 'evidence2', label: 'contains' } },
  { data: { source: 'attacker', target: 'ip1', label: 'uses_infrastructure' } },
  { data: { source: 'attacker', target: 'domain', label: 'controls' } },
  { data: { source: 'ip1', target: 'domain', label: 'resolves_to' } },
  { data: { source: 'evidence2', target: 'ip1', label: 'references' } },
  { data: { source: 'evidence1', target: 'ip2', label: 'references' } },
  { data: { source: 'attacker', target: 'malware', label: 'deploys' } },
];

export default function IntelligenceGraph() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#1e1e24',
            'label': 'data(label)',
            'color': '#a1a1aa',
            'font-size': 8,
            'text-valign': 'bottom',
            'text-margin-y': 5,
            'width': 30,
            'height': 30,
            'border-width': 2,
            'border-color': '#27272a'
          }
        },
        {
          selector: 'node[type="case"]',
          style: { 'background-color': '#3b82f6', 'width': 40, 'height': 40, 'border-color': '#60a5fa' }
        },
        {
          selector: 'node[type="actor"]',
          style: { 'background-color': '#ef4444', 'border-color': '#f87171' }
        },
        {
          selector: 'node[type="malware"]',
          style: { 'background-color': '#8b5cf6', 'border-color': '#a78bfa' }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#27272a',
            'target-arrow-color': '#27272a',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'font-size': 6,
            'color': '#71717a',
            'label': 'data(label)',
            'text-rotation': 'autorotate',
            'text-margin-y': -10
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 50
      }
    });

    return () => cy.destroy();
  }, []);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Graph</h1>
          <p className="text-muted-foreground">Mapping multi-dimensional relationships between evidence and actors.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-xs font-medium hover:bg-accent">
            <Maximize2 className="w-3 h-3" />
            Fullscreen
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Zap className="w-4 h-4" />
            Run Correlation
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        {/* Graph Area */}
        <div className="lg:col-span-3 cyber-panel relative bg-[#050505]">
          <div ref={containerRef} className="absolute inset-0" />
          <div className="absolute top-4 left-4 space-y-2">
             <LegendItem color="bg-blue-500" label="Case Node" />
             <LegendItem color="bg-red-500" label="Threat Actor" />
             <LegendItem color="bg-purple-500" label="Malware Family" />
             <LegendItem color="bg-zinc-600" label="Evidence/IOV" />
          </div>
        </div>

        {/* Intelligence Context */}
        <div className="space-y-6">
          <div className="cyber-panel p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-widest">
              <Network className="w-4 h-4 text-primary" />
              Infrastructure Analysis
            </h3>
            <div className="space-y-4">
               <div className="p-3 bg-accent rounded border border-border">
                  <p className="text-[10px] font-bold text-muted-foreground mb-2">PRIMARY C2 CLUSTER</p>
                  <p className="text-xs font-mono">185.22.14.0/24</p>
                  <p className="text-[10px] text-destructive font-bold mt-2 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    ASN: AS51167 (RU)
                  </p>
               </div>
               <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-muted-foreground">MITRE ATT&CK MAPPING</h4>
                  <div className="flex flex-wrap gap-1">
                    <AttackTag label="T1566.001" name="Spearphishing" />
                    <AttackTag label="T1071.001" name="Web Protocols" />
                    <AttackTag label="T1021.001" name="RDP" />
                  </div>
               </div>
            </div>
          </div>

          <div className="cyber-panel p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-widest">
              <Database className="w-4 h-4 text-primary" />
              OSINT Enrichment
            </h3>
            <div className="space-y-3">
               <p className="text-[11px] text-muted-foreground italic">
                 "Infrastructure overlaps with previous campaigns targeting Baltic energy sectors (2023-Q4)."
               </p>
               <button className="w-full py-2 bg-accent hover:bg-accent/80 border border-border rounded text-[10px] font-bold uppercase transition-colors">
                 Query VirusTotal API
               </button>
               <button className="w-full py-2 bg-accent hover:bg-accent/80 border border-border rounded text-[10px] font-bold uppercase transition-colors">
                 Search Shodan History
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/5">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-[8px] font-bold uppercase text-muted-foreground">{label}</span>
    </div>
  );
}

function AttackTag({ label, name }: { label: string; name: string }) {
  return (
    <div className="px-2 py-1 bg-accent border border-border rounded flex flex-col">
      <span className="text-[8px] font-bold text-primary">{label}</span>
      <span className="text-[8px] text-muted-foreground truncate max-w-[80px]">{name}</span>
    </div>
  );
}
