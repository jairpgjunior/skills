import React from "react";
import { BookOpen, Terminal, Film } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { MarketingCard } from "../components/MarketingCard";
import { theme } from "../theme";

const iconProps = { size: 40, strokeWidth: 2, color: theme.colors.ink };

export const RepoScene: React.FC = () => (
  <>
    <FadeIn>
      <h2 style={{ ...theme.typography.displayLg, color: theme.colors.ink, marginBottom: 8 }}>
        What landed in this repo.
      </h2>
      <p
        style={{
          ...theme.typography.bodyMd,
          color: theme.colors.body,
          marginBottom: theme.spacing.xl,
        }}
      >
        A playbook, not a feature flag — 20 files, +851 lines.
      </p>
    </FadeIn>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: theme.spacing.lg,
        width: "100%",
      }}
    >
      <FadeIn delay={6}>
        <MarketingCard
          title="SKILL.md"
          subtitle="Workflow + script approval gate before any render."
          icon={<BookOpen {...iconProps} />}
        />
      </FadeIn>
      <FadeIn delay={12}>
        <MarketingCard
          title="scripts/"
          subtitle="Five bash entry points: PR, design, init, render, PR body."
          icon={<Terminal {...iconProps} />}
        />
      </FadeIn>
      <FadeIn delay={18}>
        <MarketingCard
          title="remotion-template/"
          subtitle="Copy-in video engine under assets/."
          icon={<Film {...iconProps} />}
        />
      </FadeIn>
    </div>
    <FadeIn delay={24}>
      <p
        style={{
          marginTop: theme.spacing.xl,
          fontFamily: theme.fonts.mono,
          ...theme.typography.code,
          color: theme.colors.mute,
        }}
      >
        + references/ · evals/evals.json · README.md
      </p>
    </FadeIn>
  </>
);
