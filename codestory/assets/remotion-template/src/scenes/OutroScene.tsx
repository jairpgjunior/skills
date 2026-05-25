import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Play } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 90], [1, 0.96], { extrapolateRight: "clamp" });

  return (
    <div style={{ transform: `scale(${scale})`, width: "100%" }}>
      <FadeIn>
        <div
          style={{
            background: theme.colors.canvas,
            borderRadius: theme.rounded.lg,
            boxShadow: theme.shadow.float,
            padding: theme.spacing.xl,
            maxWidth: 640,
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: theme.fonts.mono,
              ...theme.typography.code,
              color: theme.colors.mute,
              marginBottom: theme.spacing.md,
            }}
          >
            ## CodeStory
          </p>
          <h2 style={{ ...theme.typography.displayMd, margin: 0 }}>PR recap — watch before merge</h2>
          <div
            style={{
              marginTop: theme.spacing.lg,
              height: 120,
              background: theme.colors.canvasSoft2,
              borderRadius: theme.rounded.md,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${theme.colors.hairline}`,
            }}
          >
            <Play size={48} strokeWidth={2} color={theme.colors.ink} />
          </div>
          <div
            style={{
              marginTop: theme.spacing.lg,
              display: "inline-flex",
              background: theme.colors.primary,
              color: theme.colors.onPrimary,
              borderRadius: theme.rounded.pill,
              padding: "10px 20px",
              ...theme.typography.bodySm,
              fontWeight: 500,
            }}
          >
            Watch recap
          </div>
        </div>
        <p
          style={{
            marginTop: theme.spacing.xl,
            ...theme.typography.bodyLg,
            color: theme.colors.body,
          }}
        >
          The story lives where the code lives.
        </p>
      </FadeIn>
    </div>
  );
};
