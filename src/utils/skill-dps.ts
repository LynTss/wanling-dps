import { 郭氏基础系数算法, 郭氏结果算法, 郭氏值算法 } from './help'
/**
 * @name 技能伤害dps
 * @description 技能伤害计算遵循郭氏理论
 * @url https://www.jx3box.com/bps/12752
 */
import { CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { SkillBasicDTO } from '@/@types/skill'
import { 属性系数, 每等级减伤 } from '@/数据/常量'
import { 郭氏防御值算法 } from './help'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import XIAOCHI_DATA from '@/数据/小药小吃'
import { 增益类型枚举 } from '@/@types/enum'
import 奇穴数据 from '@/数据/奇穴'
import { QixueDataDTO } from '@/@types/qixue'
import { 根据装备格式化技能基础数据 } from '@/components/BasicSet/CharacterSet/ZhuangbeiSetModal/utils'
import { 根据秘籍格式化技能基础数据 } from '@/components/BasicSet/CommonSet/MijiSet/utils'

/**
 * @name 破招原始伤害计算
 */
export const 破招原始伤害计算 = (破招值, 技能伤害系数) => {
  return Math.floor(破招值 * 技能伤害系数)
}

/**
 * @name 技能基础伤害
 */
export const 技能基础伤害 = (
  当前技能属性: SkillBasicDTO,
  人物属性: CharacterFinalDTO,
  系数增伤 = 1
) => {
  const { 武器伤害_最小值 = 0, 武器伤害_最大值 = 0, 面板攻击, 破招值 } = 人物属性
  const {
    技能名称,
    武器伤害系数,
    技能基础伤害_最小值 = 0,
    技能基础伤害_最大值 = 0,
    伤害计算次数 = 1,
    技能伤害系数,
    技能破招系数,
  } = 当前技能属性

  if (技能名称 === '破') {
    const 破招伤害 = 破招原始伤害计算(破招值, 技能伤害系数)
    return 破招伤害
  }

  const 技能基础伤害平均值 = (技能基础伤害_最小值 + 技能基础伤害_最大值) / 2
  const 人物武器伤害平均值 = (武器伤害_最小值 + 武器伤害_最大值) / 2

  const 技能原始伤害 =
    Math.floor(技能基础伤害平均值) +
    Math.floor(面板攻击 * 技能伤害系数 * 系数增伤) +
    Math.floor(人物武器伤害平均值 * 武器伤害系数) +
    (技能破招系数 ? Math.floor(技能破招系数 * 破招值) : 0)

  return 技能原始伤害 * 伤害计算次数
}

/**
 * @name 破防伤害算法
 */
export const 破防伤害算法 = (
  伤害: number,
  人物属性: CharacterFinalDTO,
  当前目标: TargetDTO,
  郭式无视防御: number
) => {
  const { 破防值 } = 人物属性
  const { 防御点数, 防御系数 } = 当前目标
  const 计算后防御点数 =
    郭氏结果算法(防御点数, -郭式无视防御) > 0 ? 郭氏结果算法(防御点数, -郭式无视防御) : 0
  const 郭氏破防值 = 郭氏基础系数算法(破防值, 属性系数.破防)
  const 郭氏防御值 = 郭氏防御值算法(计算后防御点数, 防御系数)
  const y = 1024 + 郭氏破防值 - Math.floor(((1024 + 郭氏破防值) * 郭氏防御值) / 1024)

  return Math.floor((伤害 * y) / 1024)
}

// 等级减伤dps
export const 等级减伤计算公式 = (
  伤害: number,
  人物属性: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const 等级差 = Math.abs((人物属性?.等级 || 120) - 当前目标.等级)
  const 等级差距减伤 = 等级差 * 每等级减伤
  const 郭氏减伤值 = -郭氏值算法(等级差距减伤)
  return 郭氏结果算法(伤害, 郭氏减伤值)
}

// 无双计算后dps
export const 无双伤害计算公式 = (伤害: number, 人物属性: CharacterFinalDTO) => {
  const 郭氏无双值 = 郭氏基础系数算法(人物属性.无双值, 属性系数.无双)
  return 郭氏结果算法(伤害, 郭氏无双值)
}

export const 计算增益数据中加速值 = (增益数据: ZengyixuanxiangDataDTO) => {
  let number = 0
  ;(增益数据.小吃 || []).forEach((item) => {
    const currentXiaochi = XIAOCHI_DATA.find((a) => a.小吃名称 === item)
    if (currentXiaochi && currentXiaochi.增益集合?.length) {
      currentXiaochi.增益集合.forEach((a) => {
        if (a.增益类型 === 增益类型枚举.加速) {
          number = number + a.增益数值
        }
      })
    }
  })
  return number
}

export const 根据奇穴处理技能的基础增益信息 = (skillBasicData, 当前奇穴信息) => {
  let newSkillBasicData: SkillBasicDTO[] = [...(skillBasicData || [])]

  // 根据奇穴类型处理各类循环
  const 全部奇穴信息: QixueDataDTO[] = getAllQixueData(当前奇穴信息)

  newSkillBasicData = newSkillBasicData.map((item) => {
    let res = { ...item }

    const 所有加成该技能的奇穴 = 全部奇穴信息?.filter(
      (奇穴) =>
        奇穴?.奇穴加成对应关系?.[item.技能名称] ||
        奇穴?.奇穴加成技能?.includes(item?.技能名称) ||
        奇穴?.奇穴加成技能 === '通用'
    )

    所有加成该技能的奇穴.forEach((当前奇穴) => {
      if (当前奇穴?.奇穴加成对应关系?.[item.技能名称]) {
        res = {
          ...res,
          技能增益列表: res?.技能增益列表.map((增益) => {
            if (增益.增益名称 === 当前奇穴?.奇穴加成对应关系?.[item.技能名称]) {
              return {
                ...增益,
                常驻增益: 当前奇穴?.奇穴加成类型 === '常驻',
                增益启用开关: 当前奇穴?.奇穴加成类型 !== '无增益',
              }
            } else {
              return { ...增益 }
            }
          }),
        }
      } else if (
        当前奇穴?.奇穴加成技能?.includes(item?.技能名称) ||
        当前奇穴?.奇穴加成技能 === '通用'
      ) {
        res = {
          ...res,
          技能增益列表: res?.技能增益列表.map((增益) => {
            if (增益.增益名称 === 当前奇穴.奇穴名称) {
              return {
                ...增益,
                常驻增益: 当前奇穴?.奇穴加成类型 === '常驻',
                增益启用开关: 当前奇穴?.奇穴加成类型 !== '无增益',
              }
            } else {
              return { ...增益 }
            }
          }),
        }
      }
    })

    return res
  })

  return newSkillBasicData
}

const getAllQixueData = (当前奇穴信息: string[]): QixueDataDTO[] => {
  const res: QixueDataDTO[] = []
  ;(奇穴数据 || []).forEach((item) => {
    const findData = item.奇穴列表?.find((a) => 当前奇穴信息?.includes(a.奇穴名称))
    if (findData) {
      res.push(findData)
    }
  })
  return res
}

export const 根据秘籍奇穴装备格式化技能信息 = ({ 技能基础数据, 秘籍信息, 奇穴数据, 装备增益 }) => {
  const 秘籍格式化后技能基础数据 = 根据秘籍格式化技能基础数据(技能基础数据, 秘籍信息)
  const 装备格式化后技能基础数据 = 根据奇穴处理技能的基础增益信息(
    秘籍格式化后技能基础数据,
    奇穴数据
  )
  const 计算后技能基础数据 = 根据装备格式化技能基础数据(装备格式化后技能基础数据, 装备增益)

  return 计算后技能基础数据
}

// 调用该方法需要保证在调用方法前，面板的无双和破招属性没有受到全能的影响
export const 获取全能加成面板 = (当前角色面板: CharacterFinalDTO) => {
  return {
    ...当前角色面板,
    破招值: 全能值加成(当前角色面板.破招值, 当前角色面板.全能值),
    无双值: 全能值加成(当前角色面板.无双值, 当前角色面板.全能值),
  }
}

export const 全能值加成 = (原值, 全能值) => {
  return (原值 || 0) + (全能值 || 0)
}
