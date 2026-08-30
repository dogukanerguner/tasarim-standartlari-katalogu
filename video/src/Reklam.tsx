import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SC } from "./theme";
import { Lang } from "./strings";
import { SceneLogo, SceneHook, SceneCounter, SceneAnatomy, ScenePainters, SceneGallery, SceneMcp, SceneOutro } from "./scenes";

export const Reklam: React.FC<{ lang: Lang; portrait: boolean }> = ({ lang, portrait }) => {
  const scenes: Array<[keyof typeof SC, React.FC<{ lang: Lang; portrait: boolean }>]> = [
    ["logo", SceneLogo], ["hook", SceneHook], ["counter", SceneCounter], ["anatomy", SceneAnatomy],
    ["painters", ScenePainters], ["gallery", SceneGallery], ["mcp", SceneMcp], ["outro", SceneOutro],
  ];
  return (
    <AbsoluteFill style={{ background: "#14120e" }}>
      {scenes.map(([k, C]) => <Sequence key={k} from={SC[k][0]} durationInFrames={SC[k][1] - SC[k][0]}><C lang={lang} portrait={portrait} /></Sequence>)}
    </AbsoluteFill>
  );
};
