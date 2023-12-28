export type WorkTag =
  | typeof FunctionComponent
  | typeof HostComponent
  | typeof HostRoot
  | typeof HostText;

/** 函数组件 */
export const FunctionComponent = 0;
/** 根节点 */
export const HostRoot = 3;

export const HostComponent = 5;
/** 相应的原生节点<div> <span> */
export const HostText = 6;
