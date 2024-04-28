import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 贯穿GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '素矰',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.技能系数, // 实际是修改系数
        增益数值: 1.05,
      },
    ],
  },
]

export default 贯穿GainDTO
