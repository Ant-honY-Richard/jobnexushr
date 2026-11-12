"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Site-wide motion settings. Animations always play, including when the OS "reduce motion" flag is on
 *  (owner's decision — see spec §8 R). Switch to reducedMotion="user" to honour the flag. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
