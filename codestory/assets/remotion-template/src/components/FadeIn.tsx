import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [delay, delay + theme.enterFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const y = interpolate(
    frame,
    [delay, delay + theme.enterFrames],
    [16, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};
