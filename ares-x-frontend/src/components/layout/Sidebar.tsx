"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, LayoutDashboard, FolderOpen, Search, Settings, FileText, Activity, Terminal } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Command Center', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Case Manager', icon: FolderOpen, href: '/cases' },
  { name: 'Evidence Intake', icon: Shield, href: '/evidence' },
  { name: 'Forensic Lab', icon: Activity, href: '/lab' },
  { name: 'Intelligence', icon: Search, href: '/intelligence' },
  { name: 'Reporting', icon: FileText, href: '/reports' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <Terminal className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">ARES <span className="text-primary">X</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href 
                ? "bg-primary/10 text-primary border-l-2 border-primary" 
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-md bg-accent/50">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Principal Investigator</p>
            <p className="text-[10px] text-muted-foreground truncate">j.doe@ares.intel</p>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
