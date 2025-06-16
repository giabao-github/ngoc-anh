import { useCallback, useEffect, useRef, useState } from "react";

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationFlag, setNotificationFlag] = useState("");
  const [progress, setProgress] = useState(100);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const POPUP_DURATION = 3000;
  const UPDATE_INTERVAL = 16; // ~60fps for smooth animation

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
    setProgress(100);
    clearTimers();
  }, [clearTimers]);

  const showNotificationWithTimeout = useCallback(
    (flag: string) => {
      // Clear any existing timers
      clearTimers();

      // Reset and show notification
      setNotificationFlag(flag);
      setShowNotification(true);
      setProgress(100);
      startTimeRef.current = Date.now();

      // Start progress bar animation
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, POPUP_DURATION - elapsed);
        const progressPercent = (remaining / POPUP_DURATION) * 100;

        setProgress(progressPercent);

        if (remaining <= 0) {
          hideNotification();
        }
      }, UPDATE_INTERVAL);

      // Backup timeout to ensure popup closes
      timeoutRef.current = setTimeout(() => {
        hideNotification();
      }, POPUP_DURATION);
    },
    [clearTimers, hideNotification],
  );

  // Cleanup on unmount
  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  return {
    showNotification,
    notificationFlag,
    progress,
    showNotificationWithTimeout,
    hideNotification,
  };
};
