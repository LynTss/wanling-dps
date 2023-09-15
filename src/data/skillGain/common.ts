import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const commonGainDTO: SkillGainDTO[] = [
  {
    增益名称: '承契_自身_1层',
    增益所在位置: '技能',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.06 * 1,
      },
    ],
  },
  {
    增益名称: '承契_自身_2层',
    增益所在位置: '技能',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.06 * 2,
      },
    ],
  },
  {
    增益名称: '承契_自身_3层',
    增益所在位置: '技能',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.06 * 3,
      },
    ],
  },
  {
    增益名称: '承契_自身_4层',
    增益所在位置: '技能',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.06 * 4,
      },
    ],
  },
  {
    增益名称: '承契_自身_5层',
    增益所在位置: '技能',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.06 * 5,
      },
    ],
  },
  {
    增益名称: '承契_自身_6层',
    增益所在位置: '技能',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.06 * 6,
      },
    ],
  },
]

export default commonGainDTO
