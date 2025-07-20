import { useEffect, useState } from "react";

export default function MyComponent() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <h1>Current Time : {time}</h1>
    </div>
  );
}
