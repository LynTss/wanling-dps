import { EnchantDTO } from '@/@types/enchant'
import {
  EnchantNameEnum,
  EquipmentPositionEnum,
  GainDpsTypeEnum,
  GainTypeEnum,
} from '@/@types/enum'

// 用于装备上的所有附魔
export const ShenfaEnchantDTO: EnchantDTO[] = [
  {
    附魔名称: EnchantNameEnum.身法110,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.身法, 增益数值: 110 }],
  },
  {
    附魔名称: EnchantNameEnum.身法162,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.身法, 增益数值: 162 }],
  },
  {
    附魔名称: EnchantNameEnum.身法179,
    附魔支持部位: [
      EquipmentPositionEnum.护腕,
      EquipmentPositionEnum.下装,
      EquipmentPositionEnum.戒指,
      EquipmentPositionEnum.暗器,
    ],
    增益集合: [{ 增益计算类型: GainDpsTypeEnum.A, 增益类型: GainTypeEnum.身法, 增益数值: 179 }],
  },
]
