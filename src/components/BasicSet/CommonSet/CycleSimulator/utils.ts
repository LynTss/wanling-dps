import { CycleDTO, CycleGain } from '@/@types/cycle'
import {
  CycleSimulatorLog,
  CycleSimulatorSkillDTO,
  ShowCycleSingleSkill,
} from '@/@types/cycleSimulator'
import { Skill_Cycle_Map } from '@/utils/skill-dps'
import { 获取实际帧数 } from './simulator'
import { 获取加速等级 } from '@/utils/help'

export const getDpsCycle = (data: CycleSimulatorLog[]): CycleDTO[] => {
  const res: { [key: string]: CycleDTO } = {}
  for (let i = 0; i < data.length; i++) {
    const 当前数据 = data[i]
    if (当前数据?.日志类型 === '造成伤害') {
      const 获取当前日志对应技能枚举 = 当前数据?.日志?.includes('朝仪万汇 - ')
        ? '朝仪万汇'
        : Skill_Cycle_Map[当前数据?.日志] || 当前数据?.日志
      let 增益列表 = res[获取当前日志对应技能枚举]?.技能增益列表 || []
      if (!增益列表?.length) {
        if (当前数据?.buff列表) {
          增益列表 = 增益列表.concat({
            增益名称: 当前数据?.buff列表?.join(','),
            增益技能数: 1,
          })
        }
      } else {
        if (当前数据?.buff列表?.length) {
          let 不存在相同增益 = true
          增益列表 = 增益列表.map((item) => {
            const 技能增益列表 = item?.增益名称?.split(',') || []
            if (
              技能增益列表?.length === 当前数据?.buff列表?.length &&
              !技能增益列表?.some((a) => !当前数据?.buff列表?.includes(a))
            ) {
              不存在相同增益 = false
              return {
                增益名称: item.增益名称,
                增益技能数: item.增益技能数 + 1,
              }
            } else {
              return {
                ...item,
              }
            }
          })
          if (不存在相同增益) {
            增益列表 = 增益列表.concat({
              增益名称: 当前数据?.buff列表?.join(','),
              增益技能数: 1,
            })
          }
        }
      }

      res[获取当前日志对应技能枚举] = {
        ...res[获取当前日志对应技能枚举],
        技能名称: 获取当前日志对应技能枚举,
        技能数量: (res[获取当前日志对应技能枚举]?.技能数量 || 0) + 1,
        技能增益列表: [...增益列表],
      }
    }
  }

  const 结果循环 = Object.keys(res).map((item) => {
    return res[item]
  })

  return 结果循环
}

export const getSingleSkillDpsCycle = (当前数据: CycleSimulatorLog): CycleDTO => {
  const 获取当前日志对应技能枚举 = 当前数据?.日志?.includes('朝仪万汇 - ')
    ? '朝仪万汇'
    : Skill_Cycle_Map[当前数据?.日志] || 当前数据?.日志
  let 增益列表: CycleGain[] = []
  if (!增益列表?.length) {
    if (当前数据?.buff列表) {
      增益列表 = 增益列表.concat({
        增益名称: 当前数据?.buff列表?.join(','),
        增益技能数: 1,
      })
    }
  } else {
    if (当前数据?.buff列表?.length) {
      let 不存在相同增益 = true
      增益列表 = 增益列表.map((item) => {
        const 技能增益列表 = item?.增益名称?.split(',') || []
        if (
          技能增益列表?.length === 当前数据?.buff列表?.length &&
          !技能增益列表?.some((a) => !当前数据?.buff列表?.includes(a))
        ) {
          不存在相同增益 = false
          return {
            增益名称: item.增益名称,
            增益技能数: item.增益技能数 + 1,
          }
        } else {
          return {
            ...item,
          }
        }
      })
      if (不存在相同增益) {
        增益列表 = 增益列表.concat({
          增益名称: 当前数据?.buff列表?.join(','),
          增益技能数: 1,
        })
      }
    }
  }

  return {
    技能名称: 获取当前日志对应技能枚举,
    技能数量: 1,
    技能增益列表: [...增益列表],
  }
}

