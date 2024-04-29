import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const 承契基础系数 = 62 / 1024

const commonGainDTO: SkillGainDTO[] = [
  {
    增益名称: '非侠',
    增益所在位置: '职业',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.D,
        增益数值: 82 / 1024,
      },
    ],
  },
  {
    增益名称: '承契_1层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
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
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
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
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
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
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
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
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 承契基础系数 * 5,
      },
    ],
  },
  {
    增益名称: '承契_6层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 承契基础系数 * 6,
      },
    ],
  },
  {
    增益名称: '承契_7层',
    增益所在位置: '技能',
    增益启用开关: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 承契基础系数 * 7,
      },
    ],
  },
  {
    增益名称: '诸怀',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.郭氏基础攻击,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 102,
      },
      {
        增益类型: 增益类型枚举.郭氏无视防御,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 204,
      },
    ],
  },
  {
    增益名称: '卢令',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.郭氏身法,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 102,
      },
    ],
  },
]

export default commonGainDTO
