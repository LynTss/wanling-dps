import { MijiSelectedData } from '@/@types/miji'

export const DEFAULT_CHARACTER = {
  面板攻击: 0,
  破防值: 0,
  无双值: 0,
  会心值: 0,
  会心效果值: 0,
  武器伤害_最小值: 0,
  武器伤害_最大值: 0,
  破招值: 0,
}

export const ZENGYI_DATA_DEFAULT = {
  阵眼: '万灵阵',
  小吃: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    '断浪·上品亢龙散（外攻）',
    '断浪·上品轻身丹（身法）',
    '断浪·太后饼（外攻）',
    '断浪·杂锦鱼球粥（身法）',
    '断浪·瀑沙熔锭（外攻）',
    '汾酒·旬又三（身法）',
    '葫芦叫花鸡（外攻）',
    '断浪·玉笛谁家听落梅',
  ],
  团队增益: [
    { 增益名称: '同泽宴', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '蒸鱼菜盘', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '袖气', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '梅花三弄', 启用: true, 层数: 100, 覆盖率: 75 },
    { 增益名称: '左旋', 启用: true, 层数: 100, 覆盖率: 100 },
    { 增益名称: '振奋', 启用: true, 层数: 75, 覆盖率: 100 },
    { 增益名称: '朝圣言', 启用: true, 层数: 24, 覆盖率: 7 },
    { 增益名称: '寒啸千军', 启用: true, 层数: 1, 覆盖率: 50 },
    { 增益名称: '劲风破风', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '撼如雷', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '飘黄', 启用: true, 层数: 1, 覆盖率: 16 },
    { 增益名称: '秋肃', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '虚弱', 启用: false, 层数: 1, 覆盖率: 100 },
    { 增益名称: '仙王蛊鼎', 启用: true, 层数: 1, 覆盖率: 21 },
    { 增益名称: '号令三军', 启用: true, 层数: 48, 覆盖率: 20 },
    { 增益名称: '弘法', 启用: true, 层数: 36, 覆盖率: 50 },
    { 增益名称: '水煮鱼炼', 启用: true, 层数: 1, 覆盖率: 100 },
    { 增益名称: '戒火斩', 启用: false, 层数: 1, 覆盖率: 100 },
    { 增益名称: '乘龙箭', 启用: true, 层数: 1, 覆盖率: 33 },
  ],
}

export const DEFAULT_EQUIPMENT = {
  wucaishi: '彩·瞬影·斩铁·锐刃(陆)',
  大附魔_伤帽: 0,
  大附魔_伤衣: 0,
  大附魔_伤腰: 0,
  大附魔_伤腕: 0,
  大附魔_伤鞋: 0,
  equipments: [
    {
      镶嵌孔数组: [
        { 镶嵌类型: '身法', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '破防', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 90666,
      装备部位: '帽子',
      附魔: '攻击+398',
    },
    {
      镶嵌孔数组: [
        { 镶嵌类型: '身法', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '会心', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 90564,
      装备部位: '衣服',
      附魔: '无双+240',
    },
    {
      镶嵌孔数组: [
        { 镶嵌类型: '无双', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '会心', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 90372,
      装备部位: '腰带',
      附魔: '无双+240',
    },
    {
      镶嵌孔数组: [
        { 镶嵌类型: '无双', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '身法', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 90402,
      装备部位: '护腕',
      附魔: '身法+198',
    },
    {
      镶嵌孔数组: [
        { 镶嵌类型: '攻击', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '会心', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 90552,
      装备部位: '下装',
      附魔: '身法+198',
    },
    {
      镶嵌孔数组: [
        { 镶嵌类型: '身法', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '无双', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 90546,
      装备部位: '鞋子',
      附魔: '攻击+398',
    },
    {
      镶嵌孔数组: [{ 镶嵌类型: '无双', 镶嵌宝石等级: 8 }],
      当前精炼等级: 6,
      id: 34118,
      装备部位: '项链',
    },
    {
      镶嵌孔数组: [{ 镶嵌类型: '无双', 镶嵌宝石等级: 8 }],
      当前精炼等级: 6,
      id: 34124,
      装备部位: '腰坠',
    },
    { 当前精炼等级: 6, id: 34220, 装备部位: '戒指', 附魔: '攻击+398', 镶嵌孔数组: [] },
    { 当前精炼等级: 6, id: 34274, 装备部位: '戒指', 附魔: '攻击+398', 镶嵌孔数组: [] },
    {
      镶嵌孔数组: [{ 镶嵌类型: '攻击', 镶嵌宝石等级: 8 }],
      当前精炼等级: 6,
      id: 32457,
      装备部位: '暗器',
      附魔: '加速+883',
    },
    {
      镶嵌孔数组: [
        { 镶嵌类型: '攻击', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '身法', 镶嵌宝石等级: 8 },
        { 镶嵌类型: '破防', 镶嵌宝石等级: 8 },
      ],
      当前精炼等级: 6,
      id: 36647,
      装备部位: '武器',
      附魔: '攻击+398',
    },
  ],
  套装会心会效: false,
  水特效武器: false,
  水特效武器_2: false,
  龙门武器: false,
  风特效腰坠: false,
  风特效腰坠_2: false,
  套装技能: 0,
  切糕会心: 0,
  切糕会心_2: 0,
  切糕无双: 0,
  切糕无双_2: 0,
  冬至套装: false,
  大橙武特效: false,
  小橙武特效: false,
}

export const DEFAULT_MIJI_SELECTED_DATA: MijiSelectedData[] = [
  {
    技能名称: '劲风簇',
    技能已选秘籍: ['3%伤害', '2%伤害', '3%会心', '4%会心'],
  },
  {
    技能名称: '饮羽簇',
    技能已选秘籍: ['15非侠'],
  },
]

// 默认奇穴
export const DEFAULT_QIXUE_VALUE = [
  '素矰',
  '棘矢',
  '襄尺',
  '长右',
  '鹿蜀',
  '诸怀',
  '于狩',
  '九乌',
  '托月',
  '佩弦',
  '审固',
  '朱厌',
]

// 默认起手
export const DEFAULT_START_TYPE = 'normal'
