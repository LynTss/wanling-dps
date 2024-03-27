import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 宠物GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '领胡',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.3,
      },
    ],
  },
  {
    增益名称: '朱厌', // 弛律召野召唤的宠物攻击减少20%伤害
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: -0.3,
      },
    ],
  },
]

export default 宠物GainDTO
