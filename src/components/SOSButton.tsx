import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Siren, X } from 'lucide-react';
import { alertService } from '../services/alertService';
import { EmergencyType, Severity } from '../types';

export const SOSButton: React.FC = () => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);

  const handleStart = () => {
    setIsPressing(true);
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / 2000, 1);
      setProgress(p);
      if (p >= 1) {
        triggerSOS();
        clearInterval(interval);
      }
    }, 50);
    
    const cleanup = () => {
      clearInterval(interval);
      setIsPressing(false);
      setProgress(0);
    };
    
    window.addEventListener('mouseup', cleanup, { once: true });
    window.addEventListener('touchend', cleanup, { once: true });
  };

  const triggerSOS = async () => {
    setIsTriggered(true);
    
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await alertService.createAlert({
        type: 'OTHER' as EmergencyType,
        severity: 'CRITICAL' as Severity,
        message: 'PANIC ALERT: USER-TRIGGERED SOS',
        location: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          roomNumber: 'Current Geo'
        },
        status: 'ACTIVE'
      });
    });

    setTimeout(() => setIsTriggered(false), 3000);
  };

  return (
    <div className="relative group w-full shrink-0">
      <motion.button
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        animate={isPressing ? { scale: 0.98 } : { scale: 1 }}
        className={`w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center gap-3 border border-zinc-800 transition-all relative overflow-hidden shadow-2xl shadow-red-900/20 group active:scale-95 ${
          isTriggered ? 'bg-emerald-600 border-white/20' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        <AnimatePresence>
          {isPressing && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${progress * 100}%`, opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-full bg-black pointer-events-none z-0"
            />
          )}
        </AnimatePresence>
        
        <div className={`relative z-10 p-5 rounded-full bg-white/10 border border-white/20 transition-all ${isPressing ? 'scale-110 shadow-[0_0_20px_#fff]' : ''}`}>
          <Siren size={40} className="text-white" />
        </div>
        
        <div className="relative z-10 text-center">
          <span className="font-bold text-xl text-white tracking-[0.3em]">
            {isTriggered ? 'SENT' : 'S O S'}
          </span>
          <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest mt-1">
            {isTriggered ? 'Response Dispatched' : 'Hold 2s to Broadcast'}
          </p>
        </div>
      </motion.button>
    </div>
  );
};
