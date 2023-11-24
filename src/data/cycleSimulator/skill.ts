import { CycleSimulatorSkillDTO, 日志类型 } from '@/@types/cycleSimulator'

const 循环模拟技能基础数据: CycleSimulatorSkillDTO[] = [
  {
    技能名称: '劲风簇',
    技能释放后添加GCD: 16,
    消耗箭数: 1,
    伤害频率: 0,
    造成伤害次数: 1,
    是否上贯穿: true,
    是否引爆贯穿: true,
  },
  {
    技能名称: '标鹄',
    技能释放后添加GCD: 0,
    消耗箭数: 1,
    伤害频率: 0,
    造成伤害次数: 1,
    是否上贯穿: true,
  },
  {
    技能名称: '弛风鸣角',
    技能释放后添加GCD: 24,
    消耗箭数: 3,
    伤害频率: 5,
    初次伤害频率: 5,
    造成伤害次数: 3,
    是否为读条技能: true,
    是否上贯穿: true,
    是否引爆贯穿: true,
  },
  {
    技能名称: '引风唤灵',
    技能释放后添加GCD: 24,
    消耗箭数: 0,
    伤害频率: 0,
    造成伤害次数: 0,
    召唤宠物数量: 1,
  },
  {
    技能名称: '弛律召野',
    技能释放后添加GCD: 24,
    消耗箭数: 0,
    伤害频率: 0,
    造成伤害次数: 0,
    召唤宠物数量: 1,
  },
  {
    技能名称: '饮羽簇-读条',
    技能释放后添加GCD: 32,
    伤害频率: 32,
    初次伤害频率: 32,
    消耗箭数: 1,
    造成伤害次数: 1,
    是否为读条技能: true,
    技能CD: 16 * 8,
    是否上贯穿: true,
    是否引爆贯穿: true,
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
  },
  {
    技能名称: '没石饮羽',
    技能释放后添加GCD: 24,
    消耗箭数: 3,
    伤害频率: 6,
    初次伤害频率: 20,
    造成伤害次数: 3,
    是否为读条技能: true,
    是否上贯穿: true,
    是否引爆贯穿: true,
  },
  {
    技能名称: '朝仪万汇',
    技能释放后添加GCD: 24,
    消耗箭数: 0,
    伤害频率: 8,
    初次伤害频率: 8,
    造成伤害次数: 20,
    是否为读条技能: true,
  },
]

export default 循环模拟技能基础数据

export const 日志类型数组: 日志类型[] = [
  '释放技能',
  '添加自身buff',
  '目标buff变动',
  '造成伤害',
  '技能释放结果',
  '消耗箭',
  '上贯穿',
  '引爆贯穿',
]
