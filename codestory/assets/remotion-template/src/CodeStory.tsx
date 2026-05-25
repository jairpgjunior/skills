import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { scenes, type SceneId } from "./scenesData";
import { theme } from "./theme";
import { SceneShell } from "./components/SceneShell";
import { MeshGradient } from "./components/MeshGradient";
import { HeroScene } from "./scenes/HeroScene";
import { RepoScene } from "./scenes/RepoScene";
import { PipelineScene } from "./scenes/PipelineScene";
import { DesignScene } from "./scenes/DesignScene";
import { StickyScene } from "./scenes/StickyScene";
import { OutroScene } from "./scenes/OutroScene";

export type CodeStoryProps = {
  prNumber: number;
  title: string;
};

const SceneById: Record<SceneId, React.FC<{ prNumber: number }>> = {
  hero: HeroScene,
  repo: () => <RepoScene />,
  pipeline: () => <PipelineScene />,
  design: () => <DesignScene />,
  sticky: () => <StickyScene />,
  outro: () => <OutroScene />,
};

const sceneBackground: Partial<Record<SceneId, React.ReactNode>> = {
  hero: <MeshGradient />,
  outro: <MeshGradient opacity={0.35} />,
};

const contentMaxWidth: Partial<Record<SceneId, number>> = {
  repo: 1400,
  pipeline: 1300,
  sticky: 1400,
};

const sceneSurface: Partial<Record<SceneId, string>> = {
  repo: theme.colors.canvasSoft,
  pipeline: theme.colors.canvas,
  design: theme.colors.canvasSoft,
  sticky: theme.colors.canvasSoft2,
  outro: "transparent",
};

export const CodeStory: React.FC<CodeStoryProps> = ({ prNumber }) => {
  const { fps } = theme;
  let from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.canvasSoft }}>
      <Audio src={staticFile("codestory-bgm.mp3")} volume={0.35} loop />
      {scenes.map((scene, sceneIndex) => {
        const durationInFrames = scene.durationSeconds * fps;
        const Component = SceneById[scene.id];
        const sceneStart = from;

        const seq = (
          <React.Fragment key={scene.id}>
            {sceneIndex > 0 && (
              <Sequence from={sceneStart} durationInFrames={Math.min(30, durationInFrames)}>
                <Audio src={staticFile("scene-tick.mp3")} volume={0.28} />
              </Sequence>
            )}
            <Sequence from={from} durationInFrames={durationInFrames} name={scene.id}>
              <SceneShell
                durationInFrames={durationInFrames}
                sceneIndex={sceneIndex}
                totalScenes={scenes.length}
                background={sceneBackground[scene.id]}
                surfaceColor={sceneSurface[scene.id]}
                contentMaxWidth={contentMaxWidth[scene.id]}
              >
                <Component prNumber={prNumber} />
              </SceneShell>
            </Sequence>
          </React.Fragment>
        );
        from += durationInFrames;
        return seq;
      })}
    </AbsoluteFill>
  );
};
