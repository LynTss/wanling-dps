import commonGainDTO from '@/数据/技能增益/common'
import { SkillBasicDTO } from '@/@types/skill'
import { 增益计算类型枚举, 增益类型枚举 } from '@/@types/enum'
import 贯穿GainDTO from './技能增益/贯穿'
import 劲风簇GainDTO from './技能增益/劲风簇'
import 标鹄GainDTO from './技能增益/标鹄'
import 饮羽簇GainDTO from './技能增益/饮羽簇'
import 宠物GainDTO from './技能增益/宠物通用'
import 风矢增益数据 from './技能增益/风矢'

const 外攻基础系数 = 16 * 10

// 获取实际系数
const 获取实际系数 = (系数, dot跳数?, dot间隔?) => {
  if (dot跳数 && dot间隔) {
    return Math.max(
      (Math.floor(系数) * Math.max(Math.floor((dot跳数 * dot间隔) / 12), 16)) /
        dot跳数 /
        16 /
        外攻基础系数,
      0.0625
    )
  }

  return Math.floor(系数) / 外攻基础系数
}

// const 贯穿伤害系数 = (215 * 0.7 * 1.15 * 0.9) / 160 / 4
const 贯穿伤害系数 = 获取实际系数(215 * 0.7 * 1.15 * 0.9 * 0.9 * 0.9, 4, 8)

const 贯穿基础伤害 = 32
const 破招全局系数 = 13.1925

const WanlingSkillDataDTO: SkillBasicDTO[] = [
  {
    技能名称: '标鹄',
    技能伤害系数: 获取实际系数(512 * 1.15 * 0.9 * 0.95),
    技能基础伤害_最小值: 30,
    技能基础伤害_最大值: 50,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 标鹄GainDTO,
  },
  {
    技能名称: '劲风簇',
    技能伤害系数: 获取实际系数(175 * 0.9 * 0.9 * 0.95),
    技能基础伤害_最小值: 333,
    技能基础伤害_最大值: 338,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: 劲风簇GainDTO,
  },
  {
    技能名称: '饮羽簇',
    技能伤害系数: 获取实际系数(552 * 0.9 * 0.9 * 0.95 * 0.9 * 0.95),
    技能基础伤害_最小值: 732,
    技能基础伤害_最大值: 742,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: 饮羽簇GainDTO,
  },
  {
    技能名称: '霖急簇',
    技能伤害系数: 获取实际系数(160 * 1.1),
    技能基础伤害_最小值: 28,
    技能基础伤害_最大值: 33,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '风矢',
    技能伤害系数: 获取实际系数(160 * 0.1),
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 1,
    伤害计算次数: 1,
    技能增益列表: 风矢增益数据,
  },
  {
    技能名称: '攻击-狼',
    技能伤害系数: 获取实际系数(276 * 1.05),
    技能基础伤害_最小值: 90,
    技能基础伤害_最大值: 110,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 宠物GainDTO,
    宠物伤害: true,
  },
  {
    技能名称: '攻击-虎',
    技能伤害系数: 获取实际系数(828 * 1.05),
    技能基础伤害_最小值: 270,
    技能基础伤害_最大值: 330,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 宠物GainDTO,
    宠物伤害: true,
  },
  {
    技能名称: '攻击-鹰',
    技能伤害系数: 获取实际系数(607 * 1.05),
    技能基础伤害_最小值: 200,
    技能基础伤害_最大值: 240,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 宠物GainDTO,
    宠物伤害: true,
  },
  {
    技能名称: '攻击-熊',
    技能伤害系数: 获取实际系数(165 * 1.05),
    技能基础伤害_最小值: 50,
    技能基础伤害_最大值: 70,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 宠物GainDTO,
    宠物伤害: true,
  },
  {
    技能名称: '重击', // 野猪
    技能伤害系数: 获取实际系数(276 * 1.05),
    技能基础伤害_最小值: 90,
    技能基础伤害_最大值: 110,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 宠物GainDTO,
    宠物伤害: true,
  },
  {
    技能名称: '践踏', // 大象
    技能伤害系数: 获取实际系数(607 * 1.05),
    技能基础伤害_最小值: 200,
    技能基础伤害_最大值: 240,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 宠物GainDTO,
    宠物伤害: true,
  },
  {
    技能名称: '贯穿·1',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·2',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 2,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·3',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 3,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·4',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 4,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·5',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 5,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·6',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 6,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·8',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 4 * 2,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·9',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 3 * 3,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·10',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 5 * 2,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·12',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 4 * 3,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·15',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 5 * 3,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '贯穿·18',
    技能伤害系数: 贯穿伤害系数,
    技能基础伤害_最小值: 贯穿基础伤害,
    技能基础伤害_最大值: 贯穿基础伤害,
    武器伤害系数: 0,
    伤害计算次数: 6 * 3,
    技能增益列表: 贯穿GainDTO,
  },
  {
    技能名称: '白虹贯日',
    技能伤害系数: 7.25,
    技能基础伤害_最小值: 400,
    技能基础伤害_最大值: 600,
    武器伤害系数: 2,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '朝仪万汇',
    // 技能伤害系数: 1.34375,
    技能伤害系数: 获取实际系数(215),
    技能基础伤害_最小值: 37,
    技能基础伤害_最大值: 42,
    // 武器伤害系数: 1, // 应该是有的
    武器伤害系数: 0, // 实测没有
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '破',
    // 技能伤害系数: 13.1925 * 0.48 * 1.05,
    技能伤害系数: 破招全局系数 * 0.3,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '逐云寒蕊',
    技能伤害系数: 1.274,
    技能基础伤害_最小值: 0,
    技能基础伤害_最大值: 0,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: [
      ...commonGainDTO,
      {
        增益名称: '飘黄',
        增益所在位置: '套装',
        常驻增益: true,
        增益集合: [
          {
            增益类型: 增益类型枚举.郭氏无视防御,
            增益计算类型: 增益计算类型枚举.A,
            增益数值: 1024,
          },
        ],
      },
    ],
  },
  {
    // 伤腕
    技能名称: '昆吾·弦刃',
    技能伤害系数: 获取实际系数(75),
    技能基础伤害_最小值: 40,
    技能基础伤害_最大值: 57,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    // 伤鞋
    技能名称: '刃凌',
    技能伤害系数: 获取实际系数(60),
    技能基础伤害_最小值: 40,
    技能基础伤害_最大值: 57,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    // 龙门武器
    技能名称: '剑风',
    技能伤害系数: 0,
    技能基础伤害_最小值: 3950,
    技能基础伤害_最大值: 3950,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  {
    技能名称: '劲风簇·神兵',
    技能伤害系数: 获取实际系数(60),
    技能基础伤害_最小值: 20,
    技能基础伤害_最大值: 22,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
  // CW期间饮羽命中后施加的额外伤害
  {
    技能名称: '月弦激星',
    技能伤害系数: 获取实际系数(390),
    技能基础伤害_最小值: 20,
    技能基础伤害_最大值: 22,
    武器伤害系数: 0,
    伤害计算次数: 1,
    技能增益列表: commonGainDTO,
  },
]

export default WanlingSkillDataDTO
