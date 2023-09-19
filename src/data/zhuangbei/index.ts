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

export const 龙门_武器Ids: EquipmentIds[] = []
// 特效武器
export const 特效_武器Ids: EquipmentIds[] = []
export const 特效_武器_2Ids: EquipmentIds[] = []
// 特效腰坠
export const 特效_腰椎Ids: EquipmentIds[] = []
export const 特效_腰椎_2Ids: EquipmentIds[] = []
// 切糕套装
export const 切糕套装_1Ids: EquipmentIds[] = []
export const 切糕套装_2Ids: EquipmentIds[] = []
// 大CW特效Ids
export const 大CW特效Ids: EquipmentIds[] = []
export const 小CW特效Ids: EquipmentIds[] = []

// 2022冬至套装
export const 冬至套装_1Ids: EquipmentIds[] = []

// 2件套会心 4件套XX10%
export const 套装_1Ids: EquipmentIds[] = []
// 2件套XX10% 4件套会心
export const 套装_2Ids: EquipmentIds[] = []
export const 套装_3Ids: EquipmentIds[] = []

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
