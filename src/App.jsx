import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  
  const milliseconds = time.getMilliseconds();
  
  // Adjusted calculations for smoother hand movement
  const secondsDegrees = ((seconds * 1000 + milliseconds) / 60000) * 360 + 90;
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;

  const formatTimeUnit = (unit) => String(unit).padStart(2, '0');
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;

  return (
    <main className="clock-wrapper">
      <div className="grandfather-clock">
        
        {/* Clock Head */}
        <div className="clock-head">
          <div className="clock">
            <div className="clock-face">
              <div className="hand hour-hand" style={{ transform: `rotate(${hoursDegrees}deg)` }}></div>
              <div className="hand min-hand" style={{ transform: `rotate(${minutesDegrees}deg)` }}></div>
              <div className="hand second-hand" style={{ transform: `rotate(${secondsDegrees}deg)` }}></div>
              <div className="center-dot"></div>
              <div className="number number-1"><span>I</span></div>
              <div className="number number-2"><span>II</span></div>
              <div className="number number-3"><span>III</span></div>
              <div className="number number-4"><span>IV</span></div>
              <div className="number number-5"><span>V</span></div>
              <div className="number number-6"><span>VI</span></div>
              <div className="number number-7"><span>VII</span></div>
              <div className="number number-8"><span>VIII</span></div>
              <div className="number number-9"><span>IX</span></div>
              <div className="number number-10"><span>X</span></div>
              <div className="number number-11"><span>XI</span></div>
              <div className="number number-12"><span>XII</span></div>
            </div>
          </div>
        </div>

        {/* Clock Body with Pendulum */}
        <div className="clock-body">
          <div className="pendulum"></div>
        </div>
      </div>
      
      {/* Digital Display */}
      <div className="digital-clock">
        <span>{formatTimeUnit(displayHours)}</span>:
        <span>{formatTimeUnit(minutes)}</span>:
        <span>{formatTimeUnit(seconds)}</span>
      </div>
    </main>
  );
}

export default App;