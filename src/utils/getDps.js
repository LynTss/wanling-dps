import Cycle_Data from '../data/skillCycle'
import { currentDpsFunction } from './getDpsLocal'

export const 计算Dps = (params = {}) => {
  // 获取面板
  const { 面板, 奇穴 } = params

  if (面板 && 奇穴) {
    // 根据奇穴判断应该调用那个循环
    const 计算循环 = 根据奇穴判断计算循环(奇穴)
    // 调用Dps计算方法
    const res = currentDpsFunction({
      更新角色面板: 面板,
      更新循环技能列表: 计算循环?.cycle,
      更新循环名称: 计算循环?.name,
      更新奇穴数据: 计算循环?.奇穴,
    })
    console.log('res',res)
    return JSON.stringify(res)
  } else {
    return ""
  }
}

const 根据奇穴判断计算循环 = (奇穴 = []) => {
  let res
  if (奇穴.includes('朱厌')) {
    res = (Cycle_Data || []).find((item) => item.name === '朱厌（压缩）')
  } else if (奇穴.includes('朝仪万汇_桑拓')) {
    res = (Cycle_Data || []).find((item) => item.name === '朝仪万汇_桑拓')
  }
  return res || (Cycle_Data || []).find((item) => item.name === '朝仪万汇_桑拓')
}

export default 计算Dps
