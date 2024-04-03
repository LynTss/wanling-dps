import { Buff枚举, CycleSimulatorSkillDTO, 日志类型 } from '../simulator/type'
import { 基础GCD帧, 每秒郭氏帧 } from '.'

// 技能图标引入
import yinfenghuanling from '../assets/Skill/yinfenghuanling.png'
import chilvzhaoye from '../assets/Skill/chilvzhaoye.png'
import jinfengcu from '../assets/Skill/jinfengcu.png'
import yinyucu from '../assets/Skill/yinyucu.png'
import baiyuliuxing from '../assets/Skill/baiyuliuxing.png'
import chaoyiwanhui from '../assets/Skill/chaoyiwanhui.png'
import hangengxiaojian from '../assets/Skill/hangengxiaojian.png'
import jinwujianzhui from '../assets/Skill/jinwujianzhui.png'
import zhuangshengxiaomeng from '../assets/Skill/zhuangshengxiaomeng.png'
// Buff图标引入
import guanchuan from '../assets/Buff/guanchuan.png'
import biaohu from '../assets/Buff/biaohu.png'
import chengqi from '../assets/Buff/chengqi.png'
import peixian from '../assets/Buff/peixian.png'
// 宠物图标引入

import daxiang from '../assets/Chongwu/daxiang.png'
import lang from '../assets/Chongwu/lang.png'
import shizi from '../assets/Chongwu/shizi.png'
import xiong from '../assets/Chongwu/xiong.png'
import yezhu from '../assets/Chongwu/yezhu.png'
import ying from '../assets/Chongwu/ying.png'

const 循环模拟技能基础数据: CycleSimulatorSkillDTO[] = [
  {
    技能名称: '引风唤灵',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * (23 - 3), // 原CD23，秘籍3本减3
    技能GCD组: '公共',
    技能类型: '宠物',
    图标: yinfenghuanling,
    技能原始名称: '引风唤灵',
  },
  {
    技能名称: '弛律召野',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * 50, // 点领胡-10秒，点朱厌+20秒
    技能GCD组: '公共',
    技能类型: '宠物',
    图标: chilvzhaoye,
    技能原始名称: '弛律召野',
  },
  {
    技能名称: '劲风簇',
    技能释放后添加GCD: 基础GCD帧 - 8, // 劲风簇减0.5秒调息
    技能GCD组: '公共',
    技能类型: '箭系',
    消耗箭数: 1,
    图标: jinfengcu,
    技能原始名称: '劲风簇',
  },
  {
    技能名称: '饮羽簇',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * 8,
    技能GCD组: '公共',
    技能类型: '箭系',
    消耗箭数: 1,
    图标: yinyucu,
    技能原始名称: '饮羽簇',
  },
  {
    技能名称: '白羽流星',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * 5,
    技能GCD组: '公共',
    技能类型: '箭系',
    // 消耗箭数: 3,
    图标: baiyuliuxing,
    技能原始名称: '白羽流星',
  },
  {
    技能名称: '朝仪万汇',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * 40,
    技能GCD组: '公共',
    技能类型: '箭系',
    图标: chaoyiwanhui,
    技能原始名称: '朝仪万汇',
  },
  {
    技能名称: '金乌见坠',
    技能释放后添加GCD: 8, // 金乌有0.5秒保护GCD
    技能CD: 每秒郭氏帧 * 15,
    最大充能层数: 1,
    技能GCD组: '自身',
    技能类型: '其他',
    图标: jinwujianzhui,
    技能原始名称: '金乌见坠',
  },
  {
    技能名称: '寒更晓箭',
    技能释放后添加GCD: 基础GCD帧 - 8, // 寒更晓箭减0.5秒调息，逻辑同劲风簇
    技能GCD组: '公共',
    技能类型: '其他',
    图标: hangengxiaojian,
    技能原始名称: '寒更晓箭',
  },
  {
    技能名称: '丛云隐月',
    技能释放后添加GCD: 基础GCD帧,
    技能CD: 每秒郭氏帧 * 18,
    技能GCD组: '公共',
    技能类型: '其他',
    显示类型: '奇穴技能',
    图标: 'https://icon.jx3box.com/icon/20297.png',
    技能原始名称: '丛云隐月',
  },
  {
    技能名称: '触发橙武',
    技能释放后添加GCD: 0,
    技能CD: 每秒郭氏帧 * 30,
    技能GCD组: '自身',
    技能类型: '其他',
    显示类型: '大橙武模拟',
    图标: zhuangshengxiaomeng,
  },
]

