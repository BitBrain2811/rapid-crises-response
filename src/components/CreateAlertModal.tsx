import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Siren, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { EmergencyType, Severity } from '../types';
import { alertService } from '../services/alertService';

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAlertModal: React.FC<CreateAlertModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<EmergencyType>('OTHER');
  const [severity, setSeverity] = useState<Severity>('MEDIUM');
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        await alertService.createAlert({
          type,
          severity,
          message,
          location: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            roomNumber: room
          },
          status: 'ACTIVE'
        });
        setIsSubmitting(false);
        onClose();
        setMessage('');
        setRoom('');
      }, (err) => {
        // Fallback for location-less alerts
        alertService.createAlert({
          type,
          severity,
          message,
          location: {
            latitude: 40.7128, // NYC Placeholder
            longitude: -74.006,
            roomNumber: room
          },
          status: 'ACTIVE'
        });
        setIsSubmitting(false);
        onClose();
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-[#0F0F0F] p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
              <div className="h-full bg-red-600 w-1/3 shadow-[0_0_15px_#ef4444]"></div>
            </div>

            <button onClick={onClose} className="absolute right-6 top-6 text-zinc-600 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <header className="mb-10 text-center">
              <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-white">Incident Dispatch</h2>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">Internal Security Protocol :: 09-X</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Classification</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value as EmergencyType)}
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="FIRE">FIRE</option>
                    <option value="MEDICAL">MEDICAL</option>
                    <option value="POLICE">POLICE</option>
                    <option value="DISASTER">DISASTER</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Urgency</label>
                  <select 
                    value={severity} 
                    onChange={(e) => setSeverity(e.target.value as Severity)}
                    className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Operational Area</label>
                <input 
                  type="text" 
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Zone, Floor, or Terminal ID..."
                  className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-red-600 transition-colors placeholder:text-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Briefing Details</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-28 bg-[#0A0A0A] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-red-600 transition-colors resize-none placeholder:text-zinc-700"
                  placeholder="Input tactical summary of event..."
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-900/20 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'Distributing Link...' : 'Execute Dispatch'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
