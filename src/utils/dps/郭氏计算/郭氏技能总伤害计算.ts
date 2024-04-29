import { DpsGainBasicDTO, SkillBasicDTO, SKillGainData } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { CycleDTO } from '@/@types/cycle'
import { CharacterFinalDTO } from '@/@types/character'
import { TargetDTO } from '@/@types/character'
import { 增益类型枚举 } from '@/@types/enum'
import { getMianBanGongJI, getShenfaJiachengHuixin } from '@/components/BasicSet/CharacterSet/util'
import { 获取全能加成面板 } from '@/utils/help'
import { 属性系数 } from '@/数据/常量'
import {
  增益排序,
  根据增益修改最终循环,
  根据增益选项获取增益集合,
  获取全部增益,
  计算该技能下多个增益的增益集合,
  通用增益计算,
} from '../统一工具函数/增益计算函数'
import 完整技能伤害 from './技能伤害公式'
import { 技能伤害结果列表类型 } from '@/@types/dps'

interface GetDpsTotalParams {
  计算循环: CycleDTO[]
  角色最终属性: CharacterFinalDTO
  当前目标: TargetDTO
  技能基础数据: SkillBasicDTO[]
  增益启用: boolean
  增益数据: ZengyixuanxiangDataDTO
  默认增益集合?: SKillGainData[]
  战斗时间: number
}

// 计算技能循环总输出
export const 郭氏技能总伤害计算 = (props: GetDpsTotalParams) => {
  const { 计算循环, 角色最终属性, 当前目标, 技能基础数据, 增益启用, 增益数据, 战斗时间 } = props
  // 总dps
  let total = 0
  // 每个技能的dps总和列表
  const dpsList: 技能伤害结果列表类型[] = []
  const 计算目标 = 当前目标
  const 计算属性 = 获取全能加成面板(角色最终属性)

  // 获取装备增益等带来的最终增益集合
  let 总增益集合: SKillGainData[] = 获取全部增益(计算属性, [])

  // 根据增益信息修改最终循环内容
  const 最终循环: CycleDTO[] = 根据增益修改最终循环(计算属性, [...计算循环], 战斗时间)

  if (增益启用 && 增益数据) {
    const 团队增益增益集合 = 根据增益选项获取增益集合(增益数据)
    总增益集合 = 总增益集合.concat(团队增益增益集合)

    if (增益数据?.团队增益.find((item) => item.增益名称 === '飘黄' && !!item.启用)) {
      最终循环.push({
        技能名称: '逐云寒蕊',
        技能数量: Math.floor(战斗时间 * 0.13),
        技能增益列表: [],
      })
    }
  }

  // 遍历循环，获取每一个技能的总输出
  最终循环.forEach((item) => {
    // 获取循环内某个技能的总dps
    const { totalDps, 总会心数量 } = 计算循环内某技能总伤害(
      item,
      计算属性,
      计算目标,
      技能基础数据,
      总增益集合
    )
    dpsList.push({
      countName: item.统计用技能名称,
      name: item.技能名称,
      dps: totalDps,
      number: item.技能数量,
      会心几率: 总会心数量 / item.技能数量,
    })
    total = total + totalDps
  })

  return { totalDps: total, dpsList }
}

// 获取循环内某个技能的总dps
export const 计算循环内某技能总伤害 = (
  循环: CycleDTO,
  最终人物属性: CharacterFinalDTO,
  计算目标: TargetDTO,
  技能基础数据: SkillBasicDTO[],
  总增益集合: SKillGainData[]
) => {
  // 在技能数据模型中找到当前执行循环内技能的数据，获取各种系数
  const 当前技能属性 = 技能基础数据.find((item) => item.技能名称 === 循环?.技能名称)
  // 总输出
  let totalDps = 0
  let 总会心数量 = 0
  let 无增益技能数 = 循环?.技能数量
  let 技能增益集合 = [...总增益集合]
  if (当前技能属性) {
    // 计算技能常驻固定增益（秘籍、奇穴）等
    当前技能属性.技能增益列表.forEach((增益) => {
      if (增益.常驻增益) {
        if (增益.增益集合?.length) {
          技能增益集合 = 技能增益集合.concat(增益.增益集合)
        }
      }
    })

    // 判断增益技能的总伤
    if (循环?.技能增益列表?.length) {
      循环?.技能增益列表.forEach((增益) => {
        无增益技能数 = 无增益技能数 - 增益.增益技能数
        const 技能独立增益集合列表: SKillGainData[] = 计算该技能下多个增益的增益集合(
          增益,
          当前技能属性
        )
        if (增益.增益技能数) {
          const 用于计算的增益集合 = [...技能增益集合, ...技能独立增益集合列表]
          const { 期望技能总伤, 会心数量 } = 计算技能总伤(
            当前技能属性,
            最终人物属性,
            增益.增益技能数,
            计算目标,
            用于计算的增益集合
          )
          totalDps = totalDps + 期望技能总伤
          总会心数量 = 总会心数量 + 会心数量
        }
      })
    }

    if (无增益技能数) {
      // 判断常规未增益技能的总伤
      const { 期望技能总伤, 会心数量 } = 计算技能总伤(
        当前技能属性,
        最终人物属性,
        无增益技能数,
        计算目标,
        技能增益集合
      )

      totalDps = totalDps + 期望技能总伤
      总会心数量 = 总会心数量 + 会心数量
    }

    return { totalDps, 总会心数量 }
  }

  return { totalDps, 总会心数量 }
}

