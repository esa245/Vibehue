'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ColorModeId, VibrationPatternId } from '@/lib/types';
import { getTranslation } from '@/lib/translations';
import { COLOR_PRESETS } from '@/lib/presets';
import { Sparkles, Settings, HelpCircle, Globe, Play, Key, Square } from 'lucide-react';
import { PWAInstallButton } from '@/components/PWAInstallButton';

interface TopBarProps {
  visible: boolean;
  lang: Language;
  onLanguageToggle: () => void;
  selectedColorMode: ColorModeId;
  onColorModeChange: (mode: ColorModeId) => void;
  selectedVibration: VibrationPatternId;
  onVibrationChange: (vib: VibrationPatternId) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenPortal: () => void;
  onStartClick: () => void;
  onStopClick: () => void;
  isStarted: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  visible,
  lang,
  onLanguageToggle,
  selectedColorMode,
  onColorModeChange,
  onOpenSettings,
  onOpenHelp,
  onOpenPortal,
  onStartClick,
  onStopClick,
  isStarted,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 text-white px-3 md:px-8 py-3 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-8">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <a href="#" className="text-sm md:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                {getTranslation(lang, 'title')}
              </a>
            </div>

            {/* Zone 2: Preset Selectors (Desktop) */}
            <nav className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs text-slate-400 whitespace-nowrap mr-1 font-medium">
                {getTranslation(lang, 'colorModeTitle')}:
              </span>
              {COLOR_PRESETS.slice(0, 5).map((preset) => {
                const isActive = selectedColorMode === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onColorModeChange(preset.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                      isActive
                        ? 'bg-white text-slate-950 font-semibold shadow-md scale-105'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ background: preset.colors[0] }}
                    />
                    {lang === 'bn' ? preset.nameBn.split(' (')[0] : preset.nameEn}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Key Actions ("প্রবেশ করুন" & "ইস্টার্ট করুন") */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* PWA App Install Button */}
              <PWAInstallButton lang={lang} />

              {/* "প্রবেশ করুন" (ENTER PORTAL & GET PASSWORD) BUTTON */}
              <button
                onClick={onOpenPortal}
                className="px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shrink-0 border border-cyan-400/30"
              >
                <Key className="w-3.5 h-3.5 text-cyan-300" />
                <span className="whitespace-nowrap">{getTranslation(lang, 'enterPortal')}</span>
              </button>

              {/* Help Info Button */}
              <button
                onClick={onOpenHelp}
                className="p-2 md:px-3 md:py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                title="সহায়তা"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">সহায়তা</span>
              </button>

              {/* Settings Trigger */}
              <button
                onClick={onOpenSettings}
                className="p-2 md:px-3 md:py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">{getTranslation(lang, 'settings')}</span>
              </button>

              {/* Language Switcher */}
              <button
                onClick={onLanguageToggle}
                className="px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg text-xs font-semibold bg-indigo-600/30 border border-indigo-400/30 text-indigo-200 hover:bg-indigo-600/50 transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{getTranslation(lang, 'languageName')}</span>
              </button>

              {/* Start / Stop Toggle Button */}
              {!isStarted ? (
                <button
                  onClick={onStartClick}
                  className="px-4 py-2 text-xs md:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-xl hover:shadow-lg hover:shadow-cyan-400/25 active:scale-95 transition-all flex items-center gap-2 shrink-0 shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span className="whitespace-nowrap">{getTranslation(lang, 'startButton')}</span>
                </button>
              ) : (
                <button
                  onClick={onStopClick}
                  className="px-4 py-2 text-xs md:text-sm font-bold text-rose-200 bg-rose-500/30 border border-rose-400/40 rounded-xl hover:bg-rose-500/40 active:scale-95 transition-all flex items-center gap-2 shrink-0 shadow-md"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span className="whitespace-nowrap">{getTranslation(lang, 'stopButton')}</span>
                </button>
              )}
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
