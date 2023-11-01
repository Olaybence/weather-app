import React, { useState, useEffect } from "react";
import './Clock.css';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-GB');

  const [hour, minute] = formattedTime.split(':');

  return (
    <div className="centerStyle">
        <p className="pAfterStyle">{hour}</p>
        <p className="pBeforeStyle">{minute}</p>
    </div>
  );
}

export default Clock;