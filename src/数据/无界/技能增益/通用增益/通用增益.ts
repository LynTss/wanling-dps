import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import { SkillGainDTO } from '@/@types/skill'
import 大橙武技能增益 from './大橙武技能增益'

const commonGainDTO: SkillGainDTO[] = [
  ...大橙武技能增益,
  {
    增益名称: '非侠·悟',
    增益所在位置: '职业',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.D,
        增益数值: 0.35,
      },
    ],
  },
  {
    增益名称: '无视防御·悟',
    增益所在位置: '职业',
    常驻增益: true,
    增益集合: [
      {
        增益计算类型: 增益计算类型枚举.A,
        增益类型: 增益类型枚举.郭氏无视防御,
        增益数值: 614,
      },
    ],
  },
]

export default commonGainDTO
