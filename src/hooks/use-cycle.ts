// 根据加速、延迟获取当前用于计算的循环
import { 获取全部循环 } from '@/data/skillCycle'
import { useAppSelector } from '@/hooks'
import { 获取加速等级 } from '@/utils/help'
import { getZengyiJiasu } from '@/utils/skill-dps'

function useCycle(state?) {
  let characterFinalData: any
  let zengyixuanxiangData: any
  let zengyiQiyong: any
  let network: any
  let 当前循环各加速枚举: any
  let 当前循环名: any
  if (state) {
    characterFinalData = state?.characterFinalData
    zengyixuanxiangData = state?.zengyixuanxiangData
    zengyiQiyong = state?.zengyiQiyong
    network = state?.network
    当前循环各加速枚举 = state?.当前循环各加速枚举
    当前循环名 = state?.currentCycleName
  } else {
    characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
    zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
    zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)
    network = useAppSelector((state) => state?.basic?.network)
    当前循环各加速枚举 = useAppSelector((state) => state?.basic?.当前循环各加速枚举)
    当前循环名 = useAppSelector((state) => state?.basic?.currentCycleName)
  }
  const 增益加速值 = zengyiQiyong ? getZengyiJiasu(zengyixuanxiangData) : 0
  const 加速等级 = 获取加速等级(characterFinalData?.加速值 + 增益加速值)

  const 是否为大CW = !!characterFinalData?.装备增益?.大橙武特效
  const All_Cycle_Data = 获取全部循环()
  const 该循环是否存在大CW循环 = All_Cycle_Data?.find((item) => item.name === `${当前循环名}_cw`)
  if (是否为大CW && 该循环是否存在大CW循环) {
    当前循环各加速枚举 = 该循环是否存在大CW循环?.各加速枚举
  }
  const 循环信息 = 当前循环各加速枚举?.[加速等级]?.[network]
  return {
    cycle: 循环信息?.cycle || [],
    dpsTime: 循环信息?.dpsTime || 0,
  }
}

export default useCycle
