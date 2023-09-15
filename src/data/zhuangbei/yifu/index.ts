import { EquipmentInlayEnum, EquipmentTypeEnum, GainTypeEnum } from '@/@types/enum'
import { EquipmentDTO } from './../../../@types/equipment'

const ZHUANGBEI_YIFU: EquipmentDTO[] = [
  {
    id: 94360,
    uid: '207876',
    装备名称: '濯心·寂青衣',
    装备品级: 12300,
    装备类型: EquipmentTypeEnum.门派套装,
    装备增益: [
      { 增益数值: 4429, 增益类型: GainTypeEnum.体质 },
      { 增益数值: 859, 增益类型: GainTypeEnum.身法 },
      { 增益数值: 1393, 增益类型: GainTypeEnum.基础攻击 },
      { 增益数值: 4309, 增益类型: GainTypeEnum.外攻会心等级 },
      { 增益数值: 3831, 增益类型: GainTypeEnum.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.会心 }, { 镶嵌类型: EquipmentInlayEnum.会效 }],
  },
  {
    id: 94398,
    uid: '207914',
    装备名称: '商野衫',
    装备品级: 12450,
    装备类型: EquipmentTypeEnum.普通,
    装备增益: [
      { 增益数值: 4483, 增益类型: GainTypeEnum.体质 },
      { 增益数值: 869, 增益类型: GainTypeEnum.身法 },
      { 增益数值: 1410, 增益类型: GainTypeEnum.基础攻击 },
      { 增益数值: 4362, 增益类型: GainTypeEnum.外攻破防等级 },
      { 增益数值: 3877, 增益类型: GainTypeEnum.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.身法 }, { 镶嵌类型: EquipmentInlayEnum.会心 }],
  },
  {
    id: 94434,
    uid: '207974',
    装备名称: '染辞衣',
    装备品级: 12450,
    装备类型: EquipmentTypeEnum.普通,
    装备增益: [
      { 增益数值: 4483, 增益类型: GainTypeEnum.体质 },
      { 增益数值: 869, 增益类型: GainTypeEnum.身法 },
      { 增益数值: 1410, 增益类型: GainTypeEnum.基础攻击 },
      { 增益数值: 4362, 增益类型: GainTypeEnum.外攻会心等级 },
      { 增益数值: 3877, 增益类型: GainTypeEnum.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.攻击 }, { 镶嵌类型: EquipmentInlayEnum.会心 }],
  },
  {
    id: 94596,
    uid: '208362',
    装备名称: '湖月衣',
    装备品级: 12450,
    装备类型: EquipmentTypeEnum.普通,
    装备增益: [
      { 增益数值: 4483, 增益类型: GainTypeEnum.体质 },
      { 增益数值: 869, 增益类型: GainTypeEnum.身法 },
      { 增益数值: 1410, 增益类型: GainTypeEnum.基础攻击 },
      { 增益数值: 4362, 增益类型: GainTypeEnum.外攻会心等级 },
      { 增益数值: 3877, 增益类型: GainTypeEnum.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.会心 }, { 镶嵌类型: EquipmentInlayEnum.会效 }],
  },
  {
    id: 94494,
    uid: '208188',
    装备名称: '雪漫衣',
    装备品级: 12600,
    装备类型: EquipmentTypeEnum.切糕,
    装备增益: [
      { 增益数值: 4537, 增益类型: GainTypeEnum.体质 },
      { 增益数值: 880, 增益类型: GainTypeEnum.身法 },
      { 增益数值: 1427, 增益类型: GainTypeEnum.基础攻击 },
      { 增益数值: 4415, 增益类型: GainTypeEnum.外攻破防等级 },
      { 增益数值: 3924, 增益类型: GainTypeEnum.无双等级 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.身法 }, { 镶嵌类型: EquipmentInlayEnum.会心 }],
  },
  {
    id: 999999_2,
    uid: '999999_2',
    装备名称: '体服12850PVP',
    装备品级: 12850,
    装备类型: EquipmentTypeEnum.普通,
    装备增益: [
      { 增益数值: 4627, 增益类型: GainTypeEnum.体质 },
      { 增益数值: 897, 增益类型: GainTypeEnum.身法 },
      { 增益数值: 1456, 增益类型: GainTypeEnum.基础攻击 },
      { 增益数值: 4502, 增益类型: GainTypeEnum.外攻破防等级 },
      // { 增益数值: 2001, 增益类型: GainTypeEnum.破招 },
    ],
    镶嵌孔数组: [{ 镶嵌类型: EquipmentInlayEnum.身法 }],
  },
]

export default ZHUANGBEI_YIFU
