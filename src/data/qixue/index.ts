import { QixueListDTO } from '@/@types/qixue'
import QIXUEIMG_QIXUE from '../../assets/qixue/qixue.png'
import { CharacterFinalDTO } from '@/@types/character'
import {
  getMianBanGongJI,
  getShenfa,
  getShenfaJiachengHuixin,
} from '@/components/BasicSet/CharacterSet/util'

export const 身法加成奇穴 = '卢令'

export const 判断是否开启身法加成奇穴 = (data) => {
  return data?.some((item) => item === 身法加成奇穴)
}

export const 奇穴数据: QixueListDTO[] = [
  // 1
  {
    奇穴列表: [
      { 奇穴名称: '彤弓', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '素矰', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '争疾', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 2
  {
    奇穴列表: [
      { 奇穴名称: '棘矢', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '孰湖', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '弧旌', 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 3
  {
    奇穴列表: [
      { 奇穴名称: '襄尺', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '冉遗', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '虹流', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '弋矰', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 4
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '长右', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '射革', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '蓄锐', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '沃焦', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 5
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '鹿蜀', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '祓厄', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '反曲', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '腾驾', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 6
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '诸怀', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '灌羽', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '镇祟', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '桑柘', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 7
  {
    是否不可编辑: true,
    奇穴列表: [
      { 奇穴名称: '于狩', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '九婴', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '上岩', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '同渡', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 8
  {
    奇穴列表: [
      { 奇穴名称: '白矢', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '领胡', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '时祯', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '九乌', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '卢令', 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 9
  {
    奇穴列表: [
      { 奇穴名称: '陆吾', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '畴野', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '兴游', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '托月', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '禳灾', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 10
  {
    奇穴列表: [
      { 奇穴名称: '佩弦', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '扶国', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '泑泽', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '从云隐月', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '涉野徒林', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 11
  {
    奇穴列表: [
      { 奇穴名称: '命俦', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '贯侯', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '风止', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '审固', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '祛邪', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
    ],
  },
  // 12
  {
    奇穴列表: [
      { 奇穴名称: '朱厌', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '祝灵', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '星烨', 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '朝仪万汇', 是否不可编辑: true, 奇穴图片: QIXUEIMG_QIXUE },
      { 奇穴名称: '白虹贯日', 奇穴图片: QIXUEIMG_QIXUE },
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
