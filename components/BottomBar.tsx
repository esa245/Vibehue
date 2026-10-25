'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, VibrationPatternId, SoundModeId } from '@/lib/types';
import { getTranslation } from '@/lib/translations';
import { VIBRATION_PRESETS } from '@/lib/presets';
import { Pause, Play, Vibrate, Volume2, VolumeX, ShieldAlert, Sliders, Lock, Unlock, Square } from 'lucide-react';

interface BottomBarProps {
  visible: boolean;
  lang: Language;
  isPaused: boolean;
  onTogglePause: () => void;
  selectedVibration: VibrationPatternId;
  onVibrationChange: (vib: VibrationPatternId) => void;
  soundMode: SoundModeId;
  onSoundModeToggle: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isVibrateSupported: boolean;
  onStopClick: () => void;
  tapCount: number;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  visible,
  lang,
  isPaused,
  onTogglePause,
  selectedVibration,
  onVibrationChange,
  soundMode,
  onSoundModeToggle,
  speed,
  onSpeedChange,
  isVibrateSupported,
  onStopClick,
  tapCount,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.footer
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-xl border-t border-white/10 text-white px-4 md:px-8 py-3 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Quick Actions (Pause Color, Sound, Vibration Select) */}
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
              {/* Color Freeze Toggle */}
              <button
                onClick={onTogglePause}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 shrink-0 ${
                  isPaused
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {isPaused ? <Lock className="w-4 h-4 text-amber-400" /> : <Unlock className="w-4 h-4 text-cyan-400" />}
                <span>{isPaused ? getTranslation(lang, 'colorLock') : getTranslation(lang, 'colorUnlocked')}</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={onSoundModeToggle}
                className={`p-2 px-3 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 shrink-0 ${
                  soundMode !== 'off'
                    ? 'bg-purple-500/20 border-purple-400/50 text-purple-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {soundMode !== 'off' ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
                <span className="capitalize">{soundMode}</span>
              </button>

              {/* Vibration Select Dropdown / Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
                <Vibrate className={`w-4 h-4 shrink-0 ${isVibrateSupported ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <div className="flex gap-1">
                  {VIBRATION_PRESETS.slice(0, 4).map((vib) => {
                    const isActive = selectedVibration === vib.id;
                    return (
                      <button
                        key={vib.id}
                        onClick={() => onVibrationChange(vib.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                          isActive
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                            : 'bg-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {lang === 'bn' ? vib.nameBn.split(' (')[0] : vib.nameEn.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Center: Instruction Reminder & Tap Tracker */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate max-w-md">
                {lang === 'bn' ? 'উপরে "প্রবেশ করুন" বাটনে ক্লিক করে পাসওয়ার্ড নিন' : 'Click "Enter Portal" at top to access password'}
              </span>
              {tapCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[11px] animate-bounce">
                  {tapCount}/3
                </span>
              )}
            </div>

            {/* Right: Speed Slider & Stop / Exit Button */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Speed Slider */}
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] text-slate-400 hidden sm:inline">{getTranslation(lang, 'speedLabel')}:</span>
                <input
                  type="range"
                  min="0.1"
                  max="4.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                  className="w-20 sm:w-24 accent-cyan-400 cursor-pointer"
                />
                <span className="text-[11px] font-mono text-cyan-300 w-8">{speed}s</span>
              </div>

              {/* Stop & Exit Button */}
              <button
                onClick={onStopClick}
                className="px-4 py-2 text-xs font-semibold text-rose-300 bg-rose-500/20 border border-rose-400/30 rounded-xl hover:bg-rose-500/30 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{getTranslation(lang, 'stopButton')}</span>
              </button>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};
