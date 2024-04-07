// import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 饮羽簇GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  // 4件套
  {
    增益名称: '套装10%_1',
    增益所在位置: '套装',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
    ],
  },
  // 2件套
  {
    增益名称: '套装10%_2',
    增益所在位置: '套装',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: 'CW5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
    ],
  },
]

export default 饮羽簇GainDTO
