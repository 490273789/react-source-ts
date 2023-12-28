export type Flags = number;

export const NoFlags = 0b0000001; /** 无标记 */
export const Placement = 0b0000010; /**  */
export const Update = 0b00001000; /** 更新节点 */
export const ChildDeletion = 0b0001000; /** 删除节点 */
