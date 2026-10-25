'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, AlertCircle } from 'lucide-react';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/translations';

interface CenterGuideOverlayProps {
  showGuide: boolean;
  tapCount: number;
  lastTapWasOutside: boolean;
  lang: Language;
}

export const CenterGuideOverlay: React.FC<CenterGuideOverlayProps> = ({
  showGuide,
  tapCount,
  lastTapWasOutside,
  lang,
}) => {
  return (
    <>
      {/* Optional Persistent Center Box Boundary Guide */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
          >
            <div className="w-[50vw] h-[50vh] max-w-[450px] max-h-[450px] border-2 border-dashed border-cyan-400/50 rounded-3xl bg-cyan-500/5 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center shadow-[0_0_50px_rgba(6,182,212,0.15)] animate-pulse">
              <Target className="w-10 h-10 text-cyan-300 opacity-80 mb-2" />
              <p className="text-xs font-semibold text-cyan-200 uppercase tracking-widest drop-shadow">
                {lang === 'bn' ? 'মাঝে ৩টি ক্লিক জোন' : 'Center 3-Tap Target Zone'}
              </p>
              <p className="text-[11px] text-cyan-100/70 max-w-xs mt-1 drop-shadow">
                {lang === 'bn' ? 'এখানে পরপর ৩ বার ক্লিক করলে বারসমূহ দৃশ্যমান হবে' : 'Triple-click inside this zone to reveal control bars'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Center Tap Counter Popup when user taps */}
      <AnimatePresence>
        {tapCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1.1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="bg-slate-950/90 text-white border-2 border-cyan-400 px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col items-center gap-1 min-w-[160px]">
              <div className="flex items-center gap-1.5 text-cyan-400 text-3xl font-black font-mono tracking-tighter">
                <span>{tapCount}</span>
                <span className="text-xl text-slate-400">/ 3</span>
              </div>
              <p className="text-xs font-medium text-cyan-200 whitespace-nowrap">
                {lang === 'bn' ? `ক্লিক ${tapCount}/৩ (মাঝে)` : `Center Click ${tapCount}/3`}
              </p>
              {tapCount < 3 && (
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-teal-300 h-full transition-all duration-200"
                    style={{ width: `${(tapCount / 3) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outside Click Warning Toast */}
      <AnimatePresence>
        {lastTapWasOutside && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-rose-950/90 text-rose-200 border border-rose-500/50 px-5 py-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{lang === 'bn' ? 'স্ক্রিনে ক্লিক করে কন্ট্রোলস অন/অফ করুন' : 'Tap screen to toggle controls'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
