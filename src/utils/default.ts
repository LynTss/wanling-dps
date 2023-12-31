import { 目标集合 } from '@/data/constant'
import { 获取全部循环 } from '@/data/skillCycle'
import {
  DEFAULT_CHARACTER,
  DEFAULT_EQUIPMENT,
  DEFAULT_MIJI_SELECTED_DATA,
  DEFAULT_QIXUE_VALUE,
  DEFAULT_START_TYPE,
  ZENGYI_DATA_DEFAULT,
} from '@/pages/constant'

export const getDefaultCharacter = () => {
  const sessionCharacter = localStorage.getItem('wl_character_data_basic')
  if (sessionCharacter) {
    try {
      const obj = JSON.parse(sessionCharacter)
      if (obj) {
        return Object.assign({}, DEFAULT_CHARACTER, obj)
      }
    } catch {
      return Object.assign({}, DEFAULT_CHARACTER)
    }
  } else {
    return Object.assign({}, DEFAULT_CHARACTER)
  }
}

export const getDefaultZengyiData = () => {
  const sessionCharacter = localStorage.getItem('wl_zengyi_data_2')
  if (sessionCharacter) {
    try {
      const obj = JSON.parse(sessionCharacter)
      if (obj) {
        return Object.assign({}, ZENGYI_DATA_DEFAULT, obj)
      }
    } catch {
      return Object.assign({}, ZENGYI_DATA_DEFAULT)
    }
  } else {
    return Object.assign({}, ZENGYI_DATA_DEFAULT)
  }
}

export const getDefaultZengyiQiyong = () => {
  const sessiongQiyong = localStorage.getItem('wl_zengyi_qiyong')
  if (sessiongQiyong) {
    try {
      return +sessiongQiyong ? true : false || true
    } catch {
      return +sessiongQiyong ? true : false || true
    }
  } else {
    return true
  }
}

export const getDefaultNetwork = () => {
  const localNetwork = localStorage.getItem('wl_network_data')
  if (localNetwork) {
    return +localNetwork
  } else {
    return 2
  }
}

// 获取奇穴
export const getDefaultQixue = () => {
  const sessionCharacter = localStorage.getItem('wl_qixue_data')
  if (sessionCharacter) {
    try {
      const array = JSON.parse(sessionCharacter)
      return [...(array || DEFAULT_QIXUE_VALUE)]
    } catch {
      return [...DEFAULT_QIXUE_VALUE]
    }
  } else {
    return [...DEFAULT_QIXUE_VALUE]
  }
}

// 获取奇穴
export const getDefaultStartType = (): 'normal' | 'max' => {
  const storageStartType = localStorage.getItem('wl_start_type')
  if (storageStartType) {
    try {
      return (storageStartType as any) || DEFAULT_START_TYPE
    } catch {
      return DEFAULT_START_TYPE
    }
  } else {
    return DEFAULT_START_TYPE
  }
}

export const getDefaultEquipment = () => {
  const localEquipment = localStorage.getItem('wl_zhuangbei_data_basic_1')
  if (localEquipment) {
    try {
      const obj = JSON.parse(localEquipment)
      if (obj) {
        return Object.assign({}, DEFAULT_EQUIPMENT, obj)
      }
    } catch {
      return Object.assign({}, DEFAULT_EQUIPMENT)
    }
  } else {
    return Object.assign({}, DEFAULT_EQUIPMENT)
  }
}

export const getDefaultCycle = () => {
  const skillCycle = 获取全部循环()
  const currentCycleName = localStorage.getItem('wl_当前循环_1') || skillCycle[0]?.name
  return {
    name: currentCycleName,
    cycle: skillCycle.find((item) => item.name === currentCycleName)?.cycle || skillCycle[0]?.cycle,
  }
}

export const getDefaultTarget = () => {
  const currentTargetName = localStorage.getItem('wl_当前目标') || 目标集合[0]?.名称
  return {
    name: currentTargetName,
    target: 目标集合.find((item) => item?.名称 === currentTargetName) || 目标集合[0],
  }
}

export const getDefaultTime = () => {
  return +(localStorage.getItem('wl_计算时间') || 306)
}

export const getCloseBackgroundImg = () => {
  return !!(+(localStorage.getItem('wl_close_background_img') || '') || false)
}

export const getDefaultMijiSelectedData = () => {
  const localEquipment = localStorage.getItem('wl_miji_selected_data_2')
  if (localEquipment) {
    try {
      const obj = JSON.parse(localEquipment)
      if (obj) {
        return [...(obj || [])]
      }
      return [...DEFAULT_MIJI_SELECTED_DATA]
    } catch {
      return [...DEFAULT_MIJI_SELECTED_DATA]
    }
  } else {
    return [...DEFAULT_MIJI_SELECTED_DATA]
  }
}
