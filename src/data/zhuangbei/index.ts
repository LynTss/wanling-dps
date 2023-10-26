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

export const 龙门_武器Ids: EquipmentIds = []
// 特效武器
export const 特效_武器Ids: EquipmentIds = [36660]
export const 特效_武器_2Ids: EquipmentIds = [35781]
// 特效腰坠
export const 特效_腰椎Ids: EquipmentIds = [37720]
export const 特效_腰椎_2Ids: EquipmentIds = [38791]
// 切糕套装
export const 切糕套装_1Ids: EquipmentIds = [94464, 94488, 94482, 94476, 94470, 94494]

export const 切糕套装_2Ids: EquipmentIds = [96367, 96391, 96385, 96379, 96373, 96397]
// 大CW特效Ids
export const 大CW特效Ids: EquipmentIds = [33133, 34369, 34399, 34429, 35593, 35623, 36797]
// export const 大CW特效Ids: EquipmentIds = []
export const 小CW特效Ids: EquipmentIds = []

// 2022冬至套装
export const 冬至套装_1Ids: EquipmentIds = []

// 2件套会心 4件套 饮雨10%
export const 套装_1Ids: EquipmentIds = [96135, 96225, 96195, 96165, 96255]
// 2件套 饮雨10% 4件套会心
export const 套装_2Ids: EquipmentIds = [97846, 97849, 97848, 97847, 97850]
export const 套装_3Ids: EquipmentIds = []

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
