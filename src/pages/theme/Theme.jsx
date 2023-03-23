import React, { useContext, useEffect, useState } from "react";
import "./Theme.scss";
import { ThemeContext } from "./ThemeProvider";

export default function Theme() {
  const { mode, handleMode, handleColor } = useContext(ThemeContext);

  const themeMode = [
    {
      id: "dark",
      background: "var(--black-1)",
      border: "2px solid var(--white-1)",
      className: "dark",
    },
    {
      id: "light",
      background: "var(--white-1)",
      border: "2px solid var(--black-1)",
      className: "light",
    },
  ];

  const themeColor = [
    {
      id: "blue",
      background: "var(--blueDark)",

      className: "blue",
    },
    {
      id: "red",
      background: "var(--red-1)",
      className: "red",
    },
    {
      id: "yellow",
      background: "var(--yellowDark)",
      className: "yellow",
    },
    {
      id: "orange",
      background: "var(--orangeDark)",
      className: "orange",
    },
    {
      id: "green",
      background: "var(--greenDark)",
      className: "green",
    },
    {
      id: "purple",
      background: "var(--purpleDark)",
      className: "purple",
    },
    {
      id: "pink",
      background: "var(--pinkDark)",
      className: "pink",
    },
  ];

  return (
    <div className={`theme ${mode === "dark" ? "light" : "dark"}`}>
      <div className="theme--container">
        <div className="theme--container--mode">
          <span className="theme--container--mode--span">Theme Mode</span>
          <div className="theme--container--mode--item">
            {themeMode.map((item, index) => (
              <button
                onClick={() => handleMode(item.id)}
                key={index}
                style={{
                  backgroundColor: item.background,
                  border: item.border,
                }}
                className="theme--container--mode--item--button"
              ></button>
            ))}
          </div>
        </div>
        <div className="theme--container--color">
          <span className="theme--container--mode--span">Theme Color</span>
          <div className="theme--container--mode--item">
            {themeColor.map((item, index) => (
              <button
                onClick={() => handleColor(item.id)}
                key={index}
                style={{ backgroundColor: item.background }}
                className="theme--container--mode--item--button"
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
