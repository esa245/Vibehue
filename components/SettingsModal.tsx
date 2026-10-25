'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, Palette, Vibrate, Volume2, Sliders, Check, Eye } from 'lucide-react';
import { Language, ColorModeId, VibrationPatternId, SoundModeId } from '@/lib/types';
import { COLOR_PRESETS, VIBRATION_PRESETS } from '@/lib/presets';
import { getTranslation } from '@/lib/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  selectedColorMode: ColorModeId;
  onColorModeChange: (mode: ColorModeId) => void;
  selectedVibration: VibrationPatternId;
  onVibrationChange: (vib: VibrationPatternId) => void;
  soundMode: SoundModeId;
  onSoundModeChange: (sound: SoundModeId) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  customColors: string[];
  onCustomColorChange: (index: number, color: string) => void;
  showCenterGuide: boolean;
  onToggleGuide: () => void;
  onTestVibration: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  lang,
  selectedColorMode,
  onColorModeChange,
  selectedVibration,
  onVibrationChange,
  soundMode,
  onSoundModeChange,
  speed,
  onSpeedChange,
  customColors,
  onCustomColorChange,
  showCenterGuide,
  onToggleGuide,
  onTestVibration,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl bg-slate-950 border border-white/10 rounded-3xl p-6 shadow-2xl text-white my-8 relative max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">
                  {getTranslation(lang, 'settings')}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="py-4 space-y-6 overflow-y-auto pr-1 custom-scrollbar">
              {/* Color Preset Selector */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Palette className="w-4 h-4" />
                  <span>{getTranslation(lang, 'colorModeTitle')}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((preset) => {
                    const isActive = selectedColorMode === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => onColorModeChange(preset.id)}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                          isActive
                            ? 'bg-slate-800 border-cyan-400 shadow-lg shadow-cyan-500/10'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold truncate">
                            {lang === 'bn' ? preset.nameBn.split(' (')[0] : preset.nameEn}
                          </span>
                          {isActive && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                        </div>
                        {/* Gradient Preview Bar */}
                        <div
                          className="w-full h-3 rounded-md mt-2"
                          style={{
                            background: `linear-gradient(to right, ${preset.colors.join(', ')})`,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Editor if 'custom' mode selected */}
              {selectedColorMode === 'custom' && (
                <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-xs font-semibold text-purple-300">
                    {getTranslation(lang, 'customColorTitle')}
                  </span>
                  <div className="flex items-center gap-3 flex-wrap">
                    {customColors.map((col, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <input
                          type="color"
                          value={col}
                          onChange={(e) => onCustomColorChange(idx, e.target.value)}
                          className="w-10 h-10 rounded-xl cursor-pointer border border-white/20 bg-transparent p-0"
                        />
                        <span className="text-[10px] font-mono text-slate-400">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vibration Pattern Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <Vibrate className="w-4 h-4" />
                    <span>{getTranslation(lang, 'vibrationModeTitle')}</span>
                  </div>
                  <button
                    onClick={onTestVibration}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30 transition-colors"
                  >
                    টেস্ট ভাইব্রেশন (Test)
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VIBRATION_PRESETS.map((vib) => {
                    const isActive = selectedVibration === vib.id;
                    return (
                      <button
                        key={vib.id}
                        onClick={() => onVibrationChange(vib.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                          isActive
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        {lang === 'bn' ? vib.nameBn : vib.nameEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound Synthesizer Mode */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                  <Volume2 className="w-4 h-4" />
                  <span>{getTranslation(lang, 'soundModeTitle')}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'off', label: 'ম্যুট (Off)' },
                    { id: 'chime', label: 'মেলোডি চিম' },
                    { id: 'healing432', label: '৪৩২Hz হিলিং' },
                    { id: 'pulse', label: 'বীট পালস' },
                  ].map((snd) => {
                    const isActive = soundMode === snd.id;
                    return (
                      <button
                        key={snd.id}
                        onClick={() => onSoundModeChange(snd.id as SoundModeId)}
                        className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        {snd.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Speed Controller */}
              <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{getTranslation(lang, 'speedLabel')}</span>
                  <span className="font-mono text-cyan-300 font-bold">{speed}s</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="4.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{getTranslation(lang, 'speedFast')} (0.1s)</span>
                  <span>{getTranslation(lang, 'speedSlow')} (4.0s)</span>
                </div>
              </div>

              {/* Center Target Box Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">{getTranslation(lang, 'centerGuideToggle')}</p>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'bn'
                        ? 'মাঝে ৩টি ক্লিক আনলক জোন দেখানোর জন্য গাইড ফ্রেম অন রাখুন'
                        : 'Displays translucent box overlay showing center 3-click unlock zone'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggleGuide}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    showCenterGuide
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 border border-white/10'
                  }`}
                >
                  {showCenterGuide ? getTranslation(lang, 'showGuide') : getTranslation(lang, 'hideGuide')}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 active:scale-95 transition-all"
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
