// import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { GainDpsTypeEnum, GainTypeEnum } from '@/@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 劲风簇GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '彤弓',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
      {
        增益类型: GainTypeEnum.郭氏外攻会心效果等级,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 102,
      },
    ],
  },
  {
    增益名称: '星烨',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A, // 没找对应的LUA，如果你可以确定和其他增伤是乘算，请放到B类增伤
        增益数值: 1.7,
      },
    ],
  },
]

export default 劲风簇GainDTO
