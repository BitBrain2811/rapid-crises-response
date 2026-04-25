import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Siren, AlertTriangle, Shield, Map as MapIcon, Plus, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AlertList } from './AlertList';
import { SOSButton } from './SOSButton';
import { EmergencyMap } from './EmergencyMap';
import { CreateAlertModal } from './CreateAlertModal';

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-800 bg-[#0F0F0F]">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/20">R</div>
          <span className="font-semibold tracking-tight text-lg uppercase tracking-tighter">Emergency</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg flex items-center gap-3 transition-all">
            <Bell size={20} />
            <span className="text-sm font-medium">Live Dashboard</span>
          </button>
          <button className="w-full text-zinc-500 hover:text-zinc-200 px-4 py-3 flex items-center gap-3 transition-colors">
            <MapIcon size={20} />
            <span className="text-sm font-medium">Map View</span>
          </button>
          <button className="w-full text-zinc-500 hover:text-zinc-200 px-4 py-3 flex items-center gap-3 transition-colors">
            <Shield size={20} />
            <span className="text-sm font-medium">Security Protocols</span>
          </button>
          <Link to="/admin" className="w-full text-indigo-400 hover:text-indigo-300 px-4 py-3 flex items-center gap-3 transition-colors group mt-4 border border-indigo-900/50 bg-indigo-500/10 rounded-lg">
            <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-sm font-medium">Admin Terminal</span>
          </Link>
        </nav>
        <div className="p-6 border-t border-zinc-800">
          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">System Status</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
              <span className="text-xs text-emerald-500 font-medium font-mono uppercase">Online & Encrypted</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#0F0F0F] shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Grand Continental - Command Center</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="text-xs font-medium">Staff: On Duty</span>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Staff" alt="User" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden">
          {/* Active Alerts List */}
          <section className="md:col-span-4 flex flex-col gap-4 overflow-hidden">
            <div className="flex justify-between items-end px-1 shrink-0">
              <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">Live Incidents</h2>
              <span className="text-[10px] text-zinc-600 font-mono italic animate-pulse">System Monitoring...</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-1">
              <AlertList />
            </div>
          </section>

          {/* Map Section */}
          <section className="md:col-span-5 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] z-10"></div>
            <div className="w-full h-full">
              <EmergencyMap />
            </div>
            <div className="absolute bottom-4 left-4 z-20 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-3 rounded-lg flex items-center gap-4 shadow-xl">
              <div className="text-[9px] uppercase font-bold text-zinc-500 tracking-tighter">GPS Engine Active</div>
              <div className="h-4 w-px bg-zinc-800"></div>
              <div className="text-[10px] font-mono text-zinc-300">Tracking 24 satellites</div>
            </div>
          </section>

          {/* Action Center (SOS + Quick Create) */}
          <section className="md:col-span-3 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
            <SOSButton />
            
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">Manual Dispatch</h3>
              <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Broadcast an official emergency event to all active security terminals immediately.</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold rounded-lg tracking-[0.2em] transition-all uppercase border border-zinc-700 hover:border-zinc-500 active:scale-95 shadow-lg"
                  >
                    Open Dispatch Terminal
                  </button>
                </div>
                
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between text-[9px] uppercase font-bold text-zinc-600">
                    <span>Protocol Load</span>
                    <span>12%</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-[12%] shadow-[0_0_8px_#ef4444]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <CreateAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
