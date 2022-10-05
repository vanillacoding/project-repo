import React, { useEffect, useState } from "react";
import "./Loading.css";

function Loading() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev === 3 ? 0 : prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const message = "Loading" + ".".repeat(count);

  return (
    <div className="loading">
      <h1>SET GEMS</h1>
      <p className="message">{message}</p>
    </div>
  );
}

export default Loading;
