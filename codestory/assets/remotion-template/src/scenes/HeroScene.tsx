import React from "react";
import { BookOpen } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

export const HeroScene: React.FC<{ prNumber: number }> = ({ prNumber }) => (
  <FadeIn>
    <p
      style={{
        ...theme.typography.caption,
        fontFamily: theme.fonts.mono,
        color: theme.colors.body,
        marginBottom: theme.spacing.md,
      }}
    >
      PR #{prNumber} · codestory
    </p>
    <h1
      style={{
        ...theme.typography.displayXl,
        color: theme.colors.ink,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      Stories for code that moves faster than you.
    </h1>
    <p
      style={{
        ...theme.typography.bodyLg,
        color: theme.colors.body,
        maxWidth: 720,
        marginTop: theme.spacing.lg,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Pull requests at machine speed. One brain per teammate.
    </p>
    <div
      style={{
        marginTop: theme.spacing.xl,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.xs,
        background: theme.colors.primary,
        color: theme.colors.onPrimary,
        borderRadius: theme.rounded.pill,
        padding: "12px 24px",
        ...theme.typography.bodyMd,
        fontWeight: 500,
      }}
    >
      <BookOpen size={18} strokeWidth={2} />
      CodeStory
    </div>
  </FadeIn>
);
