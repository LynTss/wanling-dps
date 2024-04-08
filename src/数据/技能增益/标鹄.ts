import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
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
        // 代码里用的是DST_NPC_DAMAGE_COEFFICIENT，和非侠是同一个
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.D,
        增益数值: 205 / 1024,
      },
    ],
  },
  {
    增益名称: 'CW5%',
    增益所在位置: '武器',
    常驻增益: false,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
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
        增益类型: 增益类型枚举.外攻会心百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.05,
      },
    ],
  },
]

export default 标鹄GainDTO
