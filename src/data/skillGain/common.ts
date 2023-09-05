import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'

const commonGainDTO: SkillGainDTO[] = [
  {
    增益名称: '承契-5层',
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
]

export default commonGainDTO
