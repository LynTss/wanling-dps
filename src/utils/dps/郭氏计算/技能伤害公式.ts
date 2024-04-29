/**
 * @name 技能伤害计算基础公式-郭氏
 */

import { 郭氏会心伤害算法, 郭氏会心率算法 } from '@/utils/help'
import { 技能基础伤害, 无双伤害计算公式, 破防伤害算法, 等级减伤计算公式 } from './伤害计算基础函数'
import { 完整技能伤害入参类型 } from '../interface'

/**
 * @name 完整技能伤害公式
 * @description 计算顺序 伤害增加，破防，会效，等级减伤，无双，非侠，易伤
 * 在郭氏计算中，每一步都进行INT取整
 * 分别计算非会心伤害和计算会效的会心期望伤害，最后计算平均伤害
 */

export const 完整技能伤害 = (params: 完整技能伤害入参类型) => {
  const {
    当前技能属性,
    最终人物属性,
    当前目标,
    技能总数 = 1,
    额外会心率 = 0,
    郭式无视防御 = 0,
    技能增伤 = {
      通用A类增伤: 1,
      技能独立增伤: 1,
      易伤增伤: 1,
      非侠增伤: 1,
      系数增伤: 1,
    },
  } = params

  // 基础伤害
  const 基础伤害 = 技能基础伤害(当前技能属性, 最终人物属性, 技能增伤?.系数增伤)
  // 计算伤害增加
  const 伤害增加 = Math.floor(基础伤害 * 技能增伤?.通用A类增伤 * 技能增伤?.技能独立增伤)
  // 计算破防
  const 破防伤害 = 破防伤害算法(伤害增加, 最终人物属性, 当前目标, 郭式无视防御)

  const 会心期望率 = 郭氏会心率算法(最终人物属性.会心值) + 额外会心率
  const 会心数量 = 会心期望率 * 技能总数
  /**
   * 计算会心伤害
   * 这里分开计算，用非会心和会心伤害计算最终伤害。最后计算平均值
   */
  const 会心实际伤害 = 会效后计算公式(破防伤害, '会心', params)
  const 非会心伤害 = 会效后计算公式(破防伤害, '非会心', params)

  const 期望伤害 = 非会心伤害 + 会心期望率 * (会心实际伤害 - 非会心伤害) || 1
  const 期望技能总伤 = Math.floor(期望伤害 * 技能总数)

  return { 期望技能总伤, 会心数量 }
}

const 会效后计算公式 = (伤害, 计算类型: '会心' | '非会心', params: 完整技能伤害入参类型) => {
  const {
    最终人物属性,
    当前目标,
    郭氏额外会效果值 = 0,
    郭氏额外无双等级 = 0,
    技能增伤 = { 非侠增伤: 1, 易伤增伤: 1 },
  } = params
  let 计算基础伤害 = 伤害
  if (计算类型 === '会心') {
    计算基础伤害 = 郭氏会心伤害算法(伤害, 最终人物属性?.会心效果值, 郭氏额外会效果值)
  }
  // 计算目标等级减伤
  const 等级减伤伤害 = 等级减伤计算公式(计算基础伤害, 最终人物属性, 当前目标)
  // 无双增伤
  const 无双增伤伤害 = 无双伤害计算公式(等级减伤伤害, 最终人物属性, 郭氏额外无双等级)
  // 非侠士增伤
  const 非侠士增伤伤害 = Math.floor(无双增伤伤害 * 技能增伤.非侠增伤)
  // 易伤增伤
  const 易伤增伤伤害 = Math.floor(非侠士增伤伤害 * 技能增伤.易伤增伤)
  return 易伤增伤伤害
}

export default 完整技能伤害
