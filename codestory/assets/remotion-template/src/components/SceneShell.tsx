import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneProgressBar } from "./SceneProgressBar";
import { theme } from "../theme";

type Props = {
  durationInFrames: number;
  sceneIndex: number;
  totalScenes: number;
  background?: React.ReactNode;
  surfaceColor?: string;
  children: React.ReactNode;
  contentMaxWidth?: number;
};

/** Centers scene content; optional full-bleed background behind it. */
export const SceneShell: React.FC<Props> = ({
  durationInFrames,
  sceneIndex,
  totalScenes,
  background,
  surfaceColor,
  children,
  contentMaxWidth = 1200,
}) => (
  <AbsoluteFill style={{ fontFamily: theme.fonts.sans, background: surfaceColor ?? theme.colors.canvasSoft }}>
    {background}
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "64px 80px 88px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: contentMaxWidth,
          flex: 1,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
    <SceneProgressBar
      durationInFrames={durationInFrames}
      sceneIndex={sceneIndex}
      totalScenes={totalScenes}
    />
  </AbsoluteFill>
);
