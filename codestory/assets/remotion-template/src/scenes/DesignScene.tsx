import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Palette } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const swatches = [
  { label: "Ink", color: theme.colors.ink },
  { label: "Cyan", color: theme.colors.cyan },
  { label: "Violet", color: theme.colors.violet },
  { label: "Pink", color: theme.colors.highlightPink },
];

export const DesignScene: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <FadeIn>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing.md,
            marginBottom: theme.spacing.lg,
          }}
        >
          <Palette size={36} strokeWidth={2} />
          <h2 style={{ ...theme.typography.displayLg, color: theme.colors.ink, margin: 0 }}>
            DESIGN.md drives every frame.
          </h2>
        </div>
      </FadeIn>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        {swatches.map((s, i) => (
          <FadeIn key={s.label} delay={i * 4}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: theme.rounded.md,
                  background: s.color,
                  boxShadow: theme.shadow.card,
                  margin: "0 auto",
                }}
              />
              <p style={{ ...theme.typography.caption, marginTop: 8 }}>{s.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: theme.spacing.lg,
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            flex: 1,
            opacity: 1 - flip * 0.3,
            background: theme.colors.canvas,
            borderRadius: theme.rounded.md,
            boxShadow: theme.shadow.card,
            padding: theme.spacing.xl,
            textAlign: "center",
          }}
        >
          <p style={{ ...theme.typography.displayMd }}>card-marketing</p>
          <p style={{ ...theme.typography.bodyMd, color: theme.colors.body }}>
            Light surface · Inter display · 8px radius
          </p>
        </div>
        <div
          style={{
            flex: 1,
            opacity: 0.7 + flip * 0.3,
            background: theme.colors.primary,
            color: theme.colors.onPrimary,
            borderRadius: theme.rounded.lg,
            boxShadow: theme.shadow.float,
            padding: theme.spacing.xl,
            textAlign: "center",
          }}
        >
          <p style={{ ...theme.typography.displayMd }}>pricing-card-featured</p>
          <p style={{ ...theme.typography.bodyMd, opacity: 0.85 }}>Polarity flip · white on ink</p>
        </div>
      </div>
      <FadeIn delay={20}>
        <p style={{ marginTop: theme.spacing.lg, ...theme.typography.caption, color: theme.colors.mute }}>
          Inter display · Lucide icons · 4px spacing grid
        </p>
      </FadeIn>
    </>
  );
};
