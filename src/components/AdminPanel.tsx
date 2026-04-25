import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Activity, Database, Settings, LogOut, Search, MoreVertical, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Active Alerts', value: '14', change: '+2', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'System Load', value: '32%', change: '-5%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Personnel', value: '128', change: '0', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Database Health', value: '100%', change: 'Optimum', icon: Database, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#050505] text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 flex-col border-r border-zinc-800/50 bg-[#0A0A0A]/80 backdrop-blur-xl flex transition-all duration-300">
        <div className="p-6 border-b border-zinc-800/50 flex items-center gap-4 justify-center md:justify-start">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <Shield size={20} />
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-sm tracking-widest uppercase text-white">Admin</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Command</p>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2">
          {[
            { icon: Activity, label: 'Overview', active: true },
            { icon: Users, label: 'Personnel', active: false },
            { icon: Database, label: 'Data Logs', active: false },
            { icon: Settings, label: 'Settings', active: false }
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${item.active ? 'bg-indigo-600/10 text-indigo-400' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-200'}`}>
              <item.icon size={20} className={item.active ? 'drop-shadow-[0_0_8px_rgba(79,70,229,0.8)]' : ''} />
              <span className="hidden md:block text-xs font-semibold uppercase tracking-wider">{item.label}</span>
              {item.active && <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-full" />}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-zinc-800/50">
          <Link to="/" className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group">
            <LogOut size={20} />
            <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Exit Panel</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] pointer-events-none"></div>
        
        {/* Header */}
        <header className="h-20 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-10">
          <div className="flex flex-col">
            <h2 className="text-xl font-light text-white tracking-tight">System Administration</h2>
            <p className="text-xs text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All systems operational
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full">
              <Search size={14} className="text-zinc-500" />
              <input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none text-xs text-white placeholder-zinc-600 w-48" />
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-zinc-800">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white">{currentTime.toLocaleTimeString()}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{currentTime.toLocaleDateString()}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-zinc-950 rounded-full border-2 border-transparent flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto z-10 scrollbar-hide">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors"
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <span className={`text-xs font-bold ${stat.change.startsWith('+') || stat.change === 'Optimum' ? 'text-emerald-500' : stat.change === '0' ? 'text-zinc-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">{stat.label}</h3>
                <div className="text-3xl font-light text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Recent Incident Logs</h3>
              <button className="text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300 tracking-wider">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80 text-[10px] uppercase tracking-widest text-zinc-500">
                    <th className="p-4 font-semibold">Incident ID</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Severity</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Time</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-zinc-800/50">
                  {[
                    { id: 'INC-8429', type: 'FIRE', severity: 'CRITICAL', status: 'RESPONDING', time: '10 min ago' },
                    { id: 'INC-8428', type: 'MEDICAL', severity: 'HIGH', status: 'PENDING', time: '24 min ago' },
                    { id: 'INC-8427', type: 'POLICE', severity: 'MEDIUM', status: 'RESOLVED', time: '1 hr ago' },
                    { id: 'INC-8426', type: 'DISASTER', severity: 'LOW', status: 'RESOLVED', time: '3 hrs ago' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-zinc-800/20 transition-colors group">
                      <td className="p-4 text-zinc-300 font-mono text-xs">{log.id}</td>
                      <td className="p-4">
                        <span className="text-xs font-semibold text-zinc-200">{log.type}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                          log.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          log.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                          log.severity === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {log.status === 'RESOLVED' ? <CheckCircle size={14} className="text-emerald-500" /> : <Clock size={14} className="text-amber-500" />}
                          <span className="text-xs text-zinc-400">{log.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-zinc-500">{log.time}</td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-zinc-500 hover:text-zinc-300 rounded-lg hover:bg-zinc-800 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
