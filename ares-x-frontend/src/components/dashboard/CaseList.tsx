"use client";

import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Shield, 
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseItem {
  id: string;
  title: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'investigating' | 'under_review' | 'closed';
  date: string;
  assigned: string;
  evidenceCount: number;
}

const cases: CaseItem[] = [
  { 
    id: 'AR-2024-001', 
    title: 'Project Aether: Financial Exfiltration', 
    priority: 'critical', 
    status: 'investigating', 
    date: '2024-05-12', 
    assigned: 'John Doe',
    evidenceCount: 14
  },
  { 
    id: 'AR-2024-002', 
    title: 'Deepfake Campaign: Political Interference', 
    priority: 'high', 
    status: 'under_review', 
    date: '2024-05-10', 
    assigned: 'Sarah Chen',
    evidenceCount: 8
  },
  { 
    id: 'AR-2024-003', 
    title: 'Ransomware Artifact: LockBit 3.0 Variant', 
    priority: 'high', 
    status: 'closed', 
    date: '2024-05-08', 
    assigned: 'Michael Ross',
    evidenceCount: 22
  },
  { 
    id: 'AR-2024-004', 
    title: 'Insider Threat: Intellectual Property Theft', 
    priority: 'medium', 
    status: 'investigating', 
    date: '2024-05-05', 
    assigned: 'Jane Smith',
    evidenceCount: 11
  },
];

export default function CaseList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground">Orchestrate forensic investigations across the enterprise.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Initialize New Case
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center cyber-panel p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search cases by ID, title, or assigned investigator..." 
            className="w-full bg-accent border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-xs font-medium hover:bg-accent">
          <Filter className="w-3 h-3" />
          Filters
        </button>
      </div>

      {/* Case Table */}
      <div className="cyber-panel overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-accent/50 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold">Case ID</th>
              <th className="px-6 py-4 font-bold">Details</th>
              <th className="px-6 py-4 font-bold">Priority</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Assigned</th>
              <th className="px-6 py-4 font-bold">Evidence</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cases.map((item) => (
              <tr key={item.id} className="hover:bg-accent/30 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <span className="font-mono text-xs font-bold text-primary">{item.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Opened {item.date}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={item.priority} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="text-xs">{item.assigned}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    {item.evidenceCount} items
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-accent rounded-full transition-colors">
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface PriorityBadgeProps {
  priority: 'critical' | 'high' | 'medium' | 'low';
}

function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles = {
    critical: "bg-destructive/10 text-destructive border-destructive/20",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    low: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  };

  return (
    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", styles[priority])}>
      {priority}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'investigating' | 'under_review' | 'closed';
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    investigating: "bg-primary/10 text-primary border-primary/20",
    under_review: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    closed: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-1.5 h-1.5 rounded-full", status === 'investigating' ? 'bg-primary animate-pulse' : (status === 'closed' ? 'bg-green-500' : 'bg-yellow-500'))} />
      <span className="text-xs capitalize">{status.replace('_', ' ')}</span>
    </div>
  );
}
