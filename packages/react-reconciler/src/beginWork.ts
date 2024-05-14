import { FiberNode } from "./fiber";

/** 递归中的递 */
export const beginWork = (fiber: FiberNode) => {
  console.log("beginWork", fiber);
  return fiber;
};
