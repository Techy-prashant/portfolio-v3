/**
 * Digital Eye Intro Experience Types & Configurations
 */

export type ExperienceMode = 'full' | 'quick' | 'none';

export type ScenePhase = 
  | 'opening'     // Stage A: Almond eye gradually opens
  | 'look_left'   // Stage B: Pupil and iris smoothly look left
  | 'center_pause'// Stage C: Return to center, natural pause
  | 'look_right'  // Stage D: Pupil and iris smoothly look right
  | 'direct_gaze' // Stage E: Return to center, hold attentive gaze at viewer
  | 'closing'     // Stage F: Eyelids converge naturally until fully closed
  | 'revealing'   // Final transition: Instant portfolio reveal
  | 'complete';   // Completely unmounted / hidden

export interface DigitalEyeConfig {
  /** Inactivity window before full experience can replay (default 7 days) */
  reappearancePeriodMs: number;
  /** Storage key for persistent timestamp */
  storageKey: string;
  /** Session storage key for active session tracking */
  sessionKey: string;
}

export const DEFAULT_EYE_CONFIG: DigitalEyeConfig = {
  reappearancePeriodMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  storageKey: 'prashant_portfolio_eye_last_seen',
  sessionKey: 'prashant_portfolio_eye_session_active',
};

export interface EyeDimensions {
  width: number;
  height: number;
  dpr: number;
}
