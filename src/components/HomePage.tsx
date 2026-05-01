import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, Lock, Smartphone, Wifi, WifiOff
} from 'lucide-react';
import { motion } from 'motion/react';
import DownloadAppButton from './DownloadAppSection';

interface HomePageProps {
  onNavigate: (tab: any) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ProtocolBtn = ({ label, onClick, accent = 'blue', icon }: { label: string; onClick: () => void; accent?: 'blue' | 'purple', icon: string }) => {
    const gradients = {
      blue: 'from-blue-600 to-blue-500 shadow-[0_10px_25px_rgba(37,99,235,0.3)]',
      purple: 'from-[#7c3aed] to-[#6366f1] shadow-[0_10px_25px_rgba(124,58,237,0.3)]'
    };

    return (
      <motion.button
        whileHover={{ translateY: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`w-full p-3.5 rounded-2xl bg-gradient-to-br ${gradients[accent]} text-white font-bold tracking-widest text-sm transition-all duration-300 uppercase flex items-center justify-start gap-4 group`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </motion.button>
    );
  };

  return (
    <div className="pb-32 pt-2 md:pt-10" id="home-matrix">
      {/* Premium Desktop Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Segment: Branding & Description */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 px-1"
        >
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none italic uppercase">
              The Matrix <br/>
              <span className="text-blue-600">Protocol.</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full" />
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-base lg:text-lg leading-relaxed font-medium">
            The world's most advanced utility matrix for professional-grade calculations. 
            Built with AES-256 encrypted logic for speed, precision, and absolute privacy.
          </p>

          <div className="flex flex-col gap-6 pt-6 border-t border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`} />
                {isOnline ? 'Core Link Active' : 'Offline Mode'}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Smartphone className="w-3.5 h-3.5" />
                PWA Ready
              </div>
            </div>

            {/* Install Prompt in Hero */}
            <div className="p-6 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-3xl border border-blue-500/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Professional App</h3>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Install for the full Matrix experience</p>
                </div>
              </div>
              <DownloadAppButton />
            </div>
          </div>
        </motion.div>

        {/* Right Segment: Action Panels */}
        <div className="space-y-10">
          {/* PROTOCOLS */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase px-1">PROTOCOLS</h2>
            <div className="space-y-3">
              <ProtocolBtn icon="⚡" label="FINANCE" onClick={() => onNavigate('finance')} />
              <ProtocolBtn icon="🪙" label="METALS" onClick={() => onNavigate('gold')} />
              <ProtocolBtn icon="🚗" label="VEHICLE" onClick={() => onNavigate('vehicle')} />
              <ProtocolBtn icon="🏠" label="ESTATE" onClick={() => onNavigate('land')} />
            </div>
          </section>

          {/* CORE */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase px-1">CORE</h2>
            <div className="space-y-3">
              <ProtocolBtn icon="🔐" label="ADMIN" onClick={() => onNavigate('admin')} accent="purple" />
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center pt-20 border-t border-gray-200 dark:border-white/10 space-y-6 mt-20">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase opacity-50">© 2026 CALHUB — ALL RIGHTS RESERVED</p>
          <p className="text-[11px] font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">CRAFTED BY PATEL VAMSHIDHAR REDDY</p>
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase opacity-50">
            <Lock className="w-3 h-3" />
            <span>AES-256 ENCRYPTED MATRIX</span>
          </div>
        </div>
      </footer>

      {/* FLOAT BUTTON */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-24 sm:bottom-28 right-6 w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-xl text-gray-900 dark:text-white rounded-full shadow-2xl flex items-center justify-center transition-all z-[60] border border-gray-200 dark:border-white/20"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

