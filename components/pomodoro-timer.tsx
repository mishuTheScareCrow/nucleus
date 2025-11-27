"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { usePomodoroAudio } from "@/hooks/use-pomodoro-audio";

type TimerMode = "focus" | "short_break" | "long_break";

interface PomodoroTimerProps {
  onComplete?: () => void;
  initialSettings?: {
    soundEnabled: boolean;
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
  };
}

export function PomodoroTimer({ onComplete, initialSettings }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>("focus");
  
  // Default or custom durations
  const focusTime = (initialSettings?.focusDuration || 25) * 60;
  const shortBreakTime = (initialSettings?.shortBreakDuration || 5) * 60;
  const longBreakTime = (initialSettings?.longBreakDuration || 15) * 60;

  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(100);
  
  // Sound effects
  const { playStart, playComplete } = usePomodoroAudio();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial times in seconds
  const times = {
    focus: focusTime,
    short_break: shortBreakTime,
    long_break: longBreakTime,
  };

  // Update timer if settings change (optional: might reset timer unexpectedly if not careful)
  useEffect(() => {
    if (!isActive) {
        if (mode === "focus") setTimeLeft(focusTime);
        else if (mode === "short_break") setTimeLeft(shortBreakTime);
        else setTimeLeft(longBreakTime);
    }
  }, [focusTime, shortBreakTime, longBreakTime, mode, isActive]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    const totalTime = times[mode];
    setProgress((timeLeft / totalTime) * 100);
  }, [timeLeft, mode, times]);

  const handleStart = () => {
    setIsActive(true);
    if (initialSettings?.soundEnabled !== false) playStart();
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(times[mode]);
  };

  const handleComplete = () => {
    setIsActive(false);
    if (initialSettings?.soundEnabled !== false) playComplete();
    
    if (mode === "focus") {
      toast.success("Focus session complete! Take a break.");
      if (onComplete) onComplete(); 
      setMode("short_break");
      setTimeLeft(shortBreakTime);
    } else {
      toast.info("Break over! Ready to focus?");
      setMode("focus");
      setTimeLeft(focusTime);
    }
  };

  const handleSkip = () => {
    setIsActive(false);
    if (mode === "focus") {
      setMode("short_break");
      setTimeLeft(shortBreakTime);
    } else {
      setMode("focus");
      setTimeLeft(focusTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {/* Progress Ring Container */}
      <div className="relative flex items-center justify-center">
        {/* Simple CSS Conic Gradient Ring */}
        <div 
          className="h-64 w-64 rounded-full bg-secondary flex items-center justify-center relative"
          style={{
            background: `conic-gradient(hsl(var(--primary)) ${progress}%, transparent 0)`
          }}
        >
           <div className="h-[15.5rem] w-[15.5rem] rounded-full bg-background flex flex-col items-center justify-center z-10">
              <div className="text-6xl font-bold font-mono tracking-widest">
                {formatTime(timeLeft)}
              </div>
              <p className="mt-2 text-muted-foreground font-medium uppercase tracking-widest text-sm">
                {mode === "focus" ? "Focus Time" : "Break Time"}
              </p>
           </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={handleReset}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        {!isActive ? (
          <Button
            size="icon"
            className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            onClick={handleStart}
          >
            <Play className="h-8 w-8 ml-1" />
          </Button>
        ) : (
          <Button
            size="icon"
            className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl"
            onClick={handlePause}
          >
            <Pause className="h-8 w-8" />
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={handleSkip}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      
      {mode !== "focus" && <BreakSuggestion />}
    </div>
  );
}

function BreakSuggestion() {
  const suggestions = [
    "Stretch your legs and walk around.",
    "Drink a glass of water.",
    "Look at something 20 feet away for 20 seconds.",
    "Take 5 deep breaths.",
    "Do a quick tidy up of your desk."
  ];
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
  }, []);

  return (
    <div className="flex items-center gap-3 text-muted-foreground animate-in fade-in slide-in-from-bottom-4">
      <Coffee className="h-5 w-5" />
      <p>{suggestion}</p>
    </div>
  );
}
