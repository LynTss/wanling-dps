// 写这个文件的原因是这样就不用获取redux的数据了，避免了本地js调用异常
// 根据当前增益装备，计算实时循环总dps
import { 目标集合 } from '@/数据/常量'
import { 判断是否开启身法加成奇穴 } from '@/数据/奇穴'
import { getDpsTotal } from '@/components/Dps/guoshi_dps_utils'
import { 根据秘籍奇穴装备格式化技能信息 } from '@/utils/skill-dps'
import { CharacterFinalDTO } from '@/@types/character'
import { SKillGainData, SkillBasicDTO } from '@/@types/skill'
import { ZengyixuanxiangDataDTO } from '@/@types/zengyi'
import { getNotGuoDpsTotal } from '@/components/Dps/wu_guoshi_dps_utils'
import { CycleDTO } from '@/@types/cycle'
import WanlingSkillDataDTO from '@/数据/技能原始数据'
import { DEFAULT_MIJI_SELECTED_DATA } from '@/pages/constant'

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
  更新增益启用?: boolean
  当前平台标识?: string
}

export interface CurrentDpsFunctionRes {
  totalDps: number
  dpsList: any[]
  dpsPerSecond: number
}

export const currentDpsFunction = (props?: CurrentDpsFunctionProps) => {
  const {
    更新角色面板 = {},
    更新默认增益集合 = [],
    是否郭氏计算 = true,
    更新计算时间,
    更新循环技能列表,
    更新奇穴数据,
    更新增益启用,
    更新团队增益数据,
  } = props || {}

  const 当前角色面板 = { ...更新角色面板 } as any
  const 当前循环技能列表 = 更新循环技能列表
  const 当前目标 = 目标集合[0]
  const 奇穴数据 = 更新奇穴数据 || []

  const 技能基础数据 = 根据秘籍奇穴装备格式化技能信息({
    技能基础数据: WanlingSkillDataDTO,
    秘籍信息: DEFAULT_MIJI_SELECTED_DATA,
    奇穴数据: 奇穴数据,
    装备增益: 当前角色面板?.装备增益,
  })

  const 开启身法加成奇穴 = 判断是否开启身法加成奇穴(奇穴数据)

  if (!当前循环技能列表?.length || !当前角色面板) {
    return { totalDps: 0, dpsList: [], dpsPerSecond: 0 }
  }
  const 战斗时间 = 更新计算时间 || 0

  const dpsFunction = 是否郭氏计算 ? getDpsTotal : getNotGuoDpsTotal

  // dps结果计算
  const { totalDps, dpsList } = dpsFunction({
    计算循环: 当前循环技能列表,
    角色最终属性: 当前角色面板,
    当前目标: 当前目标,
    技能基础数据: 技能基础数据,
    增益启用: 更新增益启用 || false,
    增益数据: (更新团队增益数据 as any) || {},
    默认增益集合: 更新默认增益集合 || [],
    战斗时间,
    开启卢令: 开启身法加成奇穴,
  })

  // 每秒dps
  const dpsPerSecond = Math.floor(totalDps / 战斗时间)

  return { totalDps, dpsList, dpsPerSecond }
}