// 技能dps结果期望
export const 计算技能总伤 = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  技能总数: number,
  当前目标: TargetDTO,
  总增益集合: SKillGainData[]
) => {
  let 增益计算基础: DpsGainBasicDTO = {
    计算目标: 当前目标,
    最终人物属性: { ...人物属性 },
    技能增伤: {
      通用A类增伤: 1,
      技能独立增伤: 1,
      易伤增伤: 1,
      非侠增伤: 1,
      系数增伤: 1,
    },
    郭氏额外会效果值: 0,
    额外会心率: 0,
    郭式无视防御: 0,
    身法数值加成: 0,
    郭氏身法: 0,
    郭氏无双等级: 0,
    郭氏破防等级: 0,
    郭氏基础攻击: 0,
    郭氏武器伤害: 0,
  }
  // 对增益集合进行排序，先计算数值。后计算百分比
  const 当前技能计算增益集合: SKillGainData[] = 增益排序(总增益集合)

  // 第一轮计算，计算身法对面板的基础加成
  // 单独先计算身法增益的收益
  当前技能计算增益集合
    .filter((item) => [增益类型枚举.身法, 增益类型枚举.郭氏身法].includes(item.增益类型))
    .forEach((增益数值信息) => {
      const 计算后对象 = 通用增益计算(增益数值信息, 增益计算基础)
      增益计算基础 = {
        ...增益计算基础,
        ...计算后对象,
      }
    })

  // 郭氏身法在是否开启卢令下的提升百分比
  const 身法提升百分比 = 增益计算基础?.郭氏身法 / 1024
  // 郭式身法对人物属性身法的提升值
  const 郭式身法对属性身法的提升值 = Math.floor(增益计算基础?.最终人物属性.身法 * 身法提升百分比)
  // 郭式力道对增益提供的力道二次加成提升值
  const 郭式身法对增益内身份的提升值 = Math.floor(增益计算基础?.身法数值加成 * 身法提升百分比)
  // 身法数值的提升值
  const 增益内身法提升值 = 增益计算基础?.身法数值加成 + 郭式身法对增益内身份的提升值
  const 总身法提升值 = 郭式身法对属性身法的提升值 + 增益内身法提升值

  增益计算基础 = {
    ...增益计算基础,
    最终人物属性: {
      ...增益计算基础?.最终人物属性,
      身法: 增益计算基础?.最终人物属性.身法 + 总身法提升值,
      会心值: getShenfaJiachengHuixin(增益计算基础?.最终人物属性.会心值, 总身法提升值),
      面板攻击: getMianBanGongJI(增益计算基础?.最终人物属性.面板攻击, 总身法提升值),
    },
  }

  // 除去身法基础计算的剩余计算
  当前技能计算增益集合
    .filter((item) => ![增益类型枚举.身法, 增益类型枚举.郭氏身法].includes(item.增益类型))
    .forEach((增益数值信息) => {
      const 计算后对象 = 通用增益计算(增益数值信息, 增益计算基础)
      增益计算基础 = {
        ...增益计算基础,
        ...计算后对象,
      }
    })

  增益计算基础 = {
    ...增益计算基础,
    最终人物属性: {
      ...增益计算基础?.最终人物属性,
      无双值:
        增益计算基础?.最终人物属性.无双值 +
        Math.floor((属性系数.无双 * 增益计算基础?.郭氏无双等级) / 1024),
      破防值:
        增益计算基础?.最终人物属性.破防值 +
        Math.floor((增益计算基础?.最终人物属性.破防值 * 增益计算基础?.郭氏破防等级) / 1024),
      基础攻击:
        增益计算基础?.最终人物属性.基础攻击 +
        Math.floor((增益计算基础?.最终人物属性.基础攻击 * 增益计算基础?.郭氏基础攻击) / 1024),
      面板攻击:
        增益计算基础?.最终人物属性.面板攻击 +
        Math.floor((增益计算基础?.最终人物属性.基础攻击 * 增益计算基础?.郭氏基础攻击) / 1024),
      武器伤害_最小值:
        增益计算基础?.最终人物属性.武器伤害_最小值 +
        Math.floor(
          (增益计算基础?.最终人物属性.武器伤害_最小值 * 增益计算基础?.郭氏武器伤害) / 1024
        ),
      武器伤害_最大值:
        增益计算基础?.最终人物属性.武器伤害_最小值 +
        Math.floor(
          (增益计算基础?.最终人物属性.武器伤害_最大值 * 增益计算基础?.郭氏武器伤害) / 1024
        ),
    },
  }

  const { 期望技能总伤, 会心数量 } = 完整技能伤害({
    当前技能属性,
    技能总数,
    当前目标: 增益计算基础?.计算目标,
    最终人物属性: 增益计算基础?.最终人物属性,
    技能增伤: 增益计算基础?.技能增伤,
    郭氏额外会效果值: 增益计算基础?.郭氏额外会效果值,
    额外会心率: 增益计算基础?.额外会心率,
    郭式无视防御: 增益计算基础?.郭式无视防御,
  })

  return { 期望技能总伤, 会心数量 }
}

export default 郭氏技能总伤害计算
