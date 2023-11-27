// 循环模拟器type文件
/**
 * @name 循环模拟器type文件
 */
export interface CycleSimulatorSkillDTO {
  /**
   * @name 技能名称
   */
  技能名称: string
  /**
   * 充能层数
   */
  充能层数?: number
  // /**
  //  * @name 技能释放所需时间(帧)
  //  */
  // 技能释放所需时间: number
  /**
   * @name 技能释放后添加GCD(帧)
   */
  技能释放后添加GCD: number
  /**
   * 消耗箭数
   */
  消耗箭数: number
  /**
   * 初次伤害频率(帧) 0 为释放后立即造成伤害
   */
  初次伤害频率?: number
  /**
   * 伤害频率(帧)
   */
  伤害频率: number
  /**
   * 造成伤害次数
   */
  造成伤害次数: number
  /**
   * 是否为读条技能
   */
  是否为读条技能?: boolean
  /**
   * 技能CD(帧)
   */
  技能CD?: number
  /**
   * 是否上贯穿
   */
  是否上贯穿?: boolean
  /**
   * 是否引爆贯穿
   */
  是否引爆贯穿?: boolean
  /**
   * 召唤宠物数量
   */
  召唤宠物数量?: number
  /**
   * 创建循环不可选
   */
  创建循环不可选?: boolean
}

export interface CycleSimulatorLog {
  /**
   * 日志
   */
  日志: string
  /**
   * 战斗日志描述
   */
  战斗日志描述?: string
  // /**
  //  * 造成伤害
  //  */
  // 造成伤害?: number
  /**
   * 日志类型
   */
  日志类型: 日志类型
  /**
   * 日志时间
   */
  日志时间: number
}

export type 日志类型 =
  | '释放技能'
  | '添加自身buff'
  | '目标buff变动'
  | '造成伤害'
  | '技能释放结果'
  | '消耗箭'
  | '上贯穿'
  | '引爆贯穿'

export interface 贯穿日志 {
  /**
   * 事件行为
   */
  事件行为: '上一层贯穿' | '引爆贯穿'
  /**
   * 事件时间
   */
  事件时间: number
}
