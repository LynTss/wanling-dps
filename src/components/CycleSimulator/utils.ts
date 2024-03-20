import { CycleDTO, CycleGain } from '@/@types/cycle'
import { CycleSimulatorLog } from './simulator/type'
import { 每秒郭氏帧 } from './constant'
import { 属性系数 } from '@/data/constant'

export const getDpsCycle = (data: CycleSimulatorLog[]): CycleDTO[] => {
  const res: { [key: string]: CycleDTO } = {}
  for (let i = 0; i < data.length; i++) {
    const 当前数据 = data[i]
    const 本次造成伤害次数 = 当前数据?.其他数据?.伤害次数 || 1
    if (当前数据?.日志类型 === '造成伤害') {
      const 当前日志对应技能枚举 = 获取当前日志对应技能枚举(当前数据?.日志)
      let 增益列表 = res[当前日志对应技能枚举]?.技能增益列表 || []
      if (!增益列表?.length) {
        if (当前数据?.buff列表?.length) {
          增益列表 = 增益列表.concat([
            {
              增益名称: 当前数据?.buff列表?.join(','),
              增益技能数: 本次造成伤害次数,
            },
          ])
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
                增益技能数: item.增益技能数 + 本次造成伤害次数,
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
              增益技能数: 本次造成伤害次数,
            })
          }
        }
      }

      res[当前日志对应技能枚举] = {
        ...res[当前日志对应技能枚举],
        技能名称: 当前日志对应技能枚举,
        技能数量: (res[当前日志对应技能枚举]?.技能数量 || 0) + 本次造成伤害次数,
        技能增益列表: [...增益列表],
      }
    }
  }

  const 结果循环 = Object.keys(res).map((item) => {
    const v = res[item]
    return {
      ...v,
      技能数量: Math.round(v.技能数量),
      技能增益列表: v.技能增益列表?.map((d) => {
        return {
          ...d,
          增益技能数: Math.round(d.增益技能数),
        }
      }),
    }
  })

  return 结果循环
}

export const getSingleSkillDpsCycle = (当前数据: CycleSimulatorLog): CycleDTO => {
  const 当前日志对应技能枚举 = 获取当前日志对应技能枚举(当前数据?.日志)
  const 伤害次数 = 当前数据?.其他数据?.伤害次数 || 1
  let 增益列表: CycleGain[] = []
  if (!增益列表?.length) {
    if (当前数据?.buff列表) {
      增益列表 = 增益列表.concat({
        增益名称: 当前数据?.buff列表?.join(','),
        增益技能数: 伤害次数,
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
            增益技能数: item.增益技能数 + 伤害次数,
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
          增益技能数: 伤害次数,
        })
      }
    }
  }

  return {
    技能名称: 当前日志对应技能枚举,
    技能数量: 伤害次数,
    技能增益列表: [...增益列表],
  }
}

export const 判断上一个同名技能 = (当前技能, 循环) => {
  // 上一个同名技能
  const 循环副本 = [...循环]
  循环副本.reverse()
  let 剩余CD = 0

  const 上一个同名技能 = 循环副本?.find((item) => {
    if (item?.实际技能) {
      // 用下一个技能可以释放时间判断不是当前技能
      return item?.实际技能 === 当前技能?.实际技能 && item?.下一个技能可以释放时间
    } else {
      const 正常技能判定 = item?.技能名称 === 当前技能?.技能名称 && item?.下一个技能可以释放时间
      // 用下一个技能可以释放时间判断不是当前技能
      return 正常技能判定
    }
  })

  if (上一个同名技能) {
    const 实际CD = 当前技能?.技能CD
    const 上一个同名技能释放时间 = (上一个同名技能?.本技能实际释放时间 || 0) + (实际CD || 0)
    const 下一个技能可以释放时间 = 循环[循环.length - 1]?.下一个技能可以释放时间

    剩余CD =
      上一个同名技能释放时间 - 下一个技能可以释放时间 > 0
        ? 上一个同名技能释放时间 - 下一个技能可以释放时间
        : 0
  }

  return { 上一个同名技能, 剩余CD }
}

export const 获取总用时 = (时间) => {
  const 用时秒 = Math.round((时间 / 每秒郭氏帧) * 100) / 100
  return 用时秒
}

export const 获取显示秒伤 = (最后一条伤害数据) => {
  return Math.round((最后一条伤害数据?.造成总伤害 || 0) / (最后一条伤害数据?.日志时间 / 每秒郭氏帧))
}

// 没表明枚举就直接取原值
export const Skill_Cycle_Map = {}

const 获取当前日志对应技能枚举 = (日志) => {
  if (日志?.includes('贯穿')) {
    const { 本次倍率 } = 获取贯穿对应实际倍率(日志)
    return `贯穿·${本次倍率}`
  } else {
    return Skill_Cycle_Map[日志] || 日志
  }
}

export const 获取贯穿对应实际倍率 = (日志) => {
  const 当前层数 = Number(日志?.split('·')?.[1])
  const 当前引爆跳数 = 日志?.includes('- 引爆') ? Number(日志?.split('【')?.[2]?.[0]) : 0
  if (当前引爆跳数) {
    const 层数 = Number(日志?.split('【')?.[1]?.[0])
    const 当前引爆倍率 = 日志?.includes('- 引爆') ? 当前引爆跳数 : 1
    return {
      本次倍率: 层数 * 当前引爆倍率,
      引爆: true,
    }
  } else if (当前层数) {
    return {
      本次倍率: 当前层数,
      引爆: false,
    }
  } else {
    return {
      本次倍率: 1,
      引爆: false,
    }
  }
}

// 读条技能的实际帧数
export const 获取实际帧数 = (原始帧数, 加速值) => {
  return Math.floor((1024 * 原始帧数) / (Math.floor((1024 * 加速值) / 属性系数?.急速) + 1024))
}
