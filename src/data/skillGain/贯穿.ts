import { GainDpsTypeEnum, GainTypeEnum } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 贯穿GainDTO: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '贯穿会心率加成',
    // TODO
    // 由于没有弄清楚贯穿的快照机制，怀疑存在当前贯穿持续会心、非会心场景。贯穿计算会心率提高0.1
    增益所在位置: 'TODO',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.外攻会心百分比,
        增益计算类型: GainDpsTypeEnum.B,
        增益数值: 0.1,
      },
    ],
  },
  {
    增益名称: '素矰',
    增益所在位置: '奇穴',
    常驻增益: false,
    增益集合: [
      {
        增益类型: GainTypeEnum.伤害百分比,
        增益计算类型: GainDpsTypeEnum.A,
        增益数值: 0.05,
      },
    ],
  },
]

export default 贯穿GainDTO
