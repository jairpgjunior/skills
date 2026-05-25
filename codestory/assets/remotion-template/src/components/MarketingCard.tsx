import React from "react";
import { theme } from "../theme";

export const MarketingCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  dark?: boolean;
}> = ({ title, subtitle, icon, dark }) => (
  <div
    style={{
      background: dark ? theme.colors.primary : theme.colors.canvas,
      color: dark ? theme.colors.onPrimary : theme.colors.ink,
      borderRadius: theme.rounded.md,
      boxShadow: theme.shadow.card,
      padding: theme.spacing.lg,
      flex: 1,
      minWidth: 280,
      textAlign: "center",
    }}
  >
    <div style={{ marginBottom: theme.spacing.md, opacity: 0.9 }}>{icon}</div>
    <div style={{ ...theme.typography.displayMd, marginBottom: theme.spacing.xs }}>{title}</div>
    <div
      style={{
        ...(dark ? theme.typography.bodyMd : theme.typography.bodySm),
        color: dark ? "#e5e5e5" : theme.colors.body,
      }}
    >
      {subtitle}
    </div>
  </div>
);
