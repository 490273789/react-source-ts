export type WorkTag =
  | typeof FunctionComponent
  | typeof HostComponent
  | typeof HostRoot
  | typeof HostText;

/** 函数组件 */
export const FunctionComponent = 0;
/** 根节点 id = root */
export const HostRoot = 3;
/** 相应的原生节点<div> <span> */
export const HostComponent = 5;
/** 相应的原生节点下面的文本 */
export const HostText = 6;
