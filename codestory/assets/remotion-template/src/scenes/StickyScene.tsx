import React from "react";
import { Users, Layers, ShieldCheck } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const notes = [
  { text: "Gate: script → approve → video", icon: ShieldCheck, rotate: -2 },
  { text: "Outputs: docs/codestory/", icon: Layers, rotate: 0 },
  { text: "Focus: architecture + collaboration", icon: Users, rotate: 2 },
];

export const StickyScene: React.FC = () => (
  <>
    <FadeIn>
      <h2 style={{ ...theme.typography.displayLg, color: theme.colors.ink }}>
        Stick these in memory.
      </h2>
    </FadeIn>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        width: "100%",
      }}
    >
      {notes.map((n, i) => {
        const Icon = n.icon;
        return (
          <FadeIn key={n.text} delay={8 + i * 8}>
            <div
              style={{
                background: "#fff9c4",
                color: theme.colors.ink,
                padding: theme.spacing.lg,
                borderRadius: 4,
                boxShadow: "0 4px 12px #00000015",
                transform: `rotate(${n.rotate}deg)`,
                width: 300,
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Icon size={28} strokeWidth={2} style={{ marginBottom: theme.spacing.md }} />
              <p style={{ ...theme.typography.bodyMd, fontWeight: 500, margin: 0 }}>{n.text}</p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  </>
);
