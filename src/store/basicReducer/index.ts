import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

import { CharacterBasicDTO, CharacterFinalDTO, TargetDTO } from '@/@types/character'
import { CycleDTO } from '@/@types/cycle'
import {
  getDefaultCharacter,
  getDefaultEquipment,
  getDefaultCycle,
  getDefaultTarget,
  getDefaultTime,
  getDefaultNetwork,
  getCloseBackgroundImg,
  getDefaultQixue,
  getDefaultStartType,
} from '@/utils/default'
import { EquipmentBasicDTO } from '@/@types/equipment'

interface BasicState {
  // 角色面板属性信息（不包含各种数据增益。只为装备带来的基础属性
  characterBasicData: CharacterBasicDTO
  // 角色装备属性信息（不包含各种数据增益。只为装备带来的基础属性
  equipmentBasicData: EquipmentBasicDTO
  // 常驻增益计算后的属性，如（奇穴卢令、阵眼常驻增益、秀气、雷等buff）
  characterFinalData: CharacterFinalDTO
  // 当前输出计算循环
  currentCycle: CycleDTO[]
  // 当前输出计算循环名
  currentCycleName: string
  // 当前输出计算目标
  currentTarget: TargetDTO
  // 当前输出计算目标名
  currentTargetName: string
  // 当前计算过的dps
  currentDps: number
  // dps计算时间
  dpsTime: number
  // 网络延迟
  network: number
  // 关闭背景
  closeBackgroundImg: boolean
  // 奇穴信息
  qixueData: string[]
  // 起手类型
  startType: 'normal' | 'max' // normal 正常 max 5承契起手
}

const initialState: BasicState = {
  characterBasicData: getDefaultCharacter(),
  equipmentBasicData: getDefaultEquipment(),
  network: getDefaultNetwork(),
  characterFinalData: {
    面板攻击: 0,
    等级: 120,
    基础攻击: 0,
    破防值: 0,
    // 力道: 0,
    身法: 0,
    体质: 0,
    加速值: 0,
    破招值: 0,
    无双值: 0,
    武器伤害_最小值: 0,
    武器伤害_最大值: 0,
    会心值: 0,
    会心效果值: 0,
  },
  currentDps: 0,
  currentCycle: getDefaultCycle()?.cycle,
  currentCycleName: getDefaultCycle()?.name,
  currentTarget: getDefaultTarget()?.target,
  currentTargetName: getDefaultTarget()?.name,
  dpsTime: getDefaultTime(),
  closeBackgroundImg: getCloseBackgroundImg(),
  qixueData: getDefaultQixue(),
  startType: getDefaultStartType(),
}

export const basicStore = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    setCharacterBasicData: (state, action: PayloadAction<CharacterBasicDTO>) => {
      state.characterBasicData = { ...action.payload }
    },
    setEquipmentBasicData: (state, action: PayloadAction<EquipmentBasicDTO>) => {
      state.equipmentBasicData = { ...action.payload }
    },
    setCharacterFinalData: (state, action: PayloadAction<CharacterFinalDTO>) => {
      state.characterFinalData = { ...action.payload }
    },
    setCurrentCycle: (state, action: PayloadAction<{ cycle: CycleDTO[]; name: string }>) => {
      state.currentCycle = [...action.payload.cycle]
      state.currentCycleName = action.payload.name
    },
    setCurrentTarget: (state, action: PayloadAction<{ target: TargetDTO; name: string }>) => {
      state.currentTarget = { ...action.payload.target }
      state.currentTargetName = action.payload.name
    },
    setDpsTime: (state, action: PayloadAction<number>) => {
      state.dpsTime = action.payload
    },
    setNetwork: (state, action: PayloadAction<number>) => {
      state.network = action.payload
    },
    setCurrentDps: (state, action: PayloadAction<number>) => {
      state.currentDps = action.payload
    },
    setCloseBackgroundImg: (state, action: PayloadAction<boolean>) => {
      state.closeBackgroundImg = action.payload
    },
    setQixueData: (state, action: PayloadAction<string[]>) => {
      state.qixueData = action.payload
    },
    setStartType: (state, action: PayloadAction<'normal' | 'max'>) => {
      state.startType = action.payload
    },
  },
})

export const {
  setCharacterBasicData,
  setEquipmentBasicData,
  setCharacterFinalData,
  setCurrentCycle,
  setCurrentTarget,
  setDpsTime,
  setNetwork,
  setCurrentDps,
  setCloseBackgroundImg,
  setQixueData,
  setStartType,
} = basicStore.actions // 导出操作state的喊出

export const basicState = (state: RootState) => state

export default basicStore.reducer // 导出当前reducer在store/index.ts中记性全局挂
