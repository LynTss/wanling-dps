import { guoshiXishuBasic, guoshiResult, guoshiBasic } from './help'
/**
 * @name 技能伤害dps
 * @description 技能伤害计算遵循郭氏理论
 * @url https://www.jx3box.com/bps/12752
 */
import { CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { SkillBasicDTO } from '@/@types/skill'
import { 属性系数, 每等级减伤, 非侠系数 } from '@/data/constant'
import { guoshiFangyu, guoshiPofang } from './help'
import All_Cycle_Data from '@/data/skillCycle'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import XIAOCHI_DATA from '@/data/xiaochi'
import { GainTypeEnum } from '@/@types/enum'
import 奇穴数据 from '@/data/qixue'
import { QixueDataDTO } from '@/@types/qixue'

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
  } = skillConfig

  if (技能名称 === '破') {
    const poDps = getPoDps(破招值, 技能伤害系数)
    return {
      min: poDps,
      max: poDps,
    }
  }

  function getSkill(damage, weapon_damage) {
    return (
      Math.floor(面板攻击 * 技能伤害系数) +
      Math.floor(damage) +
      Math.floor(weapon_damage * 武器伤害系数)
    )
  }

  const min = getSkill(技能基础伤害_最小值, 武器伤害_最小值) * 伤害计算次数
  const max = getSkill(技能基础伤害_最大值, 武器伤害_最大值) * 伤害计算次数
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

// 获取加速、延迟计算后的时间
export const getDpsTime = (
  currentCycleName: string,
  characterFinalData: CharacterFinalDTO,
  network: number,
  zengyiQiyong: boolean,
  zengyixuanxiangData: ZengyixuanxiangDataDTO,
  cons = true
): number => {
  let time = 300
  // 根据是否选择CW选择对应循环
  const trueCurrentCycleName = getTrueCycleName(currentCycleName, characterFinalData)

  const currentCycleConfig = All_Cycle_Data.find((item) => item.name === trueCurrentCycleName)
  const 增益加速等级 = zengyiQiyong ? getZengyiJiasu(zengyixuanxiangData) : 0
  const 加速等级 = 获取加速等级(characterFinalData.加速值 + 增益加速等级)

  // 暂时去除加速对延迟的计算，加速等级不够1断直接加帧
  // if (currentCycleConfig) {
  //   let 总帧数 = 0
  //   currentCycleConfig.cycleList.forEach((item) => {
  //     const 循环帧 =
  //       (item.循环完整帧数 - item.计算技能数 * (加速等级 - network * 0.5)) * item.循环次数
  //     总帧数 = 总帧数 + 循环帧
  //   })
  //   time = 总帧数 / 16 + 18
  // }
  // return time

  if (currentCycleConfig) {
    let 总帧数 = 0
    currentCycleConfig.cycleList.forEach((item) => {
      const 循环帧 = (item.循环完整帧数 - item.计算技能数 * (1 - network * 0.5)) * item.循环次数
      总帧数 = 总帧数 + 循环帧
    })
    time = (总帧数 + (加速等级 < 1 ? 300 : 加速等级 === 2 ? -60 : 0)) / 16 + 18
  }
  if (cons) {
    console.log('战斗时间', time)
  }
  // console.log('战斗时间', time)
  return time
}

const 获取加速等级 = (number) => {
  return (number || 0) < 95
    ? 0
    : number < 4241
    ? 1
    : number < 8857
    ? 2
    : number < 13851
    ? 3
    : number < 19316
    ? 4
    : 5
}

export const getZengyiJiasu = (zengyixuanxiangData: ZengyixuanxiangDataDTO) => {
  let number = 0
  ;(zengyixuanxiangData.小吃 || []).forEach((item) => {
    const currentXiaochi = XIAOCHI_DATA.find((a) => a.小吃名称 === item)
    if (currentXiaochi && currentXiaochi.增益集合?.length) {
      currentXiaochi.增益集合.forEach((a) => {
        if (a.增益类型 === GainTypeEnum.加速) {
          number = number + a.增益数值
        }
      })
    }
  })
  return number
}

