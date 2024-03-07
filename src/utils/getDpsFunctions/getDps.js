import Cycle_Data from '../../data/skillCycle'
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
    return {
      ...res,
      dpsList:获取排序后的Dps列表(res.dpsList),
      currentCycleName: 计算循环?.name
    }
  } else {
    return ""
  }
}

const 获取排序后的Dps列表 = (dpsList = []) => {
  const list = [...(dpsList || [])]
    const resList= []
    const guanchuanList= []
    const gongjiList= []

    list.forEach((item) => {
      if (item.countName) {
        resList.push(item)
      } else if (item.name.includes('贯穿')) {
        guanchuanList.push(item)
      } else if (item.name.includes('攻击')) {
        gongjiList.push(item)
      } else {
        resList.push(item)
      }
    })
    if (guanchuanList?.length) {
      let number = 0
      let dps = 0

      guanchuanList.forEach((item) => {
        number = number + item?.number
        dps = dps + item?.dps
      })

      resList.push({
        name: '贯穿',
        number: number,
        dps: dps,
      })
    }

    if (gongjiList?.length) {
      let number = 0
      let dps = 0

      gongjiList.forEach((item) => {
        number = number + item?.number
        dps = dps + item?.dps
      })

      resList.push({
        name: '攻击',
        number: number,
        dps: dps,
      })
    }

    resList.sort((a, b) => {
      return b.dps - a.dps
    })

    return resList.filter((item) => {
      return +item.dps > 0
    })
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
