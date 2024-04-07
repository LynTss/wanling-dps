import { CharacterBasicDTO, CharacterFinalDTO, FinalCharterBasicDataDTO } from '@/@types/character'
import { WuCaiShiDTO } from '@/@types/enchant'
import { 增益类型枚举 } from '@/@types/enum'
import { 装备信息数据类型, EquipmentListDTO } from '@/@types/equipment'
import { 加成系数 } from '@/数据/常量'
import { AllEnchantDTO } from '@/数据/附魔'
import WUCAISHI_DATA from '@/数据/五彩石'
import XIANGQIAN_DATA from '@/数据/镶嵌孔'
import ZUANGBEI_DATA from '@/数据/装备'
import { jinglianJieguo } from '@/utils/help'

export const getFinalCharacterBasicData = (data: CharacterBasicDTO): CharacterFinalDTO => {
  return {
    ...data,
    面板攻击: getMianBanGongJI(data?.基础攻击, data?.身法),
  }
}

export const 卢令身法加成 = (身法, 卢令, 额外郭氏身法 = 0) => {
  return 卢令 ? 身法 + Math.floor((身法 * (102 + 额外郭氏身法 || 0)) / 1024) : 身法
}

// export const getJiChuGongJI = (基础攻击, 面板身法) => {
//   const 身法加成基础攻击 = Math.round(面板身法 * 加成系数.身法加成基础攻击)
//   return 基础攻击 + 身法加成基础攻击
// }

export const getMianBanGongJI = (基础攻击, 面板身法) => {
  const 身法加成面板攻击 = Math.round(面板身法 * 加成系数.身法加成面板攻击)
  return 基础攻击 + 身法加成面板攻击
}

export const getShenfaJiachengHuixin = (会心值, 面板身法) => {
  return (会心值 || 0) + Math.round(面板身法 * 加成系数.身法加成会心)
}

// export const getShenfaJiachengPofang = (破防值, 面板身法) => {
//   return (破防值 || 0) + Math.round(面板身法 * 加成系数.身法加成破防)
// }

export const getFinalCharacterBasicDataByEquipment = (
  data: 装备信息数据类型
): FinalCharterBasicDataDTO => {
  let basicDTO: CharacterBasicDTO = {
    等级: 120,
    基础攻击: 3277 + 7, // 心法基础3277攻击+基础41点力道增加6点攻击
    破防值: 12, // 基础41力道增加12点破防
    无双值: 0,
    身法: 41,
    体质: 41,
    加速值: 0,
    破招值: 0,
    武器伤害_最小值: 0,
    武器伤害_最大值: 0,
    会心值: 2929, // 心法基础2929+基础41点身法增加26会心
    会心效果值: 0,
  }
  Object.keys(data).map((item) => {
    if (item === '五彩石') {
      const 五彩石 = WUCAISHI_DATA[5]
        .concat(WUCAISHI_DATA[6])
        .find((a) => a.五彩石名称 === data[item])
      if (五彩石) {
        basicDTO = switchWuCaiShi(五彩石, basicDTO)
      }
    } else if (
      [
        '套装会心会效',
        '水特效武器',
        '水特效武器_英雄',
        '龙门武器',
        '大橙武特效',
        '小橙武特效',
        '风特效腰坠',
        '风特效腰坠_英雄',
        '套装技能',
        '切糕会心',
        '切糕无双',
        '切糕会心_英雄',
        '切糕无双_英雄',
        '冬至套装',
        '大附魔_伤帽',
        '大附魔_伤衣',
        '大附魔_伤腰',
        '大附魔_伤腕',
        '大附魔_伤鞋',
      ].includes(item)
    ) {
      basicDTO = { ...basicDTO }
    } else {
      basicDTO = switchZhuangbei(data[item], basicDTO)
    }
  })

  basicDTO.会心值 = getShenfaJiachengHuixin(basicDTO.会心值, basicDTO.身法)
  const finalData = getFinalCharacterBasicData(basicDTO)

  return { basicData: basicDTO, finalData }
}

// 计算五彩石属性
export const switchWuCaiShi = (data: WuCaiShiDTO, info: CharacterBasicDTO): CharacterBasicDTO => {
  let newObj: CharacterBasicDTO = { ...info }
  ;(data.装备增益 || []).forEach((item) => {
    newObj = switchData(item.增益类型, item.增益数值, newObj)
  })
  return newObj
}

// 计算五彩石属性
export const switchZhuangbei = (
  data: EquipmentListDTO[],
  info: CharacterBasicDTO
): CharacterBasicDTO => {
  let newObj: CharacterBasicDTO = { ...info }
  data.forEach((a) => {
    const zhuangbei = ZUANGBEI_DATA[a?.装备部位]?.find((b) => b.id === a.id)
    if (zhuangbei) {
      if (zhuangbei?.武器伤害_最大值 && zhuangbei.武器伤害_最小值) {
        newObj.武器伤害_最小值 += zhuangbei.武器伤害_最小值
        newObj.武器伤害_最大值 += zhuangbei.武器伤害_最大值
      }
      zhuangbei.装备增益.forEach((item) => {
        const shuzhi = jinglianJieguo(item.增益数值, a.当前精炼等级)
        newObj = switchData(item.增益类型, shuzhi, newObj)
      })
      a.镶嵌孔数组?.forEach((item) => {
        const 镶嵌孔 = XIANGQIAN_DATA.find((b) => item.镶嵌类型 === b.镶嵌类型)
        if (镶嵌孔) {
          const shuju = 镶嵌孔.各等级增益数据[item.镶嵌宝石等级 || 1]?.增益数值
          newObj = switchData(镶嵌孔?.镶嵌增益类型, shuju, newObj)
        }
      })
      if (a?.附魔) {
        const 附魔 = AllEnchantDTO.find((b) => b.附魔名称 === a?.附魔)
        if (附魔) {
          附魔.增益集合?.forEach((d) => {
            newObj = switchData(d.增益类型, d.增益数值, newObj)
          })
        }
      }
    }
  })
  return newObj
}

const switchData = (
  增益类型: 增益类型枚举,
  数值: number,
  原始属性: CharacterBasicDTO
): CharacterBasicDTO => {
  const newObj: CharacterBasicDTO = { ...原始属性 }
  switch (增益类型) {
    case 增益类型枚举.身法:
      newObj.身法 += 数值
      break
    case 增益类型枚举.体质:
      newObj.体质 += 数值
      break
    case 增益类型枚举.加速:
      newObj.加速值 += 数值
      break
    case 增益类型枚举.基础攻击:
      newObj.基础攻击 += 数值
      break
    case 增益类型枚举.外攻会心等级:
      newObj.会心值 += 数值
      break
    case 增益类型枚举.外攻会心效果等级:
      newObj.会心效果值 += 数值
      break
    case 增益类型枚举.外攻破防等级:
      newObj.破防值 += 数值
      break
    case 增益类型枚举.近战武器伤害:
      newObj.武器伤害_最小值 += 数值
      newObj.武器伤害_最大值 += 数值
      break
    case 增益类型枚举.破招:
      newObj.破招值 += 数值
      break
    case 增益类型枚举.无双等级:
      newObj.无双值 += 数值
      break
    default:
      console.error('存在未计算属性值')
      break
  }
  return newObj
}
