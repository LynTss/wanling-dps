// 根据加速、延迟获取当前用于计算的循环
import { 获取全部循环 } from '@/数据/计算循环'
import { useAppSelector } from '@/hooks'
import { 获取加速等级 } from '@/utils/help'
import { 计算增益数据中加速值 } from '@/utils/skill-dps'

function useCycle(state?) {
  let 角色最终属性: any
  let 增益数据: any
  let 增益启用: any
  let 网络延迟: any
  let 当前循环各加速枚举: any
  let 当前循环名: any
  let 当前平台标识: any
  if (state) {
    角色最终属性 = state?.角色最终属性
    增益数据 = state?.增益数据
    增益启用 = state?.增益启用
    网络延迟 = state?.网络延迟
    当前循环各加速枚举 = state?.当前循环各加速枚举
    当前循环名 = state?.当前循环名称
    当前平台标识 = state?.当前平台标识
  } else {
    角色最终属性 = useAppSelector((state) => state?.basic?.角色最终属性)
    增益数据 = useAppSelector((state) => state?.basic?.增益数据)
    增益启用 = useAppSelector((state) => state?.basic?.增益启用)
    网络延迟 = useAppSelector((state) => state?.basic?.网络延迟)
    当前循环各加速枚举 = useAppSelector((state) => state?.basic?.当前循环各加速枚举)
    当前循环名 = useAppSelector((state) => state?.basic?.当前循环名称)
    当前平台标识 = useAppSelector((state) => state?.basic?.当前平台标识)
  }

  const 增益加速值 = 增益启用 ? 计算增益数据中加速值(增益数据) : 0
  const 加速等级 = 获取加速等级(角色最终属性?.加速值 + 增益加速值)

  const 是否为大CW = !!角色最终属性?.装备增益?.大橙武特效
  const All_Cycle_Data = 获取全部循环(当前平台标识)
  let 当前循环 = All_Cycle_Data?.find((item) => item?.name === 当前循环名)

  const 是否存在大CW循环 = All_Cycle_Data?.find((item) => item.name?.includes(`橙武`))
  if (是否为大CW && 是否存在大CW循环) {
    当前循环各加速枚举 = 是否存在大CW循环?.各加速枚举
    当前循环 = 是否存在大CW循环
  }
  const 循环信息 = 当前循环各加速枚举?.[加速等级]?.[网络延迟]

  return {
    cycle: 循环信息?.cycle || [],
    dpsTime: 循环信息?.dpsTime || 0,
    qixue: 当前循环?.qixue,
  }
}

export default useCycle
