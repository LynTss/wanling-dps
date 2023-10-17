import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 贯穿GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '贯侯',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.2,
      },
    ],
  },
]

export default 贯穿GainDTO
