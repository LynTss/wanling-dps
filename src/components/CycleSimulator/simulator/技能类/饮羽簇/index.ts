import { 每秒郭氏帧 } from '@/components/CycleSimulator/constant'
import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 待生效事件 } from '../../type'
import { 根据加速等级获取虚拟加速值 } from '../../utils'
import { 获取实际帧数 } from '@/components/BasicSet/CommonSet/CycleSimulator/simulator'

class 饮羽簇 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '饮羽簇')
  static 读条时间 = 每秒郭氏帧 * 2
  static 本次释放是否读条 = true

  constructor(模拟循环) {
    super(模拟循环)

    // 根据加速修改实际读条帧
    const 循环加速值 = 根据加速等级获取虚拟加速值(this.模拟循环.加速等级)
    饮羽簇.读条时间 = 获取实际帧数(每秒郭氏帧 * 2, 循环加速值)

    this.初始化技能运行数据(饮羽簇.技能数据)
  }

  读条时间() {
    if (this.模拟循环.当前时间 === 0) {
      return 0
    }
    if (
      !this.模拟循环.当前自身buff列表?.['佩弦']?.当前层数 &&
      !this.模拟循环.当前自身buff列表?.['橙武']?.当前层数
    ) {
      return 饮羽簇.读条时间
    } else {
      return 0
    }
  }

  释放() {
    // 判断当前是否有佩弦buff，有则无需运功
    if (
      !this.模拟循环.当前自身buff列表?.['佩弦']?.当前层数 &&
      !this.模拟循环.当前自身buff列表?.['橙武']?.当前层数
    ) {
      饮羽簇.本次释放是否读条 = true
    } else {
      this.模拟循环.卸除buff({ 名称: '佩弦', 对象: '自身' })
      饮羽簇.本次释放是否读条 = false
    }
    // 释放饮羽充值白羽流星
    this.模拟循环.技能类实例集合.白羽流星.重置CD()
  }

  读条(读条开始时间) {
    this.读条饮羽簇(读条开始时间)
  }

  读条饮羽簇(读条开始时间) {
    const 待生效事件队列: 待生效事件[] = []
    待生效事件队列.push({
      事件名称: '技能读条',
      事件时间: 读条开始时间 + 饮羽簇.读条时间,
      事件备注: {
        技能名称: '饮羽簇',
      },
    })
    this.模拟循环.添加待生效事件队列(待生效事件队列)
  }

  饮羽簇造成伤害() {
    this.模拟循环.棘矢引爆贯穿判定('饮羽簇')
    this.模拟循环.金乌箭判定()
    this.模拟循环.标鹄判定()
    this.触发伤害行为('饮羽簇')
    if (this.模拟循环.当前自身buff列表?.['橙武']?.当前层数) {
      this.触发伤害行为('月弦激星')
    }
  }

  造成伤害() {
    if (!饮羽簇.本次释放是否读条) {
      this.饮羽簇造成伤害()
    }
  }

  读条伤害() {
    this.饮羽簇造成伤害()
  }

  释放后() {
    this.模拟循环.卸除buff({ 名称: '劲风簇追', 对象: '自身' })
    this.模拟循环.添加buff({ 名称: '饮羽簇追', 对象: '自身', 新增层数: 1 })
    this.模拟循环.消耗箭('饮羽簇')
  }

  橙武触发重置调息时间() {
    this.技能运行数据 = {
      当前层数: 1,
    }
    this.模拟循环.添加战斗日志?.({
      日志: `橙武触发重置饮羽簇调息时间`,
      日志类型: '技能释放结果',
    })
  }
}

export default 饮羽簇

export const 饮羽簇类型 = typeof 饮羽簇
