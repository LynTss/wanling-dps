import ZHUANGBEI_MAOZI from './maozi'
import ZHUANGBEI_YIFU from './yifu'
import ZHUANGBEI_YAODAI from './yaodai'
import ZHUANGBEI_HUWAN from './huwan'
import ZHUANGBEI_XIAZHUANG from './xiazhuang'
import ZHUANGBEI_XIEZI from './xiezi'
import ZHUANGBEI_XIANGLIAN from './xianglian'
import ZHUANGBEI_YAOZHUI from './yaozhui'
import ZHUANGBEI_JIEZHI from './jiezhi'
import ZHUANGBEI_YUANCHENGWUQI from './yuanchengwuqi'
import ZHUANGBEI_JINSHENWUQI from './jinshenwuqi'

// TODO 龙门武器id
export const 龙门_武器: EquipmentIds = [36911]
// 特效武器
export const 特效_武器_普通: EquipmentIds = [35781]
export const 特效_武器_英雄: EquipmentIds = [37252]
// 特效腰坠
export const 特效_腰椎_普通: EquipmentIds = [38791]
export const 特效_腰椎_英雄: EquipmentIds = [39855]
// 切糕套装
export const 切糕套装_普通: EquipmentIds = [96367, 96391, 96385, 96379, 96373, 96397]
export const 切糕套装_英雄: EquipmentIds = [98481, 98505, 98499, 98493, 98487, 98511]
// 大CW特效Ids
export const 大橙武武器: EquipmentIds = [
  33133, 34369, 34399, 34429, 35593, 35623, 36796, 36797, 38046, 38077,
]
// export const 大CW特效Ids: EquipmentIds = []
export const 小橙武武器: EquipmentIds = [36807, 37073, 37104]

// 2022冬至套装
export const 冬至套装: EquipmentIds = [36859, 39791, 98157, 98127]

// 2件套会心 4件套 饮羽10%
export const 套装_两件套双会: EquipmentIds = [96135, 96225, 96195, 96165, 96255]
// 2件套 饮羽10% 4件套会心
export const 套装_两件套技能: EquipmentIds = [98249, 98339, 98309, 98279, 98369]

const ZUANGBEI_DATA = {
  帽子: ZHUANGBEI_MAOZI,
  衣服: ZHUANGBEI_YIFU,
  腰带: ZHUANGBEI_YAODAI,
  护腕: ZHUANGBEI_HUWAN,
  下装: ZHUANGBEI_XIAZHUANG,
  鞋子: ZHUANGBEI_XIEZI,
  项链: ZHUANGBEI_XIANGLIAN,
  腰坠: ZHUANGBEI_YAOZHUI,
  戒指: ZHUANGBEI_JIEZHI,
  暗器: ZHUANGBEI_YUANCHENGWUQI,
  武器: ZHUANGBEI_JINSHENWUQI,
}

export default ZUANGBEI_DATA

type EquipmentIds = number[]
