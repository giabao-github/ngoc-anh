import { useState, useRef, useCallback, useEffect } from "react";

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationFlag, setNotificationFlag] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNotificationTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showNotificationWithTimeout = useCallback((flag: string) => {
    clearNotificationTimeout();
    setNotificationFlag(flag);
    setShowNotification(true);
    
    timeoutRef.current = setTimeout(() => {
      setShowNotification(false);
      timeoutRef.current = null;
    }, 3000);
  }, [clearNotificationTimeout]);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
    clearNotificationTimeout();
  }, [clearNotificationTimeout]);

  // Cleanup effect
  useEffect(() => {
    return clearNotificationTimeout;
  }, [clearNotificationTimeout]);

  return {
    showNotification,
    notificationFlag,
    showNotificationWithTimeout,
    hideNotification,
  };
};