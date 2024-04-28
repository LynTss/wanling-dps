import { 增益计算类型枚举, 增益类型枚举 } from '../../@types/enum'
import { SkillGainDTO } from '../../@types/skill'
import commonGainDTO from './common'

const 风矢增益数据: SkillGainDTO[] = [
  ...commonGainDTO,
  {
    增益名称: '万灵普通攻击增伤',
    增益所在位置: '奇穴',
    常驻增益: true,
    增益集合: [
      {
        增益类型: 增益类型枚举.伤害百分比,
        增益计算类型: 增益计算类型枚举.A,
        增益数值: 0.2,
      },
    ],
  },
]

export default 风矢增益数据
