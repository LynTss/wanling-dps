import { EnchantDTO } from '@/@types/enchant'
import { 附魔名称枚举, 装备部位枚举, 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'

// 用于装备上的所有附魔
export const ShenfaEnchantDTO: EnchantDTO[] = [
  {
    附魔名称: 附魔名称枚举.身法110,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.戒指, 装备部位枚举.暗器],
    增益集合: [{ 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.身法, 增益数值: 110 }],
  },
  {
    附魔名称: 附魔名称枚举.身法162,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.戒指, 装备部位枚举.暗器],
    增益集合: [{ 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.身法, 增益数值: 162 }],
  },
  {
    附魔名称: 附魔名称枚举.身法179,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.戒指, 装备部位枚举.暗器],
    增益集合: [{ 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.身法, 增益数值: 179 }],
  },
  {
    附魔名称: 附魔名称枚举.身法198,
    附魔支持部位: [装备部位枚举.护腕, 装备部位枚举.下装, 装备部位枚举.戒指, 装备部位枚举.暗器],
    增益集合: [{ 增益计算类型: 增益计算类型枚举.A, 增益类型: 增益类型枚举.身法, 增益数值: 198 }],
  },
]
