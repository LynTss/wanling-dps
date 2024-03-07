// 根据当前增益装备，计算实时循环总dps
import { 目标集合 } from '@/data/constant'
import { 判断是否开启无视防御奇穴, 判断是否开启身法加成奇穴 } from '@/data/qixue'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
import { getDpsTime, 获取实际循环, 根据奇穴处理技能的基础增益信息 } from '@/utils/skill-dps'
import { CharacterFinalDTO } from '@/@types/character'
import { SKillGainData, SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { getNotGuoDpsTotal } from '@/components/Dps/wu_guoshi_dps_utils'
import { CycleDTO } from '@/@types/cycle'
import WanlingSkillDataDTO from '@/data/skill'
import { getSkillCycleGainData } from '@/components/BasicSet/CharacterSet/ZhuangbeiSetModal/utils'

interface CurrentDpsFunctionProps {
  showTime?: boolean // 是否展示计算时间
  updateCurrentDps?: boolean // 是否更新当前dps结果
  更新角色面板?: CharacterFinalDTO // 传入的需要更新的角色面板
  更新技能基础数据?: SkillBasicDTO[] // 传入的需要更新的技能基础数据
  更新团队增益数据?: ZengyixuanxiangDataDTO // 传入的需要更新团队增益数据
  更新默认增益集合?: SKillGainData[] // 用于增益计算
  是否郭氏计算?: boolean // 是否郭式计算
  更新计算时间?: number // 更新计算时间
  更新循环技能列表?: CycleDTO[] // 更新循环技能列表
  更新循环名称?: string // 更新循环名称
  更新奇穴数据?: string[] // 更新奇穴数据
}

export interface CurrentDpsFunctionRes {
  totalDps: number
  dpsList: any[]
  dpsPerSecond: number
}

export const currentDpsFunction = (props?: CurrentDpsFunctionProps) => {
  const {
    showTime = false,
    更新角色面板 = {},
    更新默认增益集合 = [],
    是否郭氏计算 = true,
    更新计算时间,
    更新循环技能列表,
    更新循环名称,
    更新奇穴数据,
  } = props || {}

  const 延迟 = 2
  const 当前角色面板 = { ...更新角色面板 } as any
  const 当前循环技能列表 = 更新循环技能列表
  const 当前循环名称 = 更新循环名称 || ''
  const 当前目标 = 目标集合[0]
  const 技能基础数据 =
    getSkillCycleGainData(
      WanlingSkillDataDTO,
      当前角色面板?.装备增益?.套装技能 || 0,
      当前角色面板?.装备增益?.大橙武特效,
      当前角色面板?.装备增益?.小橙武特效
    ) || []
  const 起手类型 = 'normal'
  const 奇穴数据 = 更新奇穴数据 || []

  const 开启身法加成奇穴 = 判断是否开启身法加成奇穴(奇穴数据)
  const 开启无视防御奇穴 = 判断是否开启无视防御奇穴(奇穴数据)

  if (!当前循环技能列表?.length || !当前角色面板) {
    return { totalDps: 0, dpsList: [], dpsPerSecond: 0 }
  }
  const dpsTime =
    更新计算时间 || getDpsTime(当前循环名称, 当前角色面板, 延迟, false, {} as any, showTime)

  // 获取实际循环
  const trueCycle = 获取实际循环(当前循环名称, 当前循环技能列表, 当前角色面板, 奇穴数据, 起手类型)

  // 获取基础技能信息加成
  const trueSkillBasicData = 根据奇穴处理技能的基础增益信息(技能基础数据, 奇穴数据)

  const dpsFunction = 是否郭氏计算 ? getDpsTotal : getNotGuoDpsTotal

  // dps结果计算
  const { totalDps, dpsList } = dpsFunction({
    currentCycle: trueCycle,
    characterFinalData: 当前角色面板,
    当前目标: 当前目标,
    skillBasicData: trueSkillBasicData,
    zengyiQiyong: false,
    zengyixuanxiangData: {} as any,
    默认增益集合: 更新默认增益集合 || [],
    dpsTime,
    开启卢令: 开启身法加成奇穴,
    开启无视防御: 开启无视防御奇穴,
  })

  // 每秒dps
  const dpsPerSecond = Math.floor(totalDps / dpsTime)

  return { totalDps, dpsList, dpsPerSecond }
}