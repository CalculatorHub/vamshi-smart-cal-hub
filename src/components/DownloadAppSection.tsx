import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, CheckCircle2, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../lib/pwa';

export default function DownloadAppButton() {
  const { isInstallable, isInstalled, installApp } = usePWAInstall();
  const [showToast, setShowToast] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Show toast if just installed (using a temporary session check or based on state change)
    if (isInstalled) {
      const hasShownToast = sessionStorage.getItem('pwa_installed_toast');
      if (!hasShownToast) {
        setShowToast(true);
        sessionStorage.setItem('pwa_installed_toast', 'true');
        setTimeout(() => setShowToast(false), 5000);
      }
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isInstalled]);

  const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) && !(navigator as any).standalone;

  return (
    <>
      {/* 1. Header/Nav Integrated Button (Small) */}
      <div className="flex items-center gap-2">
        {isInstalled ? (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
              App Installed
            </span>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={installApp}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20 rounded-xl transition-all duration-300 group"
          >
            <Download className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.15em] hidden sm:inline">
              Download App
            </span>
          </motion.button>
        )}
      </div>

      {/* 2. Floating Bottom Install Banner for Mobile (Visible if not installed and installable) */}
      <AnimatePresence>
        {isInstallable && !isInstalled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-4 right-4 z-[100] md:bottom-8 md:right-8 md:left-auto md:w-80"
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Install CalHub</h4>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Add to home screen for offline use.</p>
                </div>
              </div>
              <button 
                onClick={installApp}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. iOS Tooltip */}
      {isIOS && !isInstalled && (
        <div className="fixed bottom-24 left-4 right-4 z-[99] md:bottom-8 md:right-8 md:left-auto md:w-80">
           <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-xl text-center border border-white/10 backdrop-blur-md bg-opacity-90">
              <p className="text-[10px] font-bold uppercase tracking-widest">
                On iPhone: Tap Share <span className="inline-block mx-1">⎋</span> then "Add to Home Screen"
              </p>
           </div>
        </div>
      )}

      {/* 4. Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center gap-3 border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-black text-xs uppercase tracking-widest">App Installed Successfully 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Offline Status Indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-[110] px-3 py-1.5 bg-orange-500 text-white rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-2 animate-pulse border border-orange-400">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          Offline Mode
        </div>
      )}
    </>
  );
}
