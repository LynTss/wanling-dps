import { 属性系数, 精炼加成系数 } from '@/数据/常量'

/**
 * @name 郭氏值算法
 */
export const 郭氏值算法 = (值) => {
  return Math.floor(值 * 1024)
}

/**
 * @name 郭氏基础系数算法
 */
export const 郭氏基础系数算法 = (点数, 系数) => {
  return Math.floor((点数 * 1024) / 系数)
}

/**
 * @name 郭氏结果算法
 */
export const 郭氏结果算法 = (基础值, 郭氏值, 基础系数 = 1) => {
  return Math.floor(基础值 * (基础系数 + 郭氏值 / 1024))
}

/**
 * @name 郭氏会心率
 */
export const 郭氏会心率算法 = (会心值) => {
  const 郭氏会心值 = Math.floor((会心值 * 1024) / 属性系数.会心)
  return 郭氏会心值 / 1024
}

/**
 * @name 郭氏会心伤害算法
 */
export const 郭氏会心伤害算法 = (伤害, 会效值, 郭氏额外会效果值) => {
  const 郭氏会效值 = 郭氏基础系数算法(会效值, 属性系数.会效)
  return Math.floor(伤害 * 1.75) + Math.floor((伤害 * (郭氏会效值 + 郭氏额外会效果值)) / 1024)
}

/**
 * @name 郭氏防御值算法
 */
export const 郭氏防御值算法 = (防御点数, 防御系数) => {
  return Math.floor((防御点数 * 1024) / (防御点数 + 防御系数))
}

/**
 * @name 精炼加成系数算法
 */
export const 精炼加成系数算法 = (jichu, dengji) => {
  return jichu + Math.round(jichu * 精炼加成系数[dengji])
}

export const 获取加速等级 = (number) => {
  return (number || 0) < 95
    ? 0
    : number < 4241
    ? 1
    : number < 8857
    ? 2
    : number < 13851
    ? 3
    : number < 19316
    ? 4
    : 5
}

// export const 求平均值 = (data: number[]) => {
//   // 计算数组中所有数字的总和
//   const sum = data.reduce((acc, curr) => acc + curr, 0)

//   // 计算平均值
//   const average = sum / data.length
//   return average
// }
