import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, CheckCircle2 } from "lucide-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect if app already installed or running in standalone
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="fixed bottom-24 left-4 right-4 z-50 flex justify-center pointer-events-none">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-black uppercase tracking-widest"
        >
          <CheckCircle2 className="w-5 h-5" />
          App Installed
        </motion.div>
      </div>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 flex justify-center">
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleInstallClick}
        className="w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em]"
      >
        <Download className="w-5 h-5" />
        Download App
      </motion.button>
    </div>
  );
}
