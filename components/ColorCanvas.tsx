'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Vibrate, Sparkles, Key, ArrowRight, ShieldCheck, HelpCircle, Square, ArrowLeft } from 'lucide-react';
import { Language, ColorModeId, VibrationPatternId, SoundModeId, TapFeedback } from '@/lib/types';
import { COLOR_PRESETS, VIBRATION_PRESETS } from '@/lib/presets';
import { getTranslation } from '@/lib/translations';
import { audioSynth } from '@/lib/audio-synth';

interface ColorCanvasProps {
  isStarted: boolean;
  onStart: () => void;
  onStop: () => void;
  isPaused: boolean;
  selectedColorMode: ColorModeId;
  selectedVibration: VibrationPatternId;
  soundMode: SoundModeId;
  speed: number;
  customColors: string[];
  lang: Language;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
  onOpenPortal: () => void;
}

export const ColorCanvas: React.FC<ColorCanvasProps> = ({
  isStarted,
  onStart,
  onStop,
  isPaused,
  selectedColorMode,
  selectedVibration,
  soundMode,
  speed,
  customColors,
  lang,
  onOpenHelp,
  onOpenPortal,
}) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentBgColor, setCurrentBgColor] = useState<string>('#0f172a');
  const [hue, setHue] = useState(0);

  // Floating controls overlay visibility during full page mode
  const [showOverlayControls, setShowOverlayControls] = useState(true);

  // Ripple feedback
  const [ripples, setRipples] = useState<TapFeedback[]>([]);
  const [hapticPulse, setHapticPulse] = useState(false);

  // Vibration helper
  const triggerVibration = useCallback(
    (customPattern?: number[]) => {
      const preset = VIBRATION_PRESETS.find((v) => v.id === selectedVibration);
      const pattern = customPattern || (preset ? preset.pattern : [100, 50, 100]);

      if (pattern && pattern.length > 0) {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(pattern);
          } catch {
            // catch
          }
        }
        setHapticPulse(true);
        setTimeout(() => setHapticPulse(false), 200);
      }
    },
    [selectedVibration]
  );

  // Color Cycling Engine
  useEffect(() => {
    if (!isStarted || isPaused) return;

    const preset = COLOR_PRESETS.find((p) => p.id === selectedColorMode);
    const colors = selectedColorMode === 'custom' ? customColors : preset ? preset.colors : customColors;

    const intervalMs = Math.max(80, speed * 1000);

    const timer = setInterval(() => {
      if (selectedColorMode === 'spectrum') {
        setHue((prevHue) => {
          const nextHue = (prevHue + 15) % 360;
          const bg = `hsl(${nextHue}, 90%, 50%)`;
          setCurrentBgColor(bg);
          audioSynth.playColorShiftPulse(nextHue, soundMode);
          return nextHue;
        });
      } else {
        setCurrentColorIndex((prevIdx) => {
          const nextIdx = (prevIdx + 1) % colors.length;
          setCurrentBgColor(colors[nextIdx]);
          audioSynth.playColorShiftPulse(nextIdx * 50, soundMode);
          return nextIdx;
        });
      }

      triggerVibration();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isStarted, isPaused, selectedColorMode, speed, customColors, soundMode, triggerVibration]);

  // Click on Canvas in full-screen mode toggles overlay controls
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    } else {
      return;
    }

    const newRipple: TapFeedback = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      isCenter: true,
      tapCount: 1,
    };
    setRipples((prev) => [...prev.slice(-3), newRipple]);

    if (isStarted) {
      // Toggle floating overlay controls on full screen tap
      setShowOverlayControls((prev) => !prev);
      audioSynth.playTapSound(480, 'sine', 0.1);
      triggerVibration([50]);
    }
  };

  return (
    <div
      onClick={handleCanvasClick}
      onTouchStart={handleCanvasClick}
      className={`relative w-full select-none overflow-hidden transition-colors duration-500 ease-out cursor-pointer flex flex-col justify-center items-center ${
        isStarted ? 'fixed inset-0 z-30 w-screen h-screen' : 'min-h-screen'
      }`}
      style={{
        backgroundColor: isStarted ? currentBgColor : '#090d16',
      }}
    >
      {/* Haptic Pulse Ring */}
      <AnimatePresence>
        {hapticPulse && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1.05, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 border-8 border-cyan-400/30 z-20"
          />
        )}
      </AnimatePresence>

      {/* Tap Ripples */}
      {ripples.map((rip) => (
        <motion.div
          key={rip.id}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-cyan-400 bg-cyan-400/20 z-30"
          style={{ left: rip.x, top: rip.y }}
        />
      ))}

      {/* LANDING HERO VIEW (When NOT started) */}
      {!isStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 max-w-2xl mx-auto text-center px-4 py-12 flex flex-col items-center space-y-8"
        >
          {/* Top Entrance Banner ("প্রবেশ করুন") */}
          <div className="w-full bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-400/40 rounded-2xl p-4 text-left shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg">
                <Key className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">
                  🌐 IM Softworks Portal
                </span>
                <h3 className="text-xs md:text-sm font-bold text-white">
                  প্রবেশ করুন & সিকিউরিটি পাসওয়ার্ড নিন
                </h3>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPortal();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-slate-950 font-black text-xs hover:shadow-lg hover:shadow-cyan-400/30 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <span>প্রবেশ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Sparkle Icon */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-400 p-1 shadow-2xl shadow-purple-500/30 animate-pulse-ring">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full border-2 border-slate-950 flex items-center gap-1">
              <Vibrate className="w-3 h-3" />
              <span>Haptics Active</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {getTranslation(lang, 'title')}
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
              {getTranslation(lang, 'subtitle')}
            </p>
          </div>

          {/* Founder Profile Teaser */}
          <div className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-4 text-left space-y-3 backdrop-blur-md shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden relative shrink-0 border border-cyan-400/40">
                <Image
                  src="https://res.cloudinary.com/dlklqihg6/image/upload/v1760308052/kkchmpjdp9izcjfvvo4k.jpg"
                  alt="Mohammad Esa Ali"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">
                  Mohammad Esa Ali
                </span>
                <p className="text-[11px] text-slate-300">
                  “Your profit is our success / আপনার লাভই আমাদের সফলতা”
                </p>
              </div>
            </div>
          </div>

          {/* Prominent START Button (ইস্টার্ট করুন) */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
              className="w-full py-4 md:py-5 px-8 text-base md:text-lg font-black text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-2xl shadow-xl shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 tracking-wide"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>{getTranslation(lang, 'startButton')}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenHelp();
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors underline underline-offset-4"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ব্যবহারবিধি নির্দেশিকা' : 'View User Guide'}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ACTIVE FULL-SCREEN PAGE CONTROLS OVERLAY */}
      {isStarted && (
        <AnimatePresence>
          {showOverlayControls && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-slate-950/85 border border-white/15 px-4 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl"
            >
              {/* Back / Stop Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStop();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200 font-bold text-xs hover:bg-rose-500/30 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{getTranslation(lang, 'backButton')}</span>
              </button>

              {/* Enter Portal Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPortal();
                }}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-black text-xs hover:shadow-md transition-all flex items-center gap-1.5 shrink-0"
              >
                <Key className="w-3.5 h-3.5" />
                <span>প্রবেশ করুন (Portal)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