export const getTrueCycleName = (
  currentCycleName: string,
  characterFinalData: CharacterFinalDTO
) => {
  if (
    characterFinalData?.装备增益?.大橙武特效 &&
    currentCycleName?.includes('朝仪万汇_') &&
    !currentCycleName?.includes('_cw')
  ) {
    return `${currentCycleName}_cw`
  }

  return currentCycleName
}

export const getTrueCycleByName = (
  currentCycleName: string,
  currentCycle: any,
  characterFinalData: CharacterFinalDTO,
  qixueData: string[],
  skillBasicData: SkillBasicDTO[]
) => {
  let trueCycle = [...currentCycle]
  let newSkillBasicData = [...skillBasicData]

  // 大CW特效循环变动
  if (
    characterFinalData?.装备增益?.大橙武特效 &&
    currentCycleName?.includes('朝仪万汇_') &&
    !currentCycleName?.includes('_cw')
  ) {
    const trueName = `${currentCycleName}_cw`

    trueCycle = All_Cycle_Data?.find((item) => item.name === trueName)?.cycle || currentCycle
  }

  // 朱厌循环九乌奇穴变动
  if (
    currentCycleName?.includes('朱厌') &&
    !currentCycleName?.includes('_九乌') &&
    qixueData?.includes('九乌')
  ) {
    const trueName = `${currentCycleName}_九乌`

    trueCycle = All_Cycle_Data?.find((item) => item.name === trueName)?.cycle || currentCycle
  }

  // 根据奇穴类型处理各类循环
  const 全部奇穴信息: QixueDataDTO[] = getAllQixueData(qixueData)

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
            // console.log('a.增益名称', a.增益名称)
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

  // // 特殊处理贯侯
  // if (qixueData?.includes('贯侯')) {
  //   trueCycle = trueCycle.map((item) => {
  //     if (item.技能名称 === '标鹄' && !item.已计算贯侯) {
  //       return {
  //         ...item,
  //         技能数量: item.技能数量 + (item.技能数量 > 5 ? item.技能数量 - 5 : 0),
  //         已计算贯侯: true,
  //       }
  //     } else {
  //       return { ...item }
  //     }
  //   })
  // }

  // 特殊处理桑柘
  // if (qixueData?.includes('桑柘')) {
  //   let 减少低层贯穿数量 = 0 // 加到贯穿六上，桑柘的贯穿质量较高
  //   trueCycle = trueCycle.map((item) => {
  //     if (item.技能名称 === '贯穿·六' && !item.已计算桑柘) {
  //       return {
  //         ...item,
  //         技能数量: item.技能数量 + 26,
  //         已计算桑柘: true,
  //       }
  //     } else if (item.技能名称 === '贯穿·六·引爆' && !item.已计算桑柘) {
  //       return {
  //         ...item,
  //         技能数量: item.技能数量 + 14,
  //         已计算桑柘: true,
  //       }
  //     } else if (item.技能名称.includes('贯穿·') && !item.已计算桑柘) {
  //       const 新数量 = item.技能数量 - 4 >= 0 ? item.技能数量 - 4 : 0
  //       const 减少数量 = item.技能数量 - 新数量
  //       减少低层贯穿数量 = 减少低层贯穿数量 + 减少数量
  //       return {
  //         ...item,
  //         技能数量: 新数量,
  //         已计算桑柘: true,
  //       }
  //     } else {
  //       return { ...item }
  //     }
  //   })

  //   console.log('减少低层贯穿数量', 减少低层贯穿数量)
  //   trueCycle = trueCycle.map((item) => {
  //     if (item.技能名称 === '贯穿·六' && !item.已计算差异增加) {
  //       return {
  //         ...item,
  //         技能数量: item.技能数量 + 减少低层贯穿数量,
  //         已计算差异增加: true,
  //       }
  //     } else {
  //       return { ...item }
  //     }
  //   })

  //   console.log('trueCycle', trueCycle)
  // }

  return {
    trueCycle: trueCycle,
    trueSkillBasicData: newSkillBasicData,
  }
}

const getAllQixueData = (qixueData: string[]): QixueDataDTO[] => {
  const res: QixueDataDTO[] = []
  奇穴数据.forEach((item) => {
    const findData = item.奇穴列表?.find((a) => qixueData?.includes(a.奇穴名称))
    if (findData) {
      res.push(findData)
    }
  })
  return res
}
