import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 贯穿ainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '素矰',
    增益所在位置: '奇穴',
    常驻增益: true,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.1,
      },
    ],
  },
]

export default 贯穿ainDTO
