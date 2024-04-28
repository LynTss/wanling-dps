import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import { SKillGainData } from './../../../@types/skill.d'

interface 装备增益数据 {
  [key: string]: SKillGainData[]
}
const 装备增益数据 = {
  套装会心会效: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.郭氏外攻会心效果等级,
      增益数值: 41 * 0.7, // 覆盖率按70%算
    },
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻会心百分比,
      增益数值: 0.04 * 0.7, // 覆盖率按70%算
    },
  ],
  切糕会心: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻会心等级,
      增益数值: 1363,
    },
  ],
  切糕无双: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.无双等级,
      增益数值: 1363,
    },
  ],
  切糕会心_英雄: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻会心等级,
      增益数值: 1484,
    },
  ],
  切糕无双_英雄: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.无双等级,
      增益数值: 1484,
    },
  ],
  冬至套装: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.身法,
      增益数值: 305,
    },
    // 力道加成
    // 力道加成基础攻击: 0.15, // 四舍五入计算
    // 力道加成破防: 0.29999, // 四舍五入计算,
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.基础攻击,
      增益数值: 45,
    },
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻破防等级,
      增益数值: 91,
    },
  ],
  水特效武器: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.基础攻击,
      增益数值: 980,
      // 按覆盖率100%算 一层98 10层980
    },
  ],
  水特效武器_英雄: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.基础攻击,
      增益数值: 1110,
      // 按覆盖率100%算 一层111 10层1110
    },
  ],
  龙门武器: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻会心等级,
      增益数值: (4420 * 6) / 30,
    },
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻会心效果等级,
      增益数值: (2110 * 6) / 30,
    },
  ],
  风特效腰坠: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻破防等级,
      增益数值: 929, // 按覆盖率10%算
    },
  ],
  风特效腰坠_英雄: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻破防等级,
      增益数值: 10573 * 0.1, // 按覆盖率10%算
    },
  ],
  大附魔_伤帽: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.外攻破防等级,
      增益数值: 1218,
    },
  ],
  大附魔_伤衣: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.基础攻击,
      增益数值: 549,
    },
  ],
  大附魔_伤腰: [
    {
      增益计算类型: 增益计算类型枚举.A,
      增益类型: 增益类型枚举.伤害百分比,
      增益数值: (0.038 * 8) / 30, // 按30% 1% 和 70% 5% 的中间值算 30秒触发一次，时常8秒
    },
  ],
  大附魔_伤腕: [],
  大附魔_伤鞋: [],
}
export default 装备增益数据
