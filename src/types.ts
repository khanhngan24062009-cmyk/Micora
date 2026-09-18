export type PageTab = 'home' | 'detector' | 'statistics' | 'contact';

export type EyeStatus = 'open' | 'partial' | 'closed' | 'prolonged_closed';

export interface CameraState {
  hasPermission: boolean | null; // null = not requested, true = granted, false = denied
  isStreaming: boolean;
  faceDetected: boolean;
  faceCentered: boolean;
  lightingOk: boolean;
  lightingValue: number; // 0 - 255
  eyeStatus: EyeStatus;
  currentClosedDuration: number; // in seconds
  totalBlinks: number;
  prolongedClosuresCount: number; // count of eye closures >= 0.5s & < 2.0s
  sleepEpisodesCount: number; // count of eye closures >= 2.0s
  perclos: number; // percentage (0 - 100)
  sessionDuration: number; // seconds
  isAlerting: boolean;
  cooldownRemaining: number; // seconds (from 10 down to 0)
}

export interface SurveyData {
  dailySleepHours: number;
  bedTime: string;
  wakeTime: string;
  lastNightSleepHours: number;
  sleepQuality: 'very_good' | 'good' | 'normal' | 'poor' | 'very_poor';
  fatigueLevel: number; // 1 to 5
  frequentLateNight: boolean;
  phoneBeforeBed: boolean;
  insufficientSleepRegularly: boolean;
  hadEnoughRestToday: boolean;
  currentConditions: {
    tired: boolean;
    lossFocus: boolean;
    sleepy: boolean;
    sleepDeprived: boolean;
    scheduleDisrupted: boolean;
  };
}

export type AssessmentLevel = 'level_1' | 'level_2' | 'level_3';

export interface AssessmentResult {
  level: AssessmentLevel;
  levelTitle: string;
  badgeColor: string;
  score: number; // 0 - 100 risk score
  message: string;
  recommendation: string;
  cameraMetrics: {
    sessionDuration: number;
    perclos: number;
    sleepEpisodesCount: number;
    prolongedClosuresCount: number;
    totalBlinks: number;
  };
  surveySummary: {
    sleepDeficitHours: number;
    fatigueLevel: number;
    riskFactorsCount: number;
  };
  timestamp: string;
}

export interface FeedbackSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  createdAt: string;
}
