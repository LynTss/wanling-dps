import { CycleDTO, CycleGain } from '@/@types/cycle'
import { CycleSimulatorLog } from '@/@types/cycleSimulator'
import { Skill_Cycle_Map } from '@/utils/skill-dps'

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
