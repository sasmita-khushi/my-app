import { useState, useEffect, useDebugValue } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  // Fake network status toggling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Debug label for DevTools
  useDebugValue(isOnline ? "🟢 Online" : "🔴 Offline");

  return isOnline;
}

export default useOnlineStatus;
