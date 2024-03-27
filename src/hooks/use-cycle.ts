// 根据加速、延迟获取当前用于计算的循环
import { 获取全部循环 } from '@/data/skillCycle'
import { useAppSelector } from '@/hooks'
import { 获取加速等级 } from '@/utils/help'
import { getZengyiJiasu } from '@/utils/skill-dps'

function useCycle(state?) {
  let 角色最终属性: any
  let 增益数据: any
  let 增益启用: any
  let 网络延迟: any
  let 当前循环各加速枚举: any
  let 当前循环名: any
  if (state) {
    角色最终属性 = state?.角色最终属性
    增益数据 = state?.增益数据
    增益启用 = state?.增益启用
    网络延迟 = state?.网络延迟
    当前循环各加速枚举 = state?.当前循环各加速枚举
    当前循环名 = state?.当前循环名称
  } else {
    角色最终属性 = useAppSelector((state) => state?.basic?.角色最终属性)
    增益数据 = useAppSelector((state) => state?.basic?.增益数据)
    增益启用 = useAppSelector((state) => state?.basic?.增益启用)
    网络延迟 = useAppSelector((state) => state?.basic?.网络延迟)
    当前循环各加速枚举 = useAppSelector((state) => state?.basic?.当前循环各加速枚举)
    当前循环名 = useAppSelector((state) => state?.basic?.当前循环名称)
  }
  const 增益加速值 = 增益启用 ? getZengyiJiasu(增益数据) : 0
  const 加速等级 = 获取加速等级(角色最终属性?.加速值 + 增益加速值)

  const 是否为大CW = !!角色最终属性?.装备增益?.大橙武特效
  const All_Cycle_Data = 获取全部循环()
  const 该循环是否存在大CW循环 = All_Cycle_Data?.find((item) => item.name === `${当前循环名}_cw`)
  if (是否为大CW && 该循环是否存在大CW循环) {
    当前循环各加速枚举 = 该循环是否存在大CW循环?.各加速枚举
  }
  const 循环信息 = 当前循环各加速枚举?.[加速等级]?.[网络延迟]
  return {
    cycle: 循环信息?.cycle || [],
    dpsTime: 循环信息?.dpsTime || 0,
  }
}

export default useCycle
