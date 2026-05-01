import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Smartphone, X, Info, HelpCircle } from 'lucide-react';

export default function DownloadAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAction = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else {
      setShowHowTo(true);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAction}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-xl transition-all duration-300 group border border-blue-500/30"
      >
        <Smartphone className="w-4 h-4 text-blue-100 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">
          {isInstallable ? 'Install App' : 'Get App'}
        </span>
      </motion.button>

      {/* How to install modal */}
      <AnimatePresence>
        {showHowTo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowTo(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-[#020617] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden p-6"
            >
              <button 
                onClick={() => setShowHowTo(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight italic">Install CALHUB</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Add to your home screen for a full-screen, lightning-fast experience.</p>
                </div>

                <div className="space-y-4">
                  {isIOS ? (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                      <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Smartphone className="w-3 h-3" />
                        iOS Instructions
                      </h4>
                      <ol className="text-[11px] text-gray-600 dark:text-gray-300 space-y-2 list-decimal list-inside font-bold">
                        <li>Open Safari browser</li>
                        <li>Tap the 'Share' icon (bottom center)</li>
                        <li>Scroll down and tap 'Add to Home Screen'</li>
                        <li>Tap 'Add' in the top right corner</li>
                      </ol>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                      <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <HelpCircle className="w-3 h-3" />
                         General Instructions
                      </h4>
                      <ol className="text-[11px] text-gray-600 dark:text-gray-300 space-y-2 list-decimal list-inside font-bold">
                        <li>Tap the three dots (menu) in your browser</li>
                        <li>Select 'Install App' or 'Add to Home Screen'</li>
                        <li>Follow the on-screen prompts to confirm</li>
                      </ol>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                     <Info className="w-4 h-4 text-emerald-500 shrink-0" />
                     <p className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">Works offline once installed! ⚡</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowHowTo(false)}
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-2xl shadow-lg transition-transform active:scale-95 uppercase tracking-widest text-[11px]"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
