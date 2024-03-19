import { EnchantNameEnum } from '@/@types/enum'
import ZUANGBEI_DATA from '@/data/zhuangbei'

// 获取配装数据
export const getEquipData = (data) => {
  const equip: any = {}
  const equipList = data || []
  let msg = ''
  const errorMsg = ''
  let 已经计算过一个戒指 = false
  // try {
  equipList.map((item) => {
    // 去除数字拿到附魔类型
    const dataFumoType = item?.WPermanentEnchant?.replace(/\d/g, '')
    const fumoType = FumoMap.find((key) => dataFumoType?.includes(key))
    // 取出附魔的数字
    let fumoValue = item?.WPermanentEnchant?.match(/\d+/g)
    if (!fumoType) {
      console.warn(`存在计算器未内置附魔${fumoType}${fumoValue}`)
    }
    // 当前的value不存在，找到内置的数值最高的value
    if (fumoType && !EnchantNameEnum[`${fumoType}${fumoValue}`]) {
      // 先过滤出符合当前type的附魔
      const list = Object.keys(EnchantNameEnum).filter((item) => item?.includes(fumoType))
      if (list?.length) {
        msg = `存在计算器未内置附魔${fumoType}${fumoValue}，已替换为最高数值附魔`
        fumoValue = list[list.length - 1]?.match(/\d+/g)
      }
    }

    const 装备位置映射 =
      item.type === '戒指' && 已经计算过一个戒指
        ? '戒指_10'
        : !EquipPositionMap[item.type]
        ? '暗器_11'
        : EquipPositionMap[item.type]
    const 装备数据位置映射 = EquipDataMap[item.type] || '暗器'
    const 装备原始数据 = ZUANGBEI_DATA[装备数据位置映射]?.find(
      (data) => data.装备名称 === item.name && +data.装备品级 === +item.Quality
    )
    if (装备原始数据) {
      equip[装备位置映射] = {
        当前精炼等级: item?.StrengthLevel,
        id: 装备原始数据?.id,
        装备部位: 装备数据位置映射,
        镶嵌孔数组: 装备原始数据.镶嵌孔数组.map((a, index) => {
          return {
            ...a,
            镶嵌宝石等级: +item?.FiveStone?.[index]?.Level || 8,
          }
        }),
        附魔: fumoType && fumoValue ? `${fumoType}+${fumoValue}` : '',
      }
    } else {
      msg = '存在装备未识别'
    }

    // 判断大附魔
    if (DaFuMoMap[item] && !!item?.WTemporaryEnchant) {
      equip[DaFuMoMap[item]] = 1
    }

    if (item.type === '万灵' && item?.WTemporaryEnchant) {
      equip.wucaishi = item?.WTemporaryEnchant
    }

    if (item?.type === '戒指') {
      已经计算过一个戒指 = true
    }
  })
  // } catch (e) {
  // errorMsg = '获取方案异常'
  // }
  return {
    equip,
    msg,
    errorMsg: errorMsg ? (
      <span>
        <p>{errorMsg}</p>
        {/* <p>请联系计算器作者（QQ：372103645）并提供异常的配装ID</p> */}
      </span>
    ) : null,
  }
}

const DaFuMoMap = {
  帽子: '大附魔_伤帽',
  上衣: '大附魔_伤衣',
  腰带: '大附魔_伤腰',
  护臂: '大附魔_伤腕',
  鞋: '大附魔_伤鞋',
}

const EquipPositionMap = {
  帽子: '帽子_1',
  上衣: '衣服_2',
  腰带: '腰带_3',
  护臂: '护腕_4',
  裤子: '下装_5',
  鞋: '鞋子_6',
  项链: '项链_7',
  腰坠: '腰坠_8',
  戒指: '戒指_9',
  戒指_2: '戒指_10',
  万灵: '武器_12',
}

// 属性类型枚举（转化魔盒的属性类型为本地属性类型
const FumoMap = ['身法', '攻击', '加速', '破招', '会心', '破防', '破防', '无双', '武伤', '武伤']

// const XiangQianKOngMeiju = {
//   atAgilityBase: '身法',
//   atPhysicsAttackPowerBase: '攻击',
//   atSurplusValueBase: '破招',
//   atPhysicsCriticalStrike: '会心',
//   atPhysicsCriticalDamagePowerBase: '会效',
//   atPhysicsOvercomeBase: '破防',
//   atStrainBase: '无双',
//   atHasteBase: '加速',
// }

const EquipDataMap = {
  帽子: '帽子',
  上衣: '衣服',
  腰带: '腰带',
  护臂: '护腕',
  裤子: '下装',
  鞋: '鞋子',
  项链: '项链',
  腰坠: '腰坠',
  戒指: '戒指',
  万灵: '武器',
}
