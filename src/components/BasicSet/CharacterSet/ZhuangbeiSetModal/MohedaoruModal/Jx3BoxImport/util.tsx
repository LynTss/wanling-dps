import { 附魔名称枚举 } from '@/@types/enum'

// 获取配装数据
export const getEquipData = (data) => {
  const equip: any = {}
  let msg = ''
  try {
    Object.keys(data).map((item) => {
      if (EquipPositionMap[item]) {
        const basicData = data[item]
        const fumoType = basicData?.enhance?.Attribute1ID
        const fumoValue = basicData?.enhance?.Attribute1Value1
        if (!FumoMap[fumoType]) {
          console.warn(`存在计算器未内置附魔${fumoType}${fumoValue}`)
        }
        if (
          !附魔名称枚举[`${FumoMap[fumoType]}${fumoValue}`] &&
          FumoMap[fumoType] &&
          !['atVitalityBase', 'atDecriticalDamageBase', 'atToughnessBase'].includes(fumoType)
        ) {
          msg = `存在计算器未内置附魔${fumoType}${fumoValue}`
        }
        equip[EquipPositionMap[item]] = {
          当前精炼等级: basicData?.strength,
          id: basicData?.equip.ID,
          装备部位: EquipPositionMap[item].split('_')?.[0],
          镶嵌孔数组: basicData?.embedding?.map((a) => {
            if (!XiangQianKOngMeiju[a?.raw?.[0]]) {
              console.warn(`存在计算器未内置镶嵌孔${a?.raw?.[0]}`)
            }
            return {
              镶嵌类型: XiangQianKOngMeiju[a?.raw?.[0]],
              镶嵌宝石等级: a?.level,
            }
          }),
          附魔: FumoMap[fumoType] && fumoValue ? `${FumoMap[fumoType]}+${fumoValue}` : '',
        }

        // 判断大附魔
        if (DaFuMoMap[item] && !!basicData?.enchant) {
          equip[DaFuMoMap[item]] = 1
        }

        if (item === 'PRIMARY_WEAPON' && basicData?.stone) {
          equip.五彩石 = basicData?.stone.Name
        }
      }
    })
  } catch (e) {
    msg = '获取方案异常'
  }
  return {
    equip,
    errorMsg: msg ? (
      <span>
        <p>{msg}</p>
        {/* <p>请联系计算器作者（QQ：372103645）并提供异常的配装ID</p> */}
      </span>
    ) : null,
  }
}

const DaFuMoMap = {
  HAT: '大附魔_伤帽',
  JACKET: '大附魔_伤衣',
  BELT: '大附魔_伤腰',
  WRIST: '大附魔_伤腕',
  SHOES: '大附魔_伤鞋',
}

const EquipPositionMap = {
  HAT: '帽子_1',
  JACKET: '衣服_2',
  BELT: '腰带_3',
  WRIST: '护腕_4',
  BOTTOMS: '下装_5',
  SHOES: '鞋子_6',
  NECKLACE: '项链_7',
  PENDANT: '腰坠_8',
  RING_1: '戒指_9',
  RING_2: '戒指_10',
  SECONDARY_WEAPON: '暗器_11',
  PRIMARY_WEAPON: '武器_12',
}

// 属性类型枚举（转化魔盒的属性类型为本地属性类型
const FumoMap = {
  atAgilityBase: '身法',
  atPhysicsAttackPowerBase: '攻击',
  atHasteBase: '加速',
  atSurplusValueBase: '破招',
  atPhysicsCriticalStrike: '会心',
  atPhysicsCriticalDamagePowerBase: '会效',
  atPhysicsOvercomeBase: '破防',
  atStrainBase: '无双',
  atMeleeWeaponDamageBase: '武伤',
}

const XiangQianKOngMeiju = {
  atAgilityBase: '身法',
  atPhysicsAttackPowerBase: '攻击',
  atSurplusValueBase: '破招',
  atPhysicsCriticalStrike: '会心',
  atPhysicsCriticalDamagePowerBase: '会效',
  atPhysicsOvercomeBase: '破防',
  atStrainBase: '无双',
  atHasteBase: '加速',
}
