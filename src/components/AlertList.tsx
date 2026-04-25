import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Clock, MapPin, CheckCircle } from 'lucide-react';
import { alertService } from '../services/alertService';
import { Alert } from '../types';
import { formatDistanceToNow } from 'date-fns';

export const AlertList: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    return alertService.subscribeToAlerts(setAlerts);
  }, []);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 text-red-500';
      case 'HIGH': return 'border-orange-500 text-orange-500';
      case 'MEDIUM': return 'border-yellow-500 text-yellow-500';
      default: return 'border-blue-500 text-blue-500';
    }
  };

  const handleResolve = (id: string) => {
    alertService.updateAlertStatus(id, 'RESOLVED');
  };

  if (alerts.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 font-mono text-[10px] text-zinc-600 uppercase tracking-widest text-center p-8 bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
        SYSTEM NOMINAL.<br/>NO ACTIVE THREATS.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className={`bg-[#1A1A1A] border-l-4 p-4 rounded-r-lg shadow-lg relative group transition-all duration-300 ${getSeverityStyles(alert.severity).split(' ')[0]} ${alert.status === 'RESOLVED' ? 'opacity-30 grayscale blur-[0.5px]' : ''}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${getSeverityStyles(alert.severity).split(' ')[1]}`}>
                {alert.type} :: {alert.severity}
              </span>
              <span className="text-zinc-500 text-[10px] font-mono">
                {alert.createdAt ? formatDistanceToNow(new Date((alert as any).createdAt?.seconds * 1000 || Date.now()), { addSuffix: true }) : 'Live'}
              </span>
            </div>
            
            <p className="font-bold text-sm text-zinc-100 mb-1 leading-tight group-hover:text-white transition-colors">{alert.message}</p>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-400 transition-colors">
                <MapPin size={10} />
                <span className="text-[10px] font-mono tracking-tighter">{alert.location.roomNumber || 'GPS Fixed'}</span>
              </div>
              
              {alert.status !== 'RESOLVED' && (
                <button 
                  onClick={() => handleResolve(alert.id)}
                  className="px-3 py-1 bg-zinc-800 hover:bg-emerald-500/20 text-zinc-500 hover:text-emerald-500 text-[9px] font-bold rounded border border-zinc-700 hover:border-emerald-500/30 transition-all uppercase tracking-tighter"
                >
                  Clear Incident
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
