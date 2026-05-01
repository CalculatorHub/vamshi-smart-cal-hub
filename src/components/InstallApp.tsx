import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, CheckCircle2 } from "lucide-react";

export default function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect if already installed
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone) {
      setInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("Use Chrome or Edge to install this app.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (installed) {
    return (
      <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-emerald-400 font-bold text-xs uppercase tracking-widest">
        <CheckCircle2 className="w-4 h-4" />
        App Installed ✅
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={handleInstall}
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-lg flex items-center gap-3 border border-white/20 font-black text-sm uppercase tracking-[0.2em] transition-transform hover:scale-105 active:scale-95"
        >
          <Download className="w-5 h-5" />
          Install App ⬇️
        </motion.button>
      )}
    </AnimatePresence>
  );
}
