import React, { createContext, useState } from "react";

export const ThemeContext = createContext({
  mode: "light",
  handleMode: (mode) => {},
  color: "blue",
  handleColor: (color) => {},
});

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const [color, setColor] = useState("blue");

  const handleMode = (mode) => {
    setMode(mode);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  return (
    <ThemeContext.Provider value={{ mode, handleMode, color, handleColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
