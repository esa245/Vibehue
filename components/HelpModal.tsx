'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, CheckCircle2, Vibrate, Sparkles, Key } from 'lucide-react';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, lang }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl text-white overflow-hidden relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">
                  {lang === 'bn' ? 'ব্যবহারবিধি ও নির্দেশনা' : 'User Instructions'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="py-4 space-y-4 text-xs md:text-sm text-slate-300">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-cyan-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{getTranslation(lang, 'howItWorksTitle')}</span>
                </div>
                <div className="space-y-2 text-slate-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{getTranslation(lang, 'howItWorksStep1')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Key className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{getTranslation(lang, 'howItWorksStep2')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{getTranslation(lang, 'howItWorksStep3')}</span>
                  </div>
                </div>
              </div>

              {/* Vibration Notice */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
                <Vibrate className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">
                    {lang === 'bn' ? 'ভাইব্রেশন সাপোর্ট' : 'Haptic Vibration Support'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'bn'
                      ? 'মোবাইল ব্রাউজারে ভাইব্রেশন হার্ডওয়্যার ব্যবহৃত হবে। পিসি বা অন্যান্য ডিভাইসে স্ক্রিন পালস রিং প্রদর্শিত হবে।'
                      : 'Uses mobile device vibration hardware. Shows visual pulse ripples on non-supported desktop devices.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 active:scale-95 transition-all"
              >
                {getTranslation(lang, 'close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
