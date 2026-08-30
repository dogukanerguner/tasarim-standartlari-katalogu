import React from "react";
import { Composition } from "remotion";
import { Reklam } from "./Reklam";
import { TOTAL } from "./theme";

export const Root: React.FC = () => (
  <>
    <Composition id="Reklam-TR-9x16" component={Reklam} durationInFrames={TOTAL} fps={30} width={1080} height={1920} defaultProps={{ lang: "tr" as const, portrait: true }} />
    <Composition id="Reklam-EN-9x16" component={Reklam} durationInFrames={TOTAL} fps={30} width={1080} height={1920} defaultProps={{ lang: "en" as const, portrait: true }} />
    <Composition id="Reklam-TR-16x9" component={Reklam} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{ lang: "tr" as const, portrait: false }} />
    <Composition id="Reklam-EN-16x9" component={Reklam} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{ lang: "en" as const, portrait: false }} />
  </>
);
