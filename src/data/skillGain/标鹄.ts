import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 标鹄GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '贯侯',
    增益所在位置: '奇穴',
    增益启用开关: false,
    增益集合: [
      {
        // 贯侯是直接修改标鹄基础系数进行的加成，这里直接采用独立伤害百分比计算
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.2,
      },
    ],
  },
  {
    增益名称: 'CW5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
  {
    增益名称: '小CW会心5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
]

export default 标鹄GainDTO
