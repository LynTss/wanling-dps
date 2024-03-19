// 根据加速、延迟获取当前用于计算的循环
import { useAppSelector } from '@/hooks'
import { 获取加速等级 } from '@/utils/help'
import { getZengyiJiasu } from '@/utils/skill-dps'

function useCycle() {
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const zengyixuanxiangData = useAppSelector((state) => state?.zengyi?.zengyixuanxiangData)
  const zengyiQiyong = useAppSelector((state) => state?.zengyi?.zengyiQiyong)
  const network = useAppSelector((state) => state?.basic?.network)
  const 当前循环各加速枚举 = useAppSelector((state) => state?.basic?.当前循环各加速枚举)
  const 增益加速值 = zengyiQiyong ? getZengyiJiasu(zengyixuanxiangData) : 0
  const 加速等级 = 获取加速等级(characterFinalData?.加速值 + 增益加速值)
  const 循环信息 = 当前循环各加速枚举?.[加速等级]?.[network]?.cycle
  return 循环信息
}

export default useCycle
