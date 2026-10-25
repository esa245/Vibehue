import { Language } from './types';

export const TRANSLATIONS = {
  bn: {
    title: 'VibeHue স্টুডিও',
    subtitle: 'ইন্টারেক্টিভ ফুল-ডিসপ্লে কালার চেঞ্জ ও ভাইব্রেশন এক্সপেরিয়েন্স',
    startButton: 'ইস্টার্ট করুন (Start)',
    enterPortal: 'প্রবেশ করুন (Portal)',
    pauseButton: 'পজ করুন (Pause)',
    stopButton: 'বন্ধ করুন (Exit)',
    backButton: 'ব্যাক / ব্যাক দিন',
    vibeSupported: 'ডিভাইস ভাইব্রেটর সক্রিয়',
    vibeSimulated: 'ভিজ্যুয়াল ভাইব্রেশন রিং (পিসি/নন-ভাইব্রেট)',
    colorModeTitle: 'কালার মোড নির্বাচন করুন',
    vibrationModeTitle: 'ভাইব্রেশন প্যাটার্ন',
    soundModeTitle: 'সাউন্ড ইফেক্টস',
    speedLabel: 'কালার পরিবর্তনের স্পিড',
    speedFast: 'দ্রুত (Strobe)',
    speedSlow: 'ধীর (Zen Flow)',
    customColorTitle: 'কাস্টম কালার প্যালেট',
    centerGuideToggle: 'গাইড দেখান',
    showGuide: 'গাইড অন',
    hideGuide: 'গাইড অফ',
    colorLock: 'বর্তমান কালার ফ্রিজ',
    colorUnlocked: 'কালার রানিং',
    howItWorksTitle: 'যেভাবে কাজ করে:',
    howItWorksStep1: '১. "ইস্টার্ট করুন" বাটনে ক্লিক করলে ফুল পেজজুড়ে কালার চেঞ্জ হবে এবং ভাইব্রেটর চালু হবে।',
    howItWorksStep2: '২. ওপরের "প্রবেশ করুন" বাটনে ক্লিক করে IM Softworks পোর্টালে ঢুকে নিচে পাসওয়ার্ড কপি করতে পারবেন।',
    howItWorksStep3: '৩. পোর্টাল থেকে ব্যাক দিলে বা বন্ধ করলে সাথে সাথে ভাইব্রেশন বন্ধ হয়ে যাবে।',
    close: 'বন্ধ করুন',
    settings: 'সেটিংস',
    languageName: 'English',
  },
  en: {
    title: 'VibeHue Studio',
    subtitle: 'Interactive Full-Display Color & Vibration Sensory Experience',
    startButton: 'Start Experience',
    enterPortal: 'Enter Portal',
    pauseButton: 'Pause Color',
    stopButton: 'Stop & Exit',
    backButton: 'Back / Exit',
    vibeSupported: 'Hardware Vibrator Active',
    vibeSimulated: 'Visual Haptic Pulse',
    colorModeTitle: 'Select Color Mode',
    vibrationModeTitle: 'Vibration Pattern',
    soundModeTitle: 'Sound Synthesizer',
    speedLabel: 'Color Cycle Speed',
    speedFast: 'Fast Strobe',
    speedSlow: 'Slow Zen',
    customColorTitle: 'Custom Color Palette',
    centerGuideToggle: 'Show Overlay Guide',
    showGuide: 'Guide ON',
    hideGuide: 'Guide OFF',
    colorLock: 'Freeze Current Color',
    colorUnlocked: 'Color Cycling',
    howItWorksTitle: 'How It Works:',
    howItWorksStep1: '1. Click "Start Experience" for full page color animation and haptic vibration.',
    howItWorksStep2: '2. Click "Enter Portal" at the top to access IM Softworks and copy the portal password below.',
    howItWorksStep3: '3. Going back or exiting immediately stops all vibrations.',
    close: 'Close',
    settings: 'Settings',
    languageName: 'বাংলা',
  },
};

export function getTranslation(lang: Language, key: keyof typeof TRANSLATIONS['bn'], params?: Record<string, string | number>) {
  let text = TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
  if (params) {
    Object.entries(params).forEach(([paramKey, val]) => {
      text = text.replace(`{${paramKey}}`, String(val));
    });
  }
  return text;
}
