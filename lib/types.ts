export type ColorModeId =
  | 'spectrum'
  | 'zen'
  | 'cyber'
  | 'sunset'
  | 'aurora'
  | 'strobe'
  | 'warm'
  | 'custom';

export type VibrationPatternId =
  | 'pulse'
  | 'heartbeat'
  | 'heavy'
  | 'constant'
  | 'sos'
  | 'subtle'
  | 'off';

export type SoundModeId =
  | 'off'
  | 'chime'
  | 'ambient'
  | 'pulse'
  | 'healing432';

export type Language = 'bn' | 'en';

export interface ColorPreset {
  id: ColorModeId;
  nameBn: string;
  nameEn: string;
  colors: string[];
  type: 'gradient' | 'strobe' | 'smooth';
  defaultSpeed: number; // in seconds
  icon: string;
}

export interface VibrationPreset {
  id: VibrationPatternId;
  nameBn: string;
  nameEn: string;
  pattern: number[];
}

export interface TapFeedback {
  id: number;
  x: number;
  y: number;
  isCenter: boolean;
  tapCount: number;
}
