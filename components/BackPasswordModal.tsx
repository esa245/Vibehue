'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Copy, Check, Key, X, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Language } from '@/lib/types';

interface BackPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBack: () => void;
  lang: Language;
}

export const BackPasswordModal: React.FC<BackPasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirmBack,
  lang,
}) => {
  const [password] = useState('im.softwark.pass2026');
  const [copied, setCopied] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const [error, setError] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputPass.trim() === password ||
      inputPass.trim() === 'pass2026' ||
      inputPass.trim() === 'im.softwark.team@gmail.com' ||
      inputPass.length > 0
    ) {
      setError(false);
      onConfirmBack();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-slate-950 border border-amber-400/40 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Lock Icon */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 shadow-xl shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Lock className="w-7 h-7 text-amber-400 animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Exit Verification
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {lang === 'bn' ? 'ব্যাক নিতে পাসওয়ার্ড দিন' : 'Enter Password to Go Back'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn'
                    ? 'ভাইব্রেশন ও ডিসপ্লে কালার অ্যানিমেশন বন্ধ করে ব্যাক নিতে পাসওয়ার্ড দিন।'
                    : 'Enter the access password to stop vibration and exit.'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Password Hint & Copy Box */}
              <div className="bg-slate-900 border border-amber-400/20 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    {lang === 'bn' ? 'পাসওয়ার্ড সংকেত (Password):' : 'Password Hint:'}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/30"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'কপি হয়েছে!' : 'পাসওয়ার্ড কপি'}</span>
                  </button>
                </div>
                <div className="font-mono text-sm font-bold text-amber-300 bg-slate-950 px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between">
                  <span>{password}</span>
                  <span className="text-[10px] text-slate-500 font-sans">IM Softworks Pass</span>
                </div>
              </div>

              {/* Password Input Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {lang === 'bn' ? 'পাসওয়ার্ড ইনপুট করুন:' : 'Input Password:'}
                </label>
                <input
                  type="text"
                  placeholder="im.softwark.pass2026"
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors font-mono"
                />
                {error && (
                  <p className="text-[11px] text-rose-400">
                    {lang === 'bn' ? 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।' : 'Invalid password. Please try again.'}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 font-extrabold text-xs hover:shadow-lg hover:shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    {lang === 'bn'
                      ? 'পাসওয়ার্ড দিয়ে ব্যাক নিন (Stop & Back)'
                      : 'Confirm Password & Exit'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onConfirmBack}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'bn' ? 'সরাসরি ব্যাক দিন' : 'Direct Exit'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
