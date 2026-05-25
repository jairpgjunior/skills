export type SceneId =
  | "hero"
  | "repo"
  | "pipeline"
  | "design"
  | "sticky"
  | "outro";

export type SceneConfig = {
  id: SceneId;
  durationSeconds: number;
};

/** Matches docs/codestory/1-script.md timing */
export const scenes: SceneConfig[] = [
  { id: "hero", durationSeconds: 14 },
  { id: "repo", durationSeconds: 18 },
  { id: "pipeline", durationSeconds: 18 },
  { id: "design", durationSeconds: 16 },
  { id: "sticky", durationSeconds: 16 },
  { id: "outro", durationSeconds: 10 },
];

export const totalDurationSeconds = scenes.reduce((a, s) => a + s.durationSeconds, 0);
