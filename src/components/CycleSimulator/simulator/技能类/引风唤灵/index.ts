import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 引风唤灵 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '引风唤灵')

  constructor(模拟循环) {
    super(模拟循环)

    this.初始化技能运行数据(引风唤灵.技能数据)
  }

  释放() {
    this.模拟循环.召唤宠物()
  }
}

export default 引风唤灵

export const 引风唤灵类型 = typeof 引风唤灵
