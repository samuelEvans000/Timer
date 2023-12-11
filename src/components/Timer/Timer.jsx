import { useState, useEffect } from "react";
import "./Timer.css";
import reset from "../../assets/reset.png";
import start from "../../assets/start.png";
import pause from "../../assets/pause.png";

const Timer = () => {
  const [input, setInput] = useState("0");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let time;

    if (isActive) {
        time = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              if (hours === 0) {
                clearInterval(time);
                setIsActive(false);
                return;
              }
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }, 1000);
      }
    return () => clearInterval(time);
  }, [isActive,hours, minutes, seconds]);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      const parsedValue = parseInt(input, 10);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        const remainingSeconds = parsedValue * 60;
        setHours(Math.floor(remainingSeconds / 3600));
        setMinutes(Math.floor((remainingSeconds % 3600) / 60));
        setSeconds(remainingSeconds % 60);
        setIsActive(true);
      }
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setInput("0");
    setHours(0)
    setMinutes(0);
    setSeconds(0);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  return (
    <div className="timer">
      <div>
        <p className="label">Enter Minutes</p>
        <input
          type="text"
          placeholder="Enter minutes"
          value={input}
          className="input"
          onChange={handleInputChange}
          disabled={isActive}
        />
      </div>
      <div className="buttons">
        <button className="reset-i" onClick={handleReset}>
          <img src={reset}></img>
        </button>
        <button className="play" onClick={handleToggle}>
          {isActive ? <img src={pause} /> : <img src={start} />}
        </button>
      <div className="time">
        <span>{String(hours).padStart(2,"0")}:</span>
        <span>{String(minutes).padStart(2, "0")}:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
      </div>
    </div>
  );
};

export default Timer;
