// import 九乌, { 循环默认奇穴 as 九乌奇穴 } from './九乌'
import 朱厌, { 循环默认奇穴 as 朱厌奇穴 } from './朱厌'
import 朱厌_九乌 from './朱厌_九乌'
import 朝仪万汇_诸怀, { 循环默认奇穴 as 朝仪万汇_诸怀奇穴 } from './朝仪万汇_诸怀'
import 朝仪万汇_桑拓, { 循环默认奇穴 as 朝仪万汇_桑拓奇穴 } from './朝仪万汇_桑拓'
import 朝仪万汇_诸怀_cw, { 循环默认奇穴 as 朝仪万汇_诸怀_cw奇穴 } from './朝仪万汇_诸怀_cw'
import 朝仪万汇_桑拓_cw, { 循环默认奇穴 as 朝仪万汇_桑拓_cw奇穴 } from './朝仪万汇_桑拓_cw'

const Cycle_Data = [
  {
    name: '朱厌',
    title: '朱厌',
    cycle: 朱厌,
    hide: false,
    // cycleList: [{ 计算技能数: 15, 循环完整帧数: 292, 循环次数: 9 }],
    // 如果使用了dpsTime 则以dpsTime为准
    dpsTime: {
      // 第一个key是加速等级，第二个key为网络延迟
      0: { 1: 180.88, 2: 189.31, 3: 197.75 },
      1: { 1: 179.19, 2: 181.5, 3: 189.31 },
      2: { 1: 178, 2: 179.44, 3: 182.13 },
    },
    type: '朱厌',
    qixue: 朱厌奇穴,
  },
  {
    name: '朱厌_九乌',
    title: '朱厌_九乌',
    cycle: 朱厌_九乌,
    hide: true,
    // cycleList: [{ 计算技能数: 15, 循环完整帧数: 292, 循环次数: 9 }],
    dpsTime: {
      // 第一个key是加速等级，第二个key为网络延迟
      0: { 1: 180.88, 2: 189.31, 3: 197.75 },
      1: { 1: 179.19, 2: 181.5, 3: 189.31 },
      2: { 1: 178, 2: 179.44, 3: 182.13 },
    },
    type: '朱厌',
    qixue: 朱厌奇穴,
  },
  {
    name: '朝仪万汇_桑拓',
    title: '朝仪万汇_桑拓',
    cycle: 朝仪万汇_桑拓,
    hide: false,
    dpsTime: {
      0: { 1: 189.88, 2: 196.56, 3: 203.25 },
      1: { 1: 179.13, 2: 184.25, 3: 190.63 },
      2: { 1: 175.38, 2: 179.75, 3: 184.88 },
    },
    type: '朝仪万汇_桑拓',
    qixue: 朝仪万汇_桑拓奇穴,
  },
  {
    name: '朝仪万汇_诸怀',
    title: '朝仪万汇_诸怀',
    cycle: 朝仪万汇_诸怀,
    hide: false,
    cycleList: [{ 计算技能数: 15, 循环完整帧数: 288, 循环次数: 9 }],
    type: '朝仪万汇_诸怀',
    qixue: 朝仪万汇_诸怀奇穴,
  },
  // {
  //   name: '星烨',
  //   title: '星烨',
  //   cycle: 星烨,
  //   hide: false,
  //   cycleList: [{ 计算技能数: 15, 循环完整帧数: 288, 循环次数: 9 }],
  //   type: '星烨',
  //   qixue: 星烨奇穴,
  // },
  {
    name: '朝仪万汇_诸怀_cw',
    title: '朝仪万汇_诸怀_cw',
    cycle: 朝仪万汇_诸怀_cw,
    hide: true,
    cycleList: [{ 计算技能数: 15, 循环完整帧数: 291, 循环次数: 9 }],
    type: '朝仪万汇_诸怀',
    qixue: 朝仪万汇_诸怀_cw奇穴,
  },
  {
    name: '朝仪万汇_桑拓_cw',
    title: '朝仪万汇_桑拓_cw',
    cycle: 朝仪万汇_桑拓_cw,
    hide: true,
    cycleList: [{ 计算技能数: 15, 循环完整帧数: 291, 循环次数: 9 }],
    type: '朝仪万汇_桑拓',
    qixue: 朝仪万汇_桑拓_cw奇穴,
  },
  // {
  //   name: '单技能伤害期望统计-仅参考',
  //   title: '单技能伤害期望统计-仅参考',
  //   cycle: single_skill_cycle,
  //   cycleList: [{ 计算技能数: 1, 循环完整帧数: 1, 循环次数: 1 }],
  //   type: '单技能统计',
  //   qixue: 常规奇穴,
  // },
]

export default Cycle_Data

// 获取包含网页内存自定义循环在内的全部循环
export const 获取全部循环 = () => {
  const 自定义循环 = localStorage.getItem('wl_custom_cycle') || '[]'
  return [...Cycle_Data, ...JSON.parse(自定义循环)]
}
