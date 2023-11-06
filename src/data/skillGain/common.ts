import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const 承契基础系数 = 0.06056

const commonGainDTO: SkillGainDTO[] = [
  {
    增益名称: '承契_1层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 承契基础系数 * 1,
      },
    ],
  },
  {
    增益名称: '承契_2层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 承契基础系数 * 2,
      },
    ],
  },
  {
    增益名称: '承契_3层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 承契基础系数 * 3,
      },
    ],
  },
  {
    增益名称: '承契_4层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 承契基础系数 * 4,
      },
    ],
  },
  {
    增益名称: '承契_5层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 承契基础系数 * 5,
      },
    ],
  },
  {
    增益名称: '诸怀',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.郭氏基础攻击,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 102,
      },
    ],
  },
]

export default commonGainDTO
