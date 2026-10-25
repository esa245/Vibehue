'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ColorCanvas } from '@/components/ColorCanvas';
import { TopBar } from '@/components/TopBar';
import { BottomBar } from '@/components/BottomBar';
import { HelpModal } from '@/components/HelpModal';
import { SettingsModal } from '@/components/SettingsModal';
import { IMSoftworksPortal } from '@/components/IMSoftworksPortal';
import { BackPasswordModal } from '@/components/BackPasswordModal';
import { Language, ColorModeId, VibrationPatternId, SoundModeId } from '@/lib/types';
import { audioSynth } from '@/lib/audio-synth';
import { VIBRATION_PRESETS } from '@/lib/presets';

export default function Home() {
  // Main application state
  const [isStarted, setIsStarted] = useState(false);
  const [barsVisible, setBarsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Customization settings
  const [selectedColorMode, setSelectedColorMode] = useState<ColorModeId>('spectrum');
  const [selectedVibration, setSelectedVibration] = useState<VibrationPatternId>('pulse');
  const [soundMode, setSoundMode] = useState<SoundModeId>('chime');
  const [speed, setSpeed] = useState(1.2);
  const [customColors, setCustomColors] = useState<string[]>(['#FF0055', '#7A00FF', '#00E5FF', '#00FF66']);

  // Interface options
  const [lang, setLang] = useState<Language>('bn');

  // Modals & Portal
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isBackPasswordModalOpen, setIsBackPasswordModalOpen] = useState(false);

  // Vibration support
  const [isVibrateSupported, setIsVibrateSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      const timer = setTimeout(() => setIsVibrateSupported(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  // Cancel all vibrations immediately
  const cancelVibration = useCallback(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(0);
        navigator.vibrate([]);
      } catch {
        // catch error
      }
    }
  }, []);

  const handleLanguageToggle = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleStart = () => {
    setIsStarted(true);
    setBarsVisible(false);

    if (typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    audioSynth.playTapSound(523.25, 'triangle', 0.2);
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {
        // Ignore
      }
    }
  };

  // User clicks Back/Exit -> Request Password Modal
  const handleRequestBack = () => {
    if (isStarted) {
      setIsBackPasswordModalOpen(true);
    } else {
      cancelVibration();
    }
  };

  // Confirmed Password Exit
  const handleConfirmBack = () => {
    setIsBackPasswordModalOpen(false);
    cancelVibration();
    setIsStarted(false);
    setBarsVisible(true);
    setIsPaused(false);

    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Open Portal
  const handleOpenPortal = () => {
    cancelVibration();
    setIsPortalOpen(true);
  };

  const handleTestVibration = () => {
    const preset = VIBRATION_PRESETS.find((v) => v.id === selectedVibration);
    if (preset && preset.pattern.length > 0 && 'vibrate' in navigator) {
      try {
        navigator.vibrate(preset.pattern);
      } catch {
        // Ignore
      }
    }
    audioSynth.playTapSound(600, 'sine', 0.15);
  };

  const handleCustomColorChange = (index: number, color: string) => {
    const updated = [...customColors];
    updated[index] = color;
    setCustomColors(updated);
  };

  const handleSoundModeToggle = () => {
    const soundCycle: SoundModeId[] = ['off', 'chime', 'healing432', 'pulse'];
    const currentIdx = soundCycle.indexOf(soundMode);
    const nextMode = soundCycle[(currentIdx + 1) % soundCycle.length];
    setSoundMode(nextMode);
    audioSynth.setMuted(nextMode === 'off');
    audioSynth.playTapSound(500, 'sine', 0.1);
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-950 font-sans overflow-hidden">
      {/* Top Header Bar */}
      <TopBar
        visible={barsVisible}
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        selectedColorMode={selectedColorMode}
        onColorModeChange={setSelectedColorMode}
        selectedVibration={selectedVibration}
        onVibrationChange={setSelectedVibration}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenPortal={handleOpenPortal}
        onStartClick={handleStart}
        onStopClick={handleRequestBack}
        isStarted={isStarted}
      />

      {/* Main Fullscreen Canvas */}
      <ColorCanvas
        isStarted={isStarted}
        onStart={handleStart}
        onStop={handleRequestBack}
        isPaused={isPaused}
        selectedColorMode={selectedColorMode}
        selectedVibration={selectedVibration}
        soundMode={soundMode}
        speed={speed}
        customColors={customColors}
        lang={lang}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPortal={handleOpenPortal}
      />

      {/* Bottom Control Bar */}
      <BottomBar
        visible={barsVisible}
        lang={lang}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        selectedVibration={selectedVibration}
        onVibrationChange={setSelectedVibration}
        soundMode={soundMode}
        onSoundModeToggle={handleSoundModeToggle}
        speed={speed}
        onSpeedChange={setSpeed}
        isVibrateSupported={isVibrateSupported}
        onStopClick={handleRequestBack}
        tapCount={0}
      />

      {/* Full IM Softworks Company Portal */}
      <IMSoftworksPortal
        isOpen={isPortalOpen}
        onClose={() => {
          setIsPortalOpen(false);
          cancelVibration();
        }}
        lang={lang}
      />

      {/* Back Password Exit Verification Modal */}
      <BackPasswordModal
        isOpen={isBackPasswordModalOpen}
        onClose={() => setIsBackPasswordModalOpen(false)}
        onConfirmBack={handleConfirmBack}
        lang={lang}
      />

      {/* Help Instructions Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        lang={lang}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        selectedColorMode={selectedColorMode}
        onColorModeChange={setSelectedColorMode}
        selectedVibration={selectedVibration}
        onVibrationChange={setSelectedVibration}
        soundMode={soundMode}
        onSoundModeChange={setSoundMode}
        speed={speed}
        onSpeedChange={setSpeed}
        customColors={customColors}
        onCustomColorChange={handleCustomColorChange}
        showCenterGuide={false}
        onToggleGuide={() => {}}
        onTestVibration={handleTestVibration}
      />
    </main>
  );
}
