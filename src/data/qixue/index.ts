import { QixueListDTO } from '@/@types/qixue'
import { CharacterFinalDTO } from '@/@types/character'
import {
  getMianBanGongJI,
  getShenfa,
  getShenfaJiachengHuixin,
} from '@/components/BasicSet/CharacterSet/util'

export const 身法加成奇穴 = '卢令'
export const 无视防御奇穴 = ''

export const 判断是否开启身法加成奇穴 = (data) => {
  return data?.some((item) => item === 身法加成奇穴)
}

export const 判断是否开启无视防御奇穴 = (data) => {
  return data?.some((item) => item === 无视防御奇穴)
}

export const 奇穴数据: QixueListDTO[] = [
  // 1
  {
    奇穴列表: [
      {
        奇穴名称: '彤弓',
        奇穴加成类型: '常驻',
        奇穴加成技能: ['劲风簇'],
        奇穴图片: 'https://icon.jx3box.com/icon/20314.png',
      },
      {
        奇穴名称: '素矰',
        奇穴加成类型: '常驻',
        奇穴加成技能: [
          '贯穿(DOT)·一',
          '贯穿(DOT)·二',
          '贯穿(DOT)·三',
          '贯穿(DOT)·四',
          '贯穿(DOT)·五',
          '贯穿(DOT)·六',
          '贯穿(DOT)·六·引爆',
        ],
        奇穴图片: 'https://icon.jx3box.com/icon/20313.png',
      },
      {
        奇穴名称: '争疾',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20312.png',
      },
    ],
  },
  // 2
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '棘矢',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20272.png',
      },
      {
        奇穴名称: '孰湖',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20271.png',
      },
      {
        奇穴名称: '弧旌',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20270.png',
      },
    ],
  },
  // 3
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '襄尺',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20287.png',
      },
      {
        奇穴名称: '冉遗',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20289.png',
      },
      {
        奇穴名称: '虹流',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20288.png',
      },
      {
        奇穴名称: '弋矰',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20286.png',
      },
    ],
  },
  // 4
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '长右',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20305.png',
      },
      {
        奇穴名称: '射革',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20306.png',
      },
      {
        奇穴名称: '蓄锐',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20307.png',
      },
      {
        奇穴名称: '沃焦',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20304.png',
      },
    ],
  },
  // 5
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '鹿蜀',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20311.png',
      },
      {
        奇穴名称: '镇祟',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20292.png',
      },
      {
        奇穴名称: '反曲',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20309.png',
      },
      {
        奇穴名称: '腾驾',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20310.png',
      },
    ],
  },
  // 6
  {
    奇穴列表: [
      {
        奇穴名称: '诸怀',
        奇穴加成类型: '常驻',
        奇穴加成技能: '通用',
        奇穴图片: 'https://icon.jx3box.com/icon/20281.png',
      },
      {
        奇穴名称: '片羽',
        // 是否不可编辑: true,
        奇穴加成类型: '无增益',
        奇穴图片: 'https://icon.jx3box.com/icon/20285.png',
      },
      {
        奇穴名称: '祓厄',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20308.png',
      },
      {
        奇穴名称: '桑柘',
        是否不可编辑: true,
        奇穴加成类型: '无增益',
        奇穴图片: 'https://icon.jx3box.com/icon/20280.png',
      },
    ],
  },
  // 7
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '于狩',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20284.png',
      },
      {
        奇穴名称: '九婴',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20283.png',
      },
      {
        奇穴名称: '上岩',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20282.png',
      },
      {
        奇穴名称: '同渡',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20285.png',
      },
    ],
  },
  // 8
  {
    奇穴列表: [
      {
        奇穴名称: '白矢',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20267.png',
      },
      {
        奇穴名称: '领胡',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20269.png',
      },
      {
        奇穴名称: '时祯',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20265.png',
      },
      {
        奇穴名称: '九乌',
        奇穴加成类型: '常驻',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20266.png',
      },
      {
        奇穴名称: '卢令',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20268.png',
      },
    ],
  },
  // 9
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '陆吾',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20274.png',
      },
      {
        奇穴名称: '畴野',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20277.png',
      },
      {
        奇穴名称: '兴游',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20275.png',
      },
      {
        奇穴名称: '托月',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20276.png',
      },
      {
        奇穴名称: '禳灾',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20279.png',
      },
    ],
  },
  // 10
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '佩弦',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20298.png',
      },
      {
        奇穴名称: '扶国',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20296.png',
      },
      {
        奇穴名称: '泑泽',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20301.png',
      },
      {
        奇穴名称: '从云隐月',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20297.png',
      },
      {
        奇穴名称: '涉野徒林',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20294.png',
      },
    ],
  },
  // 11
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '命俦',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20302.png',
      },
      {
        奇穴名称: '贯侯',
        奇穴加成技能: ['标鹄'],
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20299.png',
      },
      {
        奇穴名称: '风止',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20300.png',
      },
      {
        奇穴名称: '审固',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/20303.png',
      },
      {
        奇穴名称: '祛邪',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20295.png',
      },
    ],
  },
  // 12
  {
    是否不可编辑: true,
    奇穴列表: [
      {
        奇穴名称: '朱厌',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20293.png',
      },
      {
        奇穴名称: '祝灵',
        奇穴加成类型: '无增益',
        是否不可编辑: true,
        奇穴图片: 'https://icon.jx3box.com/icon/20290.png',
      },
      {
        奇穴名称: '星烨',
        奇穴加成类型: '部分数量加成',
        奇穴加成技能: ['劲风簇'],
        奇穴图片: 'https://icon.jx3box.com/icon/20278.png',
      },
      {
        奇穴名称: '朝仪万汇',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/19602.png',
      },
      {
        奇穴名称: '白虹贯日',
        奇穴加成类型: '常驻',
        奇穴图片: 'https://icon.jx3box.com/icon/19598.png',
      },
    ],
  },
]

export default 奇穴数据

// 奇穴名称枚举
export const QixueNameMap = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
]

// 判断身法奇穴加成后面板
export const 获取身法奇穴加成后面板 = (data: CharacterFinalDTO, openLuLing): CharacterFinalDTO => {
  if (openLuLing) {
    const 加成后面板身法 = getShenfa(data.身法, true)
    return {
      ...data,
      身法: 加成后面板身法,
      // 由于基础面板已经加过会心了，所以只计算增加的身法带来的会心加成
      会心值: getShenfaJiachengHuixin(data.会心值, 加成后面板身法 - data.身法),
      面板攻击: getMianBanGongJI(data.基础攻击, 加成后面板身法),
    }
  } else {
    return data
  }
}
