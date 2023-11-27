import { CycleDTO } from '@/@types/cycle'
import { CycleSimulatorLog } from '@/@types/cycleSimulator'

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

// 没表明枚举就直接取原值
const Skill_Cycle_Map = {
  '贯穿【1】- DOT': '贯穿·一',
  '贯穿【2】- DOT': '贯穿·二',
  '贯穿【3】- DOT': '贯穿·三',
  '贯穿【4】- DOT': '贯穿·四',
  '贯穿【5】- DOT': '贯穿·五',
  '贯穿【6】- DOT': '贯穿·六',
  '贯穿【1】- 引爆': '贯穿·三',
  '贯穿【2】- 引爆': '贯穿·六',
  '贯穿【3】- 引爆': '贯穿·九',
  '贯穿【4】- 引爆': '贯穿·十二',
  '贯穿【5】- 引爆': '贯穿·十五',
  '贯穿【6】- 引爆': '贯穿·十八',
  '狼-宠物': '攻击-狼',
  '虎-宠物': '攻击-虎',
  '鹰-宠物': '攻击-鹰',
  '熊-宠物': '攻击-熊',
  '猪-宠物': '重击',
  '象-宠物': '践踏',
  '饮羽簇-读条 - 1': '饮羽簇',
  '没石饮羽 - 1': '饮羽簇',
  '没石饮羽 - 2': '饮羽簇',
  '没石饮羽 - 3': '饮羽簇',
  '弛风鸣角 - 1': '劲风簇',
  '弛风鸣角 - 2': '劲风簇',
  '弛风鸣角 - 3': '劲风簇',
}
