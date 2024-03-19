import 循环模拟技能基础数据 from '../../../constant/skill'
import { ERROR_ACTION } from '../../utils'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 白羽流星 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '白羽流星')

  constructor(模拟循环) {
    super(模拟循环)

    this.初始化技能运行数据(白羽流星.技能数据)
  }

  读条时间() {
    if (this.模拟循环.当前自身buff列表?.['劲风簇追']?.当前层数) {
      return this.模拟循环.技能类实例集合?.弛风鸣角?.读条时间?.()
    }
  }

  读条伤害() {
    this.模拟循环.技能类实例集合?.弛风鸣角?.读条伤害?.()
  }

  释放() {
    if (
      !this.模拟循环.当前自身buff列表?.['饮羽簇追']?.当前层数 &&
      !this.模拟循环.当前自身buff列表?.['劲风簇追']?.当前层数
    ) {
      return {
        可以释放: false,
        异常信息: ERROR_ACTION.BUFF错误,
      }
    }

    // 根据当前buff状态判定本次白羽流星释放的技能是什么
    if (this.模拟循环.当前自身buff列表?.['饮羽簇追']) {
      return this.模拟循环.箭数校验(undefined, 3)
    } else if (this.模拟循环.当前自身buff列表?.['劲风簇追']) {
      return { 可以释放: true }
    }
  }

  读条(读条开始时间) {
    this.模拟循环.技能类实例集合?.弛风鸣角?.读条?.(读条开始时间)
  }

  命中() {
    // 根据当前buff状态判定本次白羽流星释放的技能是什么
    if (this.模拟循环.当前自身buff列表?.['饮羽簇追']) {
      this.模拟循环.技能类实例集合?.没石饮羽?.生命周期?.()
    }
  }

  释放后() {
    if (this.模拟循环.当前自身buff列表?.['劲风簇追']) {
      this.模拟循环.技能类实例集合?.弛风鸣角?.释放后?.()
    }
  }

  重置CD() {
    this.技能运行数据 = {
      当前层数: 1,
    }
  }
}

export default 白羽流星

export const 白羽流星类型 = typeof 白羽流星
