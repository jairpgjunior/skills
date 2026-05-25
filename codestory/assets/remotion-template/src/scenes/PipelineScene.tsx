import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const steps = ["gh PR", "DESIGN.md", "Script ✓", "Remotion", "PR header"];

export const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lineWidth = interpolate(frame, [15, 45], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <FadeIn>
        <h2 style={{ ...theme.typography.displayLg, color: theme.colors.ink }}>
          The pipeline you must trust.
        </h2>
        <p style={{ ...theme.typography.bodyMd, color: theme.colors.body, marginBottom: 48 }}>
          Read → script → approve → render → publish.
        </p>
      </FadeIn>
      <div
        style={{
          background: theme.colors.canvasSoft,
          borderRadius: theme.rounded.lg,
          boxShadow: theme.shadow.float,
          padding: theme.spacing.xl,
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing.md,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 22,
              left: "10%",
              right: "10%",
              height: 2,
              background: theme.colors.hairline,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 22,
              left: "10%",
              width: `${lineWidth * 0.8}%`,
              height: 2,
              background: theme.colors.link,
            }}
          />
          {steps.map((label, i) => {
            const highlight = i === 2;
            return (
              <FadeIn key={label} delay={i * 5}>
                <div style={{ textAlign: "center", flex: 1, zIndex: 1, minWidth: 100 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 9999,
                      background: highlight ? theme.colors.linkBgSoft : theme.colors.canvas,
                      border: `1px solid ${theme.colors.hairline}`,
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...theme.typography.bodySm,
                      fontWeight: 600,
                      color: theme.colors.ink,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      marginTop: theme.spacing.xs,
                      ...theme.typography.bodySm,
                      color: highlight ? theme.colors.link : theme.colors.body,
                      fontWeight: highlight ? 600 : 400,
                    }}
                  >
                    {label}
                  </p>
                  {highlight && (
                    <p style={{ ...theme.typography.caption, color: theme.colors.mute }}>YOU ARE HERE</p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </>
  );
};
