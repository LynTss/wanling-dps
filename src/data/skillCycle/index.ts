import 九乌 from './九乌'
import single_skill_cycle from './single_skill_cycle'

const All_Cycle_Data = [
  {
    name: '九乌',
    title: '九乌流',
    cycle: 九乌,
    hide: false,
    cycleList: [
      { 计算技能数: 10, 循环完整帧数: 200, 循环次数: 1 },
      { 计算技能数: 15, 循环完整帧数: 300, 循环次数: 8 },
    ],
    type: '九乌',
  },
  {
    name: '单技能伤害期望统计-仅参考',
    title: '单技能伤害期望统计-仅参考',
    cycle: single_skill_cycle,
    cycleList: [{ 计算技能数: 1, 循环完整帧数: 1, 循环次数: 1 }],
    type: '单技能统计',
  },
]

export default All_Cycle_Data
