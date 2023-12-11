// 循环模拟器type文件
/**
 * @name 循环基础技能
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
  伤害频率?: number
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
   * 是否上破招
   */
  是否上破招?: boolean
  /**
   * 是否引爆贯穿
   */
  是否引爆贯穿?: boolean
  /**
   * 召唤宠物
   */
  召唤宠物?: boolean
  /**
   * 创建循环不可选
   */
  创建循环不可选?: boolean
  /**
   * 实际技能 - 用于显示不同名字时判断为相同技能
   */
  实际技能?: string
}

// 用来显示的循环技能类型类型
export interface ShowCycleSingleSkill extends CycleSimulatorSkillDTO {
  /**
   * 本技能计划释放时间
   */
  本技能计划释放时间?: number
  /**
   * 本技能实际释放时间
   */
  本技能实际释放时间?: number
  /**
   * 下一个技能可以释放时间
   */
  下一个技能可以释放时间?: number
  /**
   * index
   */
  index?: number // 总技能序列索引
}

// 用来显示的循环类型
export interface ShowCycle {
  /**
   * 循环具体技能
   */
  循环: ShowCycleSingleSkill[]
  /**
   * 本轮箭总用时
   */
  本轮箭总用时: number
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
  /**
   * 造成伤害
   */
  造成伤害?: number
  /**
   * 造成总伤害
   */
  造成总伤害?: number
  /**
   * 秒伤
   */
  秒伤?: number
  /**
   * 日志类型
   */
  日志类型: 日志类型
  /**
   * 日志时间
   */
  日志时间: number
  /**
   * buff携带
   */
  buff列表?: string[]
  /**
   * buff携带
   */
}

export type 日志类型 =
  | '释放技能'
  | '自身buff变动'
  | '目标buff变动'
  | '造成伤害'
  | '技能释放结果'
  | '消耗箭'
  | '上贯穿'
  | '棘矢引爆贯穿'
  | '于狩引爆贯穿'
  | '宠物进入场地'
  | '宠物离开场地'
  | '等CD'

export interface 贯穿日志 {
  /**
   * 事件行为
   */
  事件行为: '上一层贯穿' | '棘矢引爆贯穿' | '于狩引爆贯穿'
  /**
   * 事件时间
   */
  事件时间: number
}

export interface 宠物数据模型 {
  /**
   * 释放后进入场景时间（帧
   */
  释放后进入场景时间: number
  /**
   * 释放后攻击时间（帧
   */
  释放后攻击时间: number
  /**
   * 释放后退场时间（帧
   */
  释放后退场时间: number
  /**
   * 宠物攻击次数 默认为1
   */
  宠物攻击次数?: number
  /**
   * 宠物攻击频率（帧）不准确
   */
  宠物攻击频率?: number
}

export interface 全部唤灵印数据模型 {
  [key: string]: 唤灵印持续时间范围[][]
}

// 永久则传入 99999999999
export type 唤灵印持续时间范围 = number
