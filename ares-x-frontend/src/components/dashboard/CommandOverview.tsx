"use client";

import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  FileSearch, 
  Users, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { time: '00:00', events: 400, threats: 24 },
  { time: '04:00', events: 300, threats: 13 },
  { time: '08:00', events: 900, threats: 98 },
  { time: '12:00', events: 1200, threats: 145 },
  { time: '16:00', events: 1500, threats: 180 },
  { time: '20:00', events: 1100, threats: 110 },
  { time: '23:59', events: 600, threats: 45 },
];

export default function CommandOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">Strategic oversight of global forensic operations.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded text-xs font-mono animate-pulse">
            LIVE TELEMETRY: ACTIVE
          </div>
          <div className="px-3 py-1 bg-accent border border-border rounded text-xs font-mono">
            SYS_TIME: {new Date().toISOString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Investigations" 
          value="42" 
          change="+3 this week" 
          icon={FileSearch} 
          trend="up" 
        />
        <StatCard 
          title="Threat Indicators" 
          value="1,284" 
          change="+12% volatility" 
          icon={ShieldAlert} 
          trend="up" 
          color="text-destructive"
        />
        <StatCard 
          title="Evidence Processed" 
          value="12.4 TB" 
          change="98.2% integrity" 
          icon={Fingerprint} 
          trend="stable" 
        />
        <StatCard 
          title="Avg. Response Time" 
          value="14m 22s" 
          change="-2m from baseline" 
          icon={Clock} 
          trend="down" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 cyber-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Event Intelligence Pipeline
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={10} />
                <YAxis stroke="#71717a" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121215', border: '1px solid #27272a' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="events" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEvents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cyber-panel p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Critical Alerts
          </h3>
          <div className="space-y-4">
            <AlertItem 
              severity="high" 
              title="Media Tampering Detected" 
              description="Deepfake artifacts found in Case #AR-294" 
              time="2m ago" 
            />
            <AlertItem 
              severity="medium" 
              title="Unauthorized Access Attempt" 
              description="Blocked IP: 192.168.1.44 (Evidence Vault)" 
              time="14m ago" 
            />
            <AlertItem 
              severity="low" 
              title="Audit Log Integrity Check" 
              description="Daily validation complete. 0 anomalies." 
              time="1h ago" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down' | 'stable';
  color?: string;
}

function StatCard({ title, value, change, icon: Icon, trend, color = "text-primary" }: StatCardProps) {
  return (
    <div className="cyber-panel p-6 hover:border-primary/50 transition-all cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-accent`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className={`text-[10px] font-bold px-2 py-0.5 rounded border border-border bg-background`}>
          {trend.toUpperCase()}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-[10px] text-muted-foreground mt-2">{change}</p>
    </div>
  );
}

interface AlertItemProps {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  time: string;
}

function AlertItem({ severity, title, description, time }: AlertItemProps) {
  const colors = {
    high: "bg-destructive/20 text-destructive border-destructive/30",
    medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  };

  return (
    <div className="p-3 border border-border rounded-md hover:bg-accent/30 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-1">
        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded border", colors[severity])}>
          {severity.toUpperCase()}
        </span>
        <span className="text-[10px] text-muted-foreground">{time}</span>
      </div>
      <h4 className="text-xs font-semibold group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-[10px] text-muted-foreground line-clamp-1">{description}</p>
    </div>
  );
}
