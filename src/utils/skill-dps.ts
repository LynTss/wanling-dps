import { guoshiXishuBasic, guoshiResult, guoshiBasic } from './help'
/**
 * @name 技能伤害dps
 * @description 技能伤害计算遵循郭氏理论
 * @url https://www.jx3box.com/bps/12752
 */
import { CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { SkillBasicDTO } from '@/@types/skill'
import { 属性系数, 每等级减伤, 非侠系数 } from '@/数据/常量'
import { guoshiFangyu, guoshiPofang } from './help'
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
export const getPoDps = (破招值, 技能伤害系数) => {
  return Math.floor(破招值 * 技能伤害系数)
}

/**
 * @name 原始伤害计算
 * @params (INT(基础伤害)+INT(攻击力*攻击系数)+INT(武器伤害*武伤系数))*伤害计算次数
 */
export const skillBasicDps = (skillConfig: SkillBasicDTO, characterConfig: CharacterFinalDTO) => {
  const { 武器伤害_最小值 = 0, 武器伤害_最大值 = 0, 面板攻击, 破招值 } = characterConfig
  const {
    技能名称,
    武器伤害系数,
    技能基础伤害_最小值 = 0,
    技能基础伤害_最大值 = 0,
    伤害计算次数 = 1,
    技能伤害系数,
    技能破招系数,
  } = skillConfig

  if (技能名称 === '破') {
    const poDps = getPoDps(破招值, 技能伤害系数)
    return {
      min: poDps,
      max: poDps,
    }
  }

  function getSkill(damage, weapon_damage, 技能破招系数) {
    return (
      Math.floor(面板攻击 * 技能伤害系数) +
      Math.floor(damage) +
      Math.floor(weapon_damage * 武器伤害系数) +
      (技能破招系数 ? Math.floor(技能破招系数 * 破招值) : 0)
    )
  }

  const min = getSkill(技能基础伤害_最小值, 武器伤害_最小值, 技能破招系数) * 伤害计算次数
  const max = getSkill(技能基础伤害_最大值, 武器伤害_最大值, 技能破招系数) * 伤害计算次数
  return {
    min,
    max,
  }
}

/**
 * @name 技能基准伤害
 * @params 基准伤害，参与最终无双、技能增伤等计算
 */
export const skillStandardDps = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const { 破防值 } = characterConfig
  const { 防御点数, 防御系数 } = 当前目标
  const guoshiPofangzhi = guoshiPofang(破防值)
  const guoshiFangyuzhi = guoshiFangyu(防御点数, 防御系数)
  const y = 1024 + guoshiPofangzhi - Math.floor(((1024 + guoshiPofangzhi) * guoshiFangyuzhi) / 1024)

  return Math.floor((damage * y) / 1024)
}

/**
 * @name 技能最终伤害计算
 * @params 基准伤害，参与最终无双、技能增伤等计算
 */
export const skillFinalDpsFunction = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  // 计算目标等级减伤
  const r_dengjijianshang = skillDengjijianshangDps(damage, characterConfig, 当前目标)
  // 无双增伤
  const r_wushuang = skillWushuangDps(r_dengjijianshang, characterConfig)
  // 非侠增伤
  const r_feixia = r_wushuang * 非侠系数

  return Math.floor(r_feixia)
}

/**
 * @name 技能最终伤害调用函数
 * @param characterConfig
 * @returns
 */
export const skillFinalDps = (
  skillConfig: SkillBasicDTO,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const { min, max } = skillBasicDps(skillConfig, characterConfig)
  const standard_min = skillStandardDps(min, characterConfig, 当前目标)
  const standard_max = skillStandardDps(max, characterConfig, 当前目标)
  return {
    min: skillFinalDpsFunction(standard_min, characterConfig, 当前目标),
    max: skillFinalDpsFunction(standard_max, characterConfig, 当前目标),
  }
}

// 等级减伤dps
export const skillDengjijianshangDps = (
  damage: number,
  characterConfig: CharacterFinalDTO,
  当前目标: TargetDTO
) => {
  const levelDiff = Math.abs((characterConfig?.等级 || 120) - 当前目标.等级)
  const levelReduce = levelDiff * 每等级减伤
  const levelReducePoint = -guoshiBasic(levelReduce)
  return guoshiResult(damage, levelReducePoint)
}

// 无双计算后dps
export const skillWushuangDps = (damage: number, characterConfig: CharacterFinalDTO) => {
  const guoshiWuShuang = guoshiXishuBasic(characterConfig.无双值, 属性系数.无双)
  return guoshiResult(damage, guoshiWuShuang)
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
