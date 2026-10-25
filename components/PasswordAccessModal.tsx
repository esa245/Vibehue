'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Copy, Check, ArrowRight, ShieldCheck, Key, Globe, X } from 'lucide-react';
import { Language } from '@/lib/types';

interface PasswordAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockPortal: () => void;
  lang: Language;
}

export const PasswordAccessModal: React.FC<PasswordAccessModalProps> = ({
  isOpen,
  onClose,
  onUnlockPortal,
  lang,
}) => {
  const [password, setPassword] = useState('im.softwark.pass2026');
  const [copied, setCopied] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const [error, setError] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPass.trim() === password || inputPass.trim() === 'im.softwark.team@gmail.com' || inputPass.trim() === 'pass2026' || inputPass.length > 0) {
      setError(false);
      onUnlockPortal();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Lock Icon */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Lock className="w-7 h-7 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  Secret Gateway Unlocked
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  🌐 IM Softworks Portal
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn'
                    ? 'তিনটি ক্লিক সফল হয়েছে! IM Softworks পোর্টালে প্রবেশ করতে পাসওয়ার্ড বক্স ব্যবহার করুন।'
                    : '3-Taps Verified! Enter password or copy credentials to access the IM Softworks Portal.'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleVerifyPassword} className="mt-6 space-y-4">
              {/* Password Copy Section */}
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    {lang === 'bn' ? 'পোর্টাল সিকিউরিটি পাসওয়ার্ড' : 'Portal Security Password'}:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                  </button>
                </div>
                <div className="font-mono text-sm font-bold text-cyan-300 bg-slate-950 px-3 py-2 rounded-xl border border-white/5 flex items-center justify-between">
                  <span>{password}</span>
                  <span className="text-[10px] text-slate-500 font-sans">Pass Key</span>
                </div>
              </div>

              {/* Password Input Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  {lang === 'bn' ? 'পাসওয়ার্ড দিয়ে প্রবেশ করুন:' : 'Enter Access Password:'}
                </label>
                <input
                  type="text"
                  placeholder="im.softwark.pass2026"
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
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
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-extrabold text-xs hover:shadow-lg hover:shadow-cyan-400/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {lang === 'bn' ? 'IM Softworks পোর্টালে ডিরেক্ট প্রবেশ' : 'Access IM Softworks Portal'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onUnlockPortal}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'bn' ? 'বারগুলো আনলক করুন' : 'Unlock Control Bars Only'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
