# reconciler

## 过程驱动

> JQuery -> 调用 -> 宿主环境API -> 显示 -> 真是UI

## 状态驱动

> 描述UI（JSX/模版语法）-> 编译优化 -> 运行时的核心模块（reconciler/render） -> 调用 -> 宿主环境API -> 显示 -> 真是UI

## fiber

- 虚拟DOM在react中的实现

## react中的节点类型

> jsx -> ReactElement -> FiberNode -> DOMElement

- JSX - 开发者编写
- ReactElement - 由babel转义成createElement方法执行生成
- Fiber
- DOM Element

## reconciler工作原理

> ReactElement <-> fiber -> 做标记

对于一个节点比较ReactElement与fiber，生成子fiber。并根据比较的结果生成不同的标记（插入、删除、移动。。。），对应不同的宿主环境API的执行。

当所有ReactElement比较完后，会生成一颗fiber树，一共会有两棵fiber树（双缓存）：

- current： 与视图中真实UI对应的fiber树
- workInProgress：出发更新后，正在reconciler中计算的fiber树

## JSX消费顺序

以DFS深度优先遍历的顺序遍历ReactElement：

- 如果有子节点，遍历子节点
- 如果没有子节点，遍历兄弟节点

这个过程中存在递和归的两个阶段：

- 递：beginWork
- 归：completeWork

## 更新

常见出发更新的方式：

- ReactDOM.createRoot().render
- this.setState
- useState的dispatch方法

我们希望实现一套统一的更新机制，他的特点是：

- 兼容上述的出发更新方式
- 方便后续扩展（优先级机制）
