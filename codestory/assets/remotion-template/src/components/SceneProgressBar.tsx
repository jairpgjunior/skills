import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Props = {
  durationInFrames: number;
  sceneIndex: number;
  totalScenes: number;
};

/** Full bar at scene start; drains to empty as the scene ends. */
export const SceneProgressBar: React.FC<Props> = ({
  durationInFrames,
  sceneIndex,
  totalScenes,
}) => {
  const frame = useCurrentFrame();
  const remaining = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "0 48px 28px",
        zIndex: 100,
        fontFamily: theme.fonts.mono,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          ...theme.typography.caption,
          color: theme.colors.mute,
        }}
      >
        <span>
          Scene {sceneIndex + 1}/{totalScenes}
        </span>
        <span>{Math.ceil((remaining * durationInFrames) / theme.fps)}s left</span>
      </div>
      <div
        style={{
          height: 4,
          borderRadius: 2,
          background: theme.colors.hairline,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${remaining * 100}%`,
            background: `linear-gradient(90deg, ${theme.colors.violet}, ${theme.colors.cyan})`,
            borderRadius: 2,
            transition: "width 0.05s linear",
          }}
        />
      </div>
    </div>
  );
};
