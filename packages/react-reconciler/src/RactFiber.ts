import { Key, Props, Ref } from "shared/ReactTypes";
import { WorkTag } from "./ReactWorkTags";
import { Flags, NoFlags } from "./ReactFiberFlags";
import { Container } from "hostConfig";

export class FiberNode {
  type: any;
  /** 实例 */
  tag: WorkTag;
  key: Key;
  /** <div> */
  stateNode: any;
  ref: Ref;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;
  pendingProps: Props;
  memoizedProps: Props | null;
  memoizedState: any;

  alternate: FiberNode | null;

  flags: Flags;
  subtreeFlags: Flags;
  deletions: any;
  updateQueue: unknown;
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // fiber的类型，根据ReactElement的type进行生成,共有25种tag
    this.tag = tag;
    // 唯一标识，和ReactElement组件的key一致
    this.key = key;
    // fiber对应原生节点
    this.stateNode = null;
    // fiber类型，来自于虚拟DOM的type - div、span...一般来讲和fiber.elementType一致.
    this.type = null;

    // 构成树状结构
    /** 指向父的fiberNode */
    this.return = null;
    /** 指向兄弟fiberNode */
    this.sibling = null;
    /** 指向字fiberNode */
    this.child = null;
    // fiber在兄弟节点中的索引，如果是单节点默认为0
    this.index = 0;
    // 指向在ReactElement组件上设置的ref
    this.ref = null;

    // 工作单元
    // 等待生效的属性，输入属性, 从ReactElement对象传入的 props，用于和fiber.memoizedProps比较可以得出属性是否变动.
    this.pendingProps = pendingProps;
    // 上一次生成子节点时用到的属性, 生成子节点之后保持在内存中. 向下生成子节点之前叫做pendingProps,
    // 生成子节点之后会把pendingProps赋值给memoizedProps用于下一次比较.pendingProps和memoizedProps比较可以得出属性是否变动.
    this.memoizedProps = null;
    // 每个fiber节点都有自己的状态，每种fiber 状态存的类型是不一样的
    // 类组件的fiber存的是类的实例状态，hostRoot存的是要渲染的元素
    // 上一次生成子节点之后保持在内存中的局部状态.
    this.memoizedState = null;

    // 双缓存的替身，指向内存中的另一个 fiber, 每个被更新过 fiber 节点在内存中都是成对出现(current 和 workInProgress)
    this.alternate = null;

    // 副作用
    // 标志位, 副作用标记，在ReactFiberFlags.js中定义了所有的标志位.18.2以前会收集effects，18.2以后删除了这个机制
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags; // 子节点的副作用标识，性能优化字段，比如如果这个字段是0，那么标识子节点没有副作用，就不需要处理子节点的副作用了
    this.deletions = null; // 存储将要被删除的子节点. 默认未开启
    // 存储update更新对象的队列, 每一次发起更新（比如三种触发更新的方法）, 都需要在该队列上创建一个update对象.
    this.updateQueue = null;
  }
}

export class FiberRootNode {
  container: Container;
  current: FiberNode;
  finishedWork: FiberNode | null;
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.current = hostRootFiber;
    hostRootFiber.stateNode = this;
    this.finishedWork = null;
  }
}

export const createWorkingInProgress = (
  current: FiberNode,
  pendingProps: Props,
): FiberNode => {
  let wip = current.alternate;
  if (wip === null) {
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.stateNode = current.stateNode;
    wip.alternate = current;
    current.alternate = wip;
  } else {
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
  }
  wip.type = current.type;
  wip.updateQueue = current.updateQueue;
  wip.child = current.child;
  wip.memoizedProps = current.memoizedProps;
  wip.memoizedState = current.memoizedState;
  return wip;
};