export const 判断每个技能的循环时间 = (
  当前技能: CycleSimulatorSkillDTO,
  添加技能CD循环: ShowCycleSingleSkill[],
  网络按键延迟: number,
  加速值,
  朱厌
): { 本技能实际释放时间: number; 下一个技能可以释放时间: number } => {
  // 上一个技能释放结束以后的时间
  const 上一个技能 = 添加技能CD循环[添加技能CD循环.length - 1]
  const 本技能可以释放时间 = 上一个技能?.下一个技能可以释放时间 || 0
  const 加速等级 = 获取加速等级(加速值)
  const 实际GCD = 当前技能.技能释放后添加GCD - 加速等级

  // 本技能等待GCD和网络延迟后实际释放时间
  let 本技能实际释放时间 = 本技能可以释放时间 ? 本技能可以释放时间 + 网络按键延迟 : 0

  // 技能有CD，找上一个技能判断能否释放
  if (当前技能?.技能CD) {
    // 上一个同名技能
    const { 上一个同名技能 } = 判断上一个同名技能(当前技能, 添加技能CD循环, 朱厌)

    if (上一个同名技能) {
      const 实际CD =
        朱厌 && 当前技能.技能名称 === '弛律召野' ? 当前技能?.技能CD + 20 * 16 : 当前技能?.技能CD

      const 上一个同名技能释放CD = (上一个同名技能?.本技能实际释放时间 || 0) + (实际CD || 0)
      本技能实际释放时间 =
        本技能可以释放时间 > 上一个同名技能释放CD
          ? 本技能可以释放时间 + 网络按键延迟
          : 上一个同名技能释放CD + +网络按键延迟
    }
  }

  let 当前技能释放所需时间 = 0
  if (当前技能?.是否为读条技能) {
    // 实际初次频率 - 目前看 初次伤害频率 不吃加速
    const 实际初次频率 = 当前技能.初次伤害频率 || 0
    const 实际伤害频率 = 获取实际帧数(当前技能?.伤害频率, 加速值)
    当前技能释放所需时间 = 实际初次频率
      ? 实际初次频率 + 实际伤害频率 * (当前技能.造成伤害次数 - 1)
      : 实际伤害频率 * 当前技能.造成伤害次数
  }
  const 下一个技能可以释放时间 =
    本技能实际释放时间 + (当前技能释放所需时间 > 实际GCD ? 当前技能释放所需时间 : 实际GCD)

  return {
    本技能实际释放时间,
    下一个技能可以释放时间,
  }
}

export const 判断上一个同名技能 = (当前技能, 循环, 朱厌) => {
  // 上一个同名技能
  const 循环副本 = [...循环]
  循环副本.reverse()
  let 剩余CD = 0

  const 上一个同名技能 = 循环副本?.find((item) => {
    if (item?.实际技能) {
      // 用下一个技能可以释放时间判断不是当前技能
      return item?.实际技能 === 当前技能?.实际技能 && item?.下一个技能可以释放时间
    } else {
      // 用下一个技能可以释放时间判断不是当前技能
      return item?.技能名称 === 当前技能?.技能名称 && item?.下一个技能可以释放时间
    }
  })

  if (上一个同名技能) {
    const 实际CD =
      朱厌 && 当前技能.技能名称 === '弛律召野' ? 当前技能?.技能CD + 20 * 16 : 当前技能?.技能CD

    const 上一个同名技能释放CD = (上一个同名技能?.本技能实际释放时间 || 0) + (实际CD || 0)
    const 下一个技能可以释放CD = 循环[循环.length - 1]?.下一个技能可以释放时间
    剩余CD =
      上一个同名技能释放CD - 下一个技能可以释放CD > 0
        ? 上一个同名技能释放CD - 下一个技能可以释放CD
        : 0
  }

  return { 上一个同名技能, 剩余CD }
}

export const 获取该轮箭用时 = (轮次: ShowCycleSingleSkill[]) => {
  const 用时帧 =
    (轮次[轮次.length - 1]?.下一个技能可以释放时间 || 0) - (轮次[0].本技能实际释放时间 || 0)

  const 用时秒 = Math.round((用时帧 / 16) * 100) / 100
  return 用时秒
}

export const 获取总用时 = (时间) => {
  const 用时秒 = Math.round((时间 / 16) * 100) / 100
  return 用时秒
}
