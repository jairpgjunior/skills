import { Composition } from "remotion";
import { CodeStory, type CodeStoryProps } from "./CodeStory";
import { totalDurationSeconds } from "./scenesData";
import { theme } from "./theme";

const defaultProps: CodeStoryProps = {
  prNumber: 1,
  title: "Initial codestory skill",
};

export const RemotionRoot = () => (
  <Composition
    id="CodeStoryPR"
    component={CodeStory}
    durationInFrames={totalDurationSeconds * theme.fps}
    fps={theme.fps}
    width={1920}
    height={1080}
    defaultProps={defaultProps}
  />
);
