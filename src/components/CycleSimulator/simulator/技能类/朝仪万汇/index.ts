import 循环模拟技能基础数据 from '../../../constant/skill'
import { 根据加速等级获取虚拟加速值 } from '../../utils'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 待生效事件 } from '../../type'
import { 获取实际帧数 } from '@/components/CycleSimulator/utils'

class 朝仪万汇 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '朝仪万汇')
  static 作用间隔帧 = 8
  static 作用次数 = 20

  constructor(模拟循环) {
    super(模拟循环)

    // 根据加速修改实际读条帧
    const 循环加速值 = 根据加速等级获取虚拟加速值(this.模拟循环.加速等级)
    朝仪万汇.作用间隔帧 = 获取实际帧数(8, 循环加速值)

    this.初始化技能运行数据(朝仪万汇.技能数据)
  }

  获取读条时间() {
    const 读条持续时间 = 朝仪万汇.作用间隔帧 * 朝仪万汇.作用次数
    return 读条持续时间
  }

  读条(读条开始时间) {
    // 开始读条
    this.读条朝仪万汇(读条开始时间)
  }

  读条朝仪万汇(读条开始时间) {
    const 待生效事件队列: 待生效事件[] = []
    for (let i = 0; i < 朝仪万汇.作用次数; i++) {
      待生效事件队列.push({
        事件名称: '技能读条',
        事件时间: 读条开始时间 + (i + 1) * 朝仪万汇.作用间隔帧,
        事件备注: {
          技能名称: '朝仪万汇',
        },
      })
    }
    this.模拟循环.添加待生效事件队列(待生效事件队列)
  }

  // 顺序不可随意更改
  读条伤害() {
    this.模拟循环.标鹄判定()
    this.触发伤害行为('朝仪万汇')
  }
}

export default 朝仪万汇

export const 朝仪万汇类型 = typeof 朝仪万汇
