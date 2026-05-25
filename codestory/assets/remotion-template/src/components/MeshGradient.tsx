import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const MeshGradient: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame % 90, [0, 90], [0, 8], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: "absolute",
          inset: -drift,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, ${theme.colors.gradientDevelop[0]}88, transparent 55%),
            radial-gradient(ellipse 70% 50% at 75% 25%, ${theme.colors.gradientPreview[0]}99, transparent 50%),
            radial-gradient(ellipse 60% 55% at 50% 80%, ${theme.colors.gradientShip[0]}77, transparent 55%),
            radial-gradient(ellipse 90% 70% at 60% 40%, ${theme.colors.gradientPreview[1]}55, transparent 60%),
            ${theme.colors.canvasSoft}
          `,
        }}
      />
    </AbsoluteFill>
  );
};
