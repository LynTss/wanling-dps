import { 每秒郭氏帧 } from '../constant'
import 循环模拟技能基础数据, { 原始Buff数据 } from '../constant/skill'
import { 循环基础技能数据类型, DotDTO } from './type'

export const 根据奇穴修改buff数据 = (奇穴: string[]) => {
  const res = {}
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  Object.keys(原始Buff数据).forEach((key) => {
    const obj = 原始Buff数据[key]
    switch (key) {
      case '贯穿':
        if (判断奇穴('桑柘')) {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(obj as DotDTO).最大作用次数 = 5
          ;(obj as DotDTO).最大持续时间 = 40
        } else {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(obj as DotDTO).最大作用次数 = 4
          ;(obj as DotDTO).最大持续时间 = 32
        }
        break
      default:
        break
    }
    res[key] = obj
  })

  return res
}

export const 根据奇穴修改技能数据 = (奇穴: string[]): 循环基础技能数据类型[] => {
  const 判断奇穴 = (val) => {
    return 奇穴?.includes(val)
  }

  const res: 循环基础技能数据类型[] = 循环模拟技能基础数据.map((技能) => {
    if (技能?.技能名称 === '金乌见坠') {
      return 判断奇穴('托月')
        ? {
            ...技能,
            最大充能层数: 3,
          }
        : 技能
    } else if (技能?.技能名称 === '弛律召野') {
      let 技能原始CD = 技能.技能CD || 0
      if (判断奇穴('朱厌')) {
        技能原始CD = 技能原始CD + 每秒郭氏帧 * 20
      }
      if (判断奇穴('领胡')) {
        技能原始CD = 技能原始CD - 每秒郭氏帧 * 10
      }
      return {
        ...技能,
        技能CD: 技能原始CD,
      }
    } else {
      return 技能
    }
  })

  return res
}

export const ERROR_ACTION = {
  箭数不足: {
    信息: '当前箭数不足无法释放该技能',
  },
  BUFF错误: {
    信息: '当前没有对应的BUFF',
  },
}

export const 起手承契BUFF = (Buff和Dot数据, 层数) => {
  return {
    承契: {
      ...Buff和Dot数据['承契'],
      当前层数: 层数,
      刷新时间: 0,
    },
  }
}

export const 根据加速等级获取虚拟加速值 = (加速等级) => {
  const 加速等级枚举 = {
    0: 0,
    1: 95,
    2: 4241,
    3: 8857,
    4: 13851,
    5: 19316,
  }
  return 加速等级枚举[加速等级]
}

export const 转化buff和增益名称 = (增益名称, buff列表) => {
  if (增益名称?.includes('承契')) {
    const 增益层数 = 增益名称?.split('_')?.[1]?.[0] || 0
    if (!增益层数) {
      return {}
    } else {
      return +buff列表?.['承契']?.当前层数 === +增益层数 ? buff列表?.['承契'] : {}
    }
  } else {
    return buff列表?.[增益名称]
  }
}
