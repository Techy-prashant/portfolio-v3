"use client";

import React, { useEffect, useRef } from "react";
import { ExperienceMode, ScenePhase } from "./eyeTypes";

interface DigitalEyeCanvasProps {
  mode: ExperienceMode;
  onPhaseChange?: (phase: ScenePhase) => void;
  onComplete: () => void;
}

// Alphanumeric, binary and cybernetic glyph palette
const GLYPHS = [
  "0", "1", "0", "1", "0", "1", "1", "0",
  "A", "B", "C", "D", "E", "F", "9", "8",
  "7", "6", "5", "4", "3", "2", "1", "0",
  "X", "Z", "Ø", "∆", "λ", "%", "+", "-",
  ">", "<", "/", "|"
];

interface IrisChar {
  ringIndex: number;
  relativeRadius: number; // 0 (inner pupil edge) to 1 (limbal ring)
  angleOffset: number;     // 0 to 2*PI
  speed: number;           // Subtle orbital rotation speed
  glyph: string;
  mutationCounter: number;
  mutationInterval: number;
  size: number;
  brightness: number;
}

interface ScleraParticle {
  normX: number; // -1 to 1 relative to eye half-width
  normY: number; // -1 to 1 relative to eye half-height
  glyph: string;
  alpha: number;
  size: number;
}

