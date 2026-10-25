'use client';

import React, { useState } from 'react';
import { Download, Smartphone, X, Check, Share } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Language } from '@/lib/types';

interface PWAInstallButtonProps {
  lang: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ lang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  // Android / Chrome / Desktop PWA Flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg hover:shadow-emerald-400/20 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 shadow-md"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{lang === 'bn' ? 'অ্যাপ ইন্সটল' : 'Install App'}</span>
      </button>
    );
  }

  // iOS Safari Flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg hover:shadow-emerald-400/20 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 shadow-md"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'আইফোন ইন্সটল' : 'Install iOS'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-3xl bg-slate-950 border border-emerald-400/30 p-6 shadow-2xl text-white space-y-4 relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Smartphone className="w-5 h-5" />
                <span>iPhone / iPad Home Screen Setup</span>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900 p-4 rounded-2xl border border-white/10">
                <p className="flex items-center gap-2">
                  <Share className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>১. সাফারি ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> আইকনে চাপ দিন।</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>২. নিচে স্ক্রোল করে <strong>Add to Home Screen (হোম স্ক্রিনে যোগ করুন)</strong> সিলেক্ট করুন।</span>
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-xs hover:bg-emerald-300 transition-colors"
              >
                ঠিক আছে (Close)
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
