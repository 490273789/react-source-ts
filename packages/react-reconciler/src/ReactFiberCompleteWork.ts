import { FiberNode } from "./RactFiber";

export const completeWork = (fiber: FiberNode) => {
  console.log("completeWork", fiber);
};
