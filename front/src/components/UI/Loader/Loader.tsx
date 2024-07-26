import React, { useState, useEffect } from "react";
import "./Loader.css";
// import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";

export const Loader = () => {
  const [visible, setVisible] = useState(true);

  // Анимация исчезновения после 3 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000); // Увеличил время анимации исчезновения до 3 секунд

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <div className="loading__container">
          <div className="loading__content">
            <div className="loading__spinner"></div>
            <span className="loading__message">Интизор бошед...</span>
          </div>
        </div>
      )}
    </>
  );
};