export const DigitalEyeCanvas: React.FC<DigitalEyeCanvasProps> = ({
  mode,
  onPhaseChange,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    // Timeline duration milestones
    const isFull = mode === "full";
    const TIMELINE = isFull
      ? {
          opening: 1.4,        // Stage A: 0.0 - 1.4s
          openingHold: 0.5,    // Stage A pause: 1.4 - 1.9s
          lookLeft: 1.0,       // Stage B: 1.9 - 2.9s
          centerPause: 0.8,    // Stage C: 2.9 - 3.7s
          lookRight: 1.0,      // Stage D: 3.7 - 4.7s
          directGaze: 1.0,     // Stage E: 4.7 - 5.7s
          closing: 0.8,        // Stage F: 5.7 - 6.5s
          total: 6.5,
        }
      : {
          opening: 0.35,       // Quick open
          openingHold: 0.0,
          lookLeft: 0.0,
          centerPause: 0.0,
          lookRight: 0.0,
          directGaze: 0.35,    // Quick attentive gaze
          closing: 0.38,       // Quick natural close
          total: 1.08,
        };

    const startTime = performance.now();
    let currentPhase: ScenePhase = "opening";

    // Viewport geometry
    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Easing functions
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeInCubic = (t: number) => t * t * t;

    // Generate iris concentric rings & character structure
    // 16 concentric rings with hundreds of characters
    const ringCount = isFull ? 16 : 12;
    const irisCharacters: IrisChar[] = [];

    for (let r = 0; r < ringCount; r++) {
      const ringNorm = r / (ringCount - 1); // 0 (inner) to 1 (outer)
      // Increasing density from pupillary zone to limbal ring
      const charCount = Math.round(20 + ringNorm * 64);
      const rotDir = r % 2 === 0 ? 1 : -1;
      const rotSpeed = (0.04 + (1 - ringNorm) * 0.12) * rotDir;

      for (let i = 0; i < charCount; i++) {
        const angleOffset = (i / charCount) * Math.PI * 2;
        irisCharacters.push({
          ringIndex: r,
          relativeRadius: ringNorm,
          angleOffset,
          speed: rotSpeed,
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          mutationCounter: 0,
          mutationInterval: Math.floor(25 + Math.random() * 60),
          size: Math.round(7.5 + (1 - ringNorm) * 3),
          brightness: 0.5 + Math.random() * 0.5,
        });
      }
    }

    // Sclera fine data-texture particles in corners
    const scleraParticles: ScleraParticle[] = [];
    for (let i = 0; i < 40; i++) {
      // Distribute towards inner and outer corners
      const side = Math.random() > 0.5 ? 1 : -1;
      scleraParticles.push({
        normX: side * (0.35 + Math.random() * 0.55),
        normY: (Math.random() - 0.5) * 0.6,
        glyph: Math.random() > 0.5 ? "1" : "0",
        alpha: 0.05 + Math.random() * 0.08,
        size: 7 + Math.random() * 3,
      });
    }

    // Dynamic state
    let smoothedLookX = 0;
    let smoothedLookY = 0;

    // Render loop
    const render = (now: number) => {
      if (isDestroyed) return;

      const elapsed = (now - startTime) / 1000;

      // Determine active stage & calculate target eye look position and aperture
      let phase: ScenePhase = "opening";
      let aperture = 0; // 0 (closed) to 1 (fully open almond)
      let targetLookX = 0;
      let targetLookY = 0;
      let pupilDilation = 1.0;

      if (isFull) {
        const t1 = TIMELINE.opening; // 1.4
        const t2 = t1 + TIMELINE.openingHold; // 1.9
        const t3 = t2 + TIMELINE.lookLeft; // 2.9
        const t4 = t3 + TIMELINE.centerPause; // 3.7
        const t5 = t4 + TIMELINE.lookRight; // 4.7
        const t6 = t5 + TIMELINE.directGaze; // 5.7
        const t7 = TIMELINE.total; // 6.5

        if (elapsed < t1) {
          // Stage A: Opening
          phase = "opening";
          const prog = easeOutCubic(elapsed / t1);
          aperture = prog;
          targetLookX = 0;
          targetLookY = 0;
          pupilDilation = 0.95 + prog * 0.05;
        } else if (elapsed < t2) {
          // Stage A Hold: Awake and observant
          phase = "opening";
          aperture = 1.0;
          targetLookX = 0;
          targetLookY = 0;
          pupilDilation = 1.0;
        } else if (elapsed < t3) {
          // Stage B: Look Left
          phase = "look_left";
          aperture = 1.0;
          const leftProg = (elapsed - t2) / TIMELINE.lookLeft;
          // Smooth glide to -62px with hold
          const glide = easeInOutCubic(Math.min(1, leftProg * 1.5));
          targetLookX = -62 * glide;
          targetLookY = -2 * glide;
          pupilDilation = 1.05;
        } else if (elapsed < t4) {
          // Stage C: Return to Center & Natural Pause
          phase = "center_pause";
          aperture = 1.0;
          const centerProg = (elapsed - t3) / TIMELINE.centerPause;
          const glide = easeInOutCubic(Math.min(1, centerProg * 1.6));
          targetLookX = -62 * (1 - glide);
          targetLookY = -2 * (1 - glide);
          pupilDilation = 1.0;
        } else if (elapsed < t5) {
          // Stage D: Look Right
          phase = "look_right";
          aperture = 1.0;
          const rightProg = (elapsed - t4) / TIMELINE.lookRight;
          const glide = easeInOutCubic(Math.min(1, rightProg * 1.5));
          targetLookX = 62 * glide;
          targetLookY = 1 * glide;
          pupilDilation = 1.05;
        } else if (elapsed < t6) {
          // Stage E: Return to Center & Direct Attentive Gaze at Viewer
          phase = "direct_gaze";
          aperture = 1.0;
          const gazeProg = (elapsed - t5) / TIMELINE.directGaze;
          const glide = easeInOutCubic(Math.min(1, gazeProg * 1.8));
          targetLookX = 62 * (1 - glide);
          targetLookY = 1 * (1 - glide);
          // Subtle living micro-motion & focused pupil constriction
          const microTime = elapsed * 3;
          targetLookX += Math.sin(microTime) * 0.7;
          targetLookY += Math.cos(microTime * 1.3) * 0.4;
          pupilDilation = 0.94 + Math.sin(microTime * 2) * 0.02;
        } else if (elapsed < t7) {
          // Stage F: Natural Eyelid Closure
          phase = "closing";
          const closeProg = easeInCubic((elapsed - t6) / TIMELINE.closing);
          aperture = Math.max(0, 1.0 - closeProg);
          targetLookX = 0;
          targetLookY = 0;
          pupilDilation = 0.94;
        } else {
          // Completed
          phase = "revealing";
          if (currentPhase !== "revealing") {
            currentPhase = "revealing";
            onPhaseChange?.("revealing");
            onComplete();
            return;
          }
        }
      } else {
        // Quick Mode for ordinary refreshes (~1.08s)
        const t1 = TIMELINE.opening; // 0.35
        const t2 = t1 + TIMELINE.directGaze; // 0.70
        const t3 = TIMELINE.total; // 1.08

        if (elapsed < t1) {
          phase = "opening";
          aperture = easeOutCubic(elapsed / t1);
          targetLookX = 0;
          targetLookY = 0;
        } else if (elapsed < t2) {
          phase = "direct_gaze";
          aperture = 1.0;
          targetLookX = 0;
          targetLookY = 0;
        } else if (elapsed < t3) {
          phase = "closing";
          const closeProg = easeInCubic((elapsed - t2) / TIMELINE.closing);
          aperture = Math.max(0, 1.0 - closeProg);
          targetLookX = 0;
          targetLookY = 0;
        } else {
          phase = "revealing";
          if (currentPhase !== "revealing") {
            currentPhase = "revealing";
            onPhaseChange?.("revealing");
            onComplete();
            return;
          }
        }
      }

      if (phase !== currentPhase) {
        currentPhase = phase;
        onPhaseChange?.(phase);
      }

      // Smooth damped lerp for organic, inertial eyeball tracking
      smoothedLookX += (targetLookX - smoothedLookX) * 0.12;
      smoothedLookY += (targetLookY - smoothedLookY) * 0.12;

      // -------------------------------------------------------------
      // HUMAN-LIKE ALMOND EYE GEOMETRY
      // -------------------------------------------------------------
      const cx = w / 2;
      const cy = h / 2;

      // Size calculation: 60-68% of viewport width on desktop, responsive max/min
      const targetWidth = Math.min(w * 0.68, 920);
      const eyeWidth = Math.max(320, targetWidth);
      const halfW = eyeWidth / 2;

      // Authentic human proportion: narrow vertical opening (height is ~32-34% of width)
      const maxEyeHeight = Math.min(eyeWidth * 0.33, 275);

      // Anatomical asymmetric corners:
      // Inner corner (medial canthus) is slightly lower (+5px) with teardrop taper
      // Outer corner (lateral canthus) is slightly higher (-4px)
      const innerX = cx - halfW;
      const innerY = cy + 5;
      const outerX = cx + halfW;
      const outerY = cy - 4;

      // Asymmetric eyelid heights:
      // In human anatomy, upper eyelid covers ~70% of closure and has a higher arch
      // Lower eyelid is flatter and covers ~30%
      const topPeak = maxEyeHeight * 0.65 * aperture;
      const botPeak = maxEyeHeight * 0.35 * aperture;

      // Closed-eye baseline curve coordinates
      const closedBaseY = cy + 1;

      // -------------------------------------------------------------
      // Canvas Drawing Pass
      // -------------------------------------------------------------
      ctx.save();
      ctx.scale(dpr, dpr);

      // Pure pitch-black canvas background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // If aperture is effectively closed, don't draw internal anatomy
      if (aperture > 0.005) {
        // -------------------------------------------------------------
        // 1. Organic Almond Eyelid Aperture (Clipping Path)
        // -------------------------------------------------------------
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);

        // Upper Eyelid Curve (Peaks slightly medial to center, ~40% from inner corner)
        ctx.bezierCurveTo(
          cx - halfW * 0.55,
          closedBaseY - topPeak * 1.08,
          cx + halfW * 0.25,
          closedBaseY - topPeak * 0.98,
          outerX,
          outerY
        );

        // Lower Eyelid Curve (Flatter, lowest point slightly lateral to center)
        ctx.bezierCurveTo(
          cx + halfW * 0.35,
          closedBaseY + botPeak * 1.05,
          cx - halfW * 0.45,
          closedBaseY + botPeak * 0.95,
          innerX,
          innerY
        );
        ctx.closePath();
        ctx.clip(); // CLIPS EVERYTHING INSIDE THE EYELIDS!

        // -------------------------------------------------------------
        // 2. Sclera (Curved 3D Spherical Eyeball Surface)
        // -------------------------------------------------------------
        // Spherical 3D gradient across the eyeball
        const scleraGrad = ctx.createRadialGradient(
          cx + smoothedLookX * 0.2,
          cy + smoothedLookY * 0.2,
          maxEyeHeight * 0.2,
          cx,
          cy,
          halfW * 0.95
        );
        scleraGrad.addColorStop(0, "#0C1626"); // Soft illuminated twilight blue-charcoal near iris
        scleraGrad.addColorStop(0.55, "#070E1A"); // Deep navy
        scleraGrad.addColorStop(0.85, "#04070E"); // Shaded spherical corner
        scleraGrad.addColorStop(1, "#010307"); // Deep corner shadow

        ctx.fillStyle = scleraGrad;
        ctx.fillRect(innerX - 10, cy - maxEyeHeight * 1.2, eyeWidth + 20, maxEyeHeight * 2.4);

        // Subtle digital data-tracks in sclera corners
        ctx.font = `600 8.5px 'Space Mono', 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const p of scleraParticles) {
          const px = cx + p.normX * halfW + smoothedLookX * 0.15;
          const py = cy + p.normY * maxEyeHeight + smoothedLookY * 0.15;
          ctx.fillStyle = `rgba(0, 220, 255, ${p.alpha * aperture})`;
          ctx.fillText(p.glyph, px, py);
        }

        // Inner corner lacrimal caruncle subtle organic hint
        const caruncleGrad = ctx.createRadialGradient(
          innerX + 16,
          innerY,
          2,
          innerX + 16,
          innerY,
          22
        );
        caruncleGrad.addColorStop(0, "rgba(0, 140, 180, 0.25)");
        caruncleGrad.addColorStop(1, "rgba(0, 10, 25, 0)");
        ctx.fillStyle = caruncleGrad;
        ctx.beginPath();
        ctx.arc(innerX + 16, innerY, 22, 0, Math.PI * 2);
        ctx.fill();

        // -------------------------------------------------------------
        // 3. Digital Iris (Cohesive Living Anatomy of Binary Characters)
        // -------------------------------------------------------------
        // Iris radius is proportional to eye height so it fills vertical aperture naturally
        const irisRadius = maxEyeHeight * 0.54;
        const irisCenterX = cx + smoothedLookX;
        const irisCenterY = cy + smoothedLookY;

        // Limbal Ring (Crisp outer anatomical boundary of iris)
        ctx.save();
        const limbalGrad = ctx.createRadialGradient(
          irisCenterX,
          irisCenterY,
          irisRadius * 0.88,
          irisCenterX,
          irisCenterY,
          irisRadius * 1.03
        );
        limbalGrad.addColorStop(0, "rgba(0, 30, 60, 0)");
        limbalGrad.addColorStop(0.65, "rgba(0, 60, 120, 0.4)");
        limbalGrad.addColorStop(0.92, "rgba(0, 220, 255, 0.8)");
        limbalGrad.addColorStop(1, "rgba(0, 15, 35, 0.95)");

        ctx.fillStyle = limbalGrad;
        ctx.beginPath();
        ctx.arc(irisCenterX, irisCenterY, irisRadius * 1.03, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Render iris characters moving along rotating concentric tracks
        const timeSec = elapsed;
        const innerPupilRadiusRatio = 0.24;

        for (let i = 0; i < irisCharacters.length; i++) {
          const ch = irisCharacters[i];

          // Deterministic character mutation
          ch.mutationCounter++;
          if (ch.mutationCounter > ch.mutationInterval) {
            ch.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            ch.mutationCounter = 0;
          }

          // Radius interpolation from pupillary border to limbal ring
          const rCurrent =
            (innerPupilRadiusRatio +
              (1 - innerPupilRadiusRatio) * Math.pow(ch.relativeRadius, 0.92)) *
            irisRadius;

          const currentAngle = ch.angleOffset + timeSec * ch.speed;
          const charX = irisCenterX + Math.cos(currentAngle) * rCurrent;
          const charY = irisCenterY + Math.sin(currentAngle) * rCurrent;

          // Color palette:
          // Pupillary zone (< 0.35): Neon Cyan #00FFFF
          // Collarette (0.35 - 0.5): Brilliant Cyan / Ice Blue
          // Ciliary zone (0.5 - 0.85): Electric Blue #0052FF
          // Limbal zone (> 0.85): Deep Teal / Indigo #003366
          let rVal: number, gVal: number, bVal: number;
          if (ch.relativeRadius < 0.32) {
            rVal = 0;
            gVal = 245;
            bVal = 255;
          } else if (ch.relativeRadius < 0.52) {
            // Collarette bright ripple
            rVal = 10;
            gVal = 190 + Math.round((1 - ch.relativeRadius) * 65);
            bVal = 255;
          } else if (ch.relativeRadius < 0.85) {
            // Mid electric blue
            rVal = 0;
            gVal = 100 + Math.round((1 - ch.relativeRadius) * 90);
            bVal = 255;
          } else {
            // Outer deep teal
            rVal = 0;
            gVal = 60 + Math.round((1 - ch.relativeRadius) * 45);
            bVal = 160;
          }

          const alpha = ch.brightness * (0.45 + (1 - ch.relativeRadius) * 0.55);

          ctx.save();
          ctx.translate(charX, charY);
          ctx.rotate(currentAngle + Math.PI / 2); // Oriented radially/tangentially
          ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
          ctx.font = `600 ${ch.size}px 'Space Mono', monospace`;
          ctx.fillText(ch.glyph, 0, 0);
          ctx.restore();
        }

        // -------------------------------------------------------------
        // 4. Central Pupil & Electric-Cyan Corona
        // -------------------------------------------------------------
        const pupilRadius = irisRadius * innerPupilRadiusRatio * pupilDilation;

        // Controlled cyan radiant corona around pupil
        ctx.save();
        const corona = ctx.createRadialGradient(
          irisCenterX,
          irisCenterY,
          pupilRadius * 0.7,
          irisCenterX,
          irisCenterY,
          pupilRadius * 2.2
        );
        corona.addColorStop(0, "rgba(0, 255, 255, 0.75)");
        corona.addColorStop(0.35, "rgba(0, 150, 255, 0.45)");
        corona.addColorStop(0.75, "rgba(0, 60, 180, 0.15)");
        corona.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = corona;
        ctx.beginPath();
        ctx.arc(irisCenterX, irisCenterY, pupilRadius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Deep Black Obsidian Pupil Core
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(irisCenterX, irisCenterY, pupilRadius, 0, Math.PI * 2);
        ctx.fill();

        // Luminous crisp cyan pupil boundary ring
        ctx.strokeStyle = "rgba(0, 255, 255, 0.9)";
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Micro-scale telemetry tick marks inside pupil rim
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(0, 255, 255, 0.35)";
        ctx.lineWidth = 1;
        const tickCount = 14;
        for (let t = 0; t < tickCount; t++) {
          const ang = (t / tickCount) * Math.PI * 2 + timeSec * 0.3;
          const tx1 = irisCenterX + Math.cos(ang) * (pupilRadius - 3.5);
          const ty1 = irisCenterY + Math.sin(ang) * (pupilRadius - 3.5);
          const tx2 = irisCenterX + Math.cos(ang) * (pupilRadius - 0.5);
          const ty2 = irisCenterY + Math.sin(ang) * (pupilRadius - 0.5);
          ctx.beginPath();
          ctx.moveTo(tx1, ty1);
          ctx.lineTo(tx2, ty2);
          ctx.stroke();
        }

        // -------------------------------------------------------------
        // 5. Specular Corneal Catchlight (Living Wet Eye Gloss)
        // -------------------------------------------------------------
        // Primary specular highlight (10:30 o'clock)
        const hlX = irisCenterX - irisRadius * 0.32 + smoothedLookX * 0.05;
        const hlY = irisCenterY - irisRadius * 0.32 + smoothedLookY * 0.05;

        const specGrad = ctx.createRadialGradient(hlX, hlY, 1, hlX, hlY, pupilRadius * 0.45);
        specGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        specGrad.addColorStop(0.4, "rgba(200, 250, 255, 0.8)");
        specGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

        ctx.fillStyle = specGrad;
        ctx.beginPath();
        ctx.arc(hlX, hlY, pupilRadius * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Secondary subtle fill catchlight (4:30 o'clock)
        const hl2X = irisCenterX + irisRadius * 0.28;
        const hl2Y = irisCenterY + irisRadius * 0.28;
        ctx.fillStyle = "rgba(0, 240, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(hl2X, hl2Y, pupilRadius * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // End of clipped eye interior
        ctx.restore();

        // -------------------------------------------------------------
        // 6. Eyelid Margins (Waterline & Anatomical Edge Definition)
        // -------------------------------------------------------------
        ctx.save();
        // Upper Eyelid Margin Line
        ctx.strokeStyle = `rgba(0, 220, 255, ${0.45 * aperture})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.bezierCurveTo(
          cx - halfW * 0.55,
          closedBaseY - topPeak * 1.08,
          cx + halfW * 0.25,
          closedBaseY - topPeak * 0.98,
          outerX,
          outerY
        );
        ctx.stroke();

        // Lower Eyelid Margin Line
        ctx.strokeStyle = `rgba(0, 160, 255, ${0.35 * aperture})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(outerX, outerY);
        ctx.bezierCurveTo(
          cx + halfW * 0.35,
          closedBaseY + botPeak * 1.05,
          cx - halfW * 0.45,
          closedBaseY + botPeak * 0.95,
          innerX,
          innerY
        );
        ctx.stroke();
        ctx.restore();

        // -------------------------------------------------------------
        // 7. Superior Palpebral Fold (Upper Eyelid Crease Depth)
        // -------------------------------------------------------------
        if (aperture > 0.25) {
          ctx.save();
          const creaseHeight = topPeak + 22 * aperture;
          const creaseAlpha = (aperture - 0.25) * 0.45;

          ctx.strokeStyle = `rgba(0, 180, 240, ${creaseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(innerX + halfW * 0.18, cy - creaseHeight * 0.7);
          ctx.bezierCurveTo(
            cx - halfW * 0.35,
            cy - creaseHeight * 1.05,
            cx + halfW * 0.35,
            cy - creaseHeight * 0.98,
            outerX - halfW * 0.12,
            cy - creaseHeight * 0.65
          );
          ctx.stroke();

          // Delicate cybernetic micro-dashes along crease
          ctx.font = `600 7.5px 'Space Mono', monospace`;
          ctx.fillStyle = `rgba(0, 255, 255, ${creaseAlpha * 0.7})`;
          const creaseSteps = 14;
          for (let s = 1; s < creaseSteps; s++) {
            const st = s / creaseSteps;
            const sx = innerX + halfW * 0.2 + st * (eyeWidth * 0.65);
            const sy = cy - creaseHeight * (0.8 + Math.sin(st * Math.PI) * 0.25);
            ctx.fillText((s + Math.floor(timeSec * 4)) % 2 === 0 ? "1" : "0", sx, sy);
          }
          ctx.restore();
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [mode, onPhaseChange, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-black select-none pointer-events-none cursor-default"
      style={{
        imageRendering: "crisp-edges",
      }}
    />
  );
};

export default DigitalEyeCanvas;
