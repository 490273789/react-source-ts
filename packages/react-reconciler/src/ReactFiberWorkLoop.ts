import { beginWork } from "./ReactFiberBeginWork";
import { completeWork } from "./ReactFiberCompleteWork";
import { FiberNode, FiberRootNode, createWorkingInProgress } from "./RactFiber";
import { HostRoot } from "./ReactWorkTags";

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
  workInProgress = createWorkingInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
  const root = markUpdateFromFiberToRoot(fiber);
  renderRootSync(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
  let node = fiber;
  let parent = node.return;
  while (parent != null) {
    node = parent;
    parent = node.return;
  }
  if (node.tag === HostRoot) {
    return node.stateNode;
  }
  return null;
}

function renderRootSync(root: FiberRootNode) {
  // 初始化
  prepareFreshStack(root);
  do {
    try {
      workLoopSync();
      break;
    } catch {
      console.warn("workLoopSync 发生错误");
      workInProgress = null;
    }
  } while (true);
}

function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber); // next 为子fiber
  fiber.memoizedProps = fiber.pendingProps;
  // 没有子 fiber，遍历兄弟节点
  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    // 有子fiber继续遍历子节点
    workInProgress = next;
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;

  do {
    completeWork(node);
    const sibling = node.sibling;
    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }
    node = node.return;
    workInProgress = node;
    // completeUnitOfWork(node);
  } while (node !== null);
}
