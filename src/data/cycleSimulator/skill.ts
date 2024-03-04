import { CycleSimulatorSkillDTO, 宠物数据模型, 日志类型 } from '@/@types/cycleSimulator'

const 循环模拟技能基础数据: CycleSimulatorSkillDTO[] = [
  {
    技能名称: '引风唤灵',
    技能释放后添加GCD: 24,
    消耗箭数: 0,
    伤害频率: 0,
    造成伤害次数: 0,
    技能CD: 16 * 21,
    召唤宠物: true,
  },
  {
    技能名称: '弛律召野',
    技能释放后添加GCD: 24,
    消耗箭数: 0,
    伤害频率: 0,
    技能CD: 16 * 50, // 点领胡-10秒，点朱厌+20秒
    造成伤害次数: 0,
    召唤宠物: true,
  },
  {
    技能名称: '劲风簇',
    技能释放后添加GCD: 16,
    消耗箭数: 1,
    伤害频率: 0,
    造成伤害次数: 1,
    是否上贯穿: true,
    是否引爆贯穿: true,
    是否上破招: true,
  },
  {
    技能名称: '标鹄',
    技能释放后添加GCD: 0,
    消耗箭数: 1,
    伤害频率: 0,
    造成伤害次数: 1,
    是否上贯穿: true,
    创建循环不可选: true,
  },
  {
    技能名称: '弛风鸣角',
    技能释放后添加GCD: 24,
    消耗箭数: 3,
    伤害频率: 5,
    // 初次伤害频率: 5,
    技能CD: 16 * 5, // 5秒
    造成伤害次数: 3,
    是否为读条技能: true,
    是否上贯穿: true,
    是否引爆贯穿: true,
    是否上破招: true,
  },
  {
    技能名称: '饮羽簇',
    技能释放后添加GCD: 24,
    消耗箭数: 1,
    伤害频率: 0,
    造成伤害次数: 1,
    // 是否为读条技能: true,
    技能CD: 16 * 8,
    是否上贯穿: true,
    是否引爆贯穿: true,
    是否上破招: true,
    实际技能: '饮羽簇',
  },
  {
    技能名称: '没石饮羽',
    技能释放后添加GCD: 24,
    消耗箭数: 3,
    伤害频率: 6,
    初次伤害频率: 20,
    技能CD: 16 * 5, // 5秒
    造成伤害次数: 3,
    // 是否为读条技能: true,
    是否上贯穿: true,
    是否引爆贯穿: true,
    是否上破招: true,
  },
  {
    技能名称: '朝仪万汇',
    技能释放后添加GCD: 24,
    消耗箭数: 0,
    伤害频率: 8,
    造成伤害次数: 20,
    技能CD: 16 * 40,
    是否为读条技能: true,
  },
  {
    技能名称: '饮羽簇-读条',
    技能释放后添加GCD: 24,
    伤害频率: 32,
    消耗箭数: 1,
    造成伤害次数: 1,
    是否为读条技能: true,
    技能CD: 16 * 8,
    是否上贯穿: true,
    是否引爆贯穿: true,
    是否上破招: true,
    实际技能: '饮羽簇',
  },
  {
    技能名称: '寒更晓箭',
    技能释放后添加GCD: 16,
    技能释放后添加GCD是否不吃加速: true,
    消耗箭数: 0,
    造成伤害次数: 0,
    是否为读条技能: false,
    技能CD: 0,
  },
]

export default 循环模拟技能基础数据

export const 日志类型数组: 日志类型[] = [
  '释放技能',
  '自身buff变动',
  '目标buff变动',
  '造成伤害',
  '技能释放结果',
  '消耗箭',
  '上贯穿',
  '棘矢引爆贯穿',
  '于狩引爆贯穿',
  '宠物进入场地',
  '宠物离开场地',
  '等CD',
]

export const 宠物数据: { [key: string]: 宠物数据模型 } = {
  虎: {
    释放后进入场景时间: 1,
    释放后攻击时间: 16,
    释放后退场时间: 61,
  },
  鹰: {
    释放后进入场景时间: 1,
    释放后攻击时间: 16,
    释放后退场时间: 49,
  },
  猪: {
    释放后进入场景时间: 1,
    释放后攻击时间: 16,
    释放后退场时间: 61,
  },
  象: {
    释放后进入场景时间: 1,
    释放后攻击时间: 16,
    释放后退场时间: 80,
  },
  狼: {
    释放后进入场景时间: 1,
    释放后攻击时间: 16,
    释放后退场时间: 57,
    宠物攻击次数: 3,
    宠物攻击频率: 5, // 不准确，不影响buff计算
  },
  熊: {
    释放后进入场景时间: 1,
    释放后攻击时间: 16,
    释放后退场时间: 91,
  },
}