export default 循环模拟技能基础数据

export const 日志类型数组: 日志类型[] = [
  '释放技能',
  '自身buff变动',
  '目标buff变动',
  '造成伤害',
  '技能释放结果',
  '等CD',
  '消耗箭',
  '上贯穿',
  '棘矢引爆贯穿',
  '于狩引爆贯穿',
  '宠物进入场地',
  '宠物离开场地',
  '循环异常',
]

export enum 技能GCD组 {
  公共,
  自身,
  换箭,
}

// Map预备数据
export const 原始Buff数据: Buff枚举 = {
  // Buff
  标鹄: {
    名称: '标鹄',
    最大层数: 4,
    最大持续时间: 每秒郭氏帧 * 10,
    图标: biaohu,
    备注: '4层时再次添加标鹄将引爆并造成伤害',
  },
  劲风簇追: {
    名称: '劲风簇追',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 3, // GCD结束以后buff才上，这里省事写 2 + 1
    图标: jinfengcu,
    备注: '此时释放白羽流星为释放驰风鸣角',
  },
  饮羽簇追: {
    名称: '饮羽簇追',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 3.5, // GCD结束以后buff才上，这里省事写 2 + 1.5
    图标: yinyucu,
    备注: '此时释放白羽流星为释放没石饮羽',
  },
  佩弦: {
    名称: '佩弦',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 10,
    图标: peixian,
    备注: '施展金乌见坠后下一次饮羽簇无需运功',
  },
  承契: {
    名称: '承契',
    最大层数: 5,
    最大持续时间: 每秒郭氏帧 * 18,
    图标: chengqi,
    备注: '承契每层使造成伤害提高6%，仇恨值降低8%',
  },
  橙武: {
    名称: '橙武',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 8,
    图标: zhuangshengxiaomeng,
    备注: '“饮羽簇”无需运功且无调息，“饮羽簇”造成伤害时对目标造成一次额外伤害',
  },
  苍梧引灵阵五重: {
    名称: '苍梧引灵阵五重',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 6,
    图标: 'https://icon.jx3box.com/icon/19614.png',
    备注: '每次阵眼施展“白羽流星”强化招式时，使小队成员会心效果提高15%，持续6秒。',
  },
  丛云隐月: {
    名称: '丛云隐月',
    最大层数: 1,
    最大持续时间: 每秒郭氏帧 * 10,
    图标: 'https://icon.jx3box.com/icon/20297.png',
    备注: '招式内力小号降低80%，“白羽流星”无调息时间',
  },
  // DOT
  贯穿: {
    名称: '贯穿',
    最大层数: 6,
    最大作用次数: 4,
    最大持续时间: 每秒郭氏帧 * 2,
    伤害频率: 8,
    是否吃加速: false, // 贯穿不吃加速 魔盒显示最小和最大作用间隔都为8 https://www.jx3box.com/app/database/?type=buff&query=26856&level=1
    图标: guanchuan,
    备注: '每0.5秒造成一次伤害，最大可叠加六层',
  },
}

export const 宠物基础数据 = {
  虎: {
    宠物: '虎',
    释放后攻击时间: 16,
    释放后退场时间: 61,
    图标: shizi,
  },
  鹰: {
    宠物: '鹰',
    释放后攻击时间: 16,
    释放后退场时间: 49,
    图标: ying,
  },
  猪: {
    宠物: '猪',
    释放后攻击时间: 16,
    释放后退场时间: 61,
    图标: yezhu,
  },
  象: {
    宠物: '象',
    释放后攻击时间: 16,
    释放后退场时间: 80,
    图标: daxiang,
  },
  熊: {
    宠物: '熊',
    释放后攻击时间: 16,
    释放后退场时间: 91,
    图标: xiong,
  },
  狼: {
    宠物: '狼',
    释放后攻击时间: 16,
    释放后退场时间: 57,
    宠物攻击次数: 3,
    宠物攻击频率: 5, // 不准确，不影响buff计算
    图标: lang,
  },
}
