import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 弛律召野 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '弛律召野')

  constructor(模拟循环) {
    super(模拟循环)

    // 因为横断技能充能信息受奇穴影响，这里做覆盖
    弛律召野.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '弛律召野')

    this.初始化技能运行数据(弛律召野.技能数据)
  }

  释放() {
    const 朱厌 = this.模拟循环.校验奇穴是否存在('朱厌')
    if (朱厌) {
      this.模拟循环.召唤宠物(['朱厌'])
      this.模拟循环.召唤宠物(['朱厌'])
      this.模拟循环.召唤宠物(['朱厌'])
    } else {
      this.模拟循环.召唤宠物()
    }
  }
}

export default 弛律召野

export const 弛律召野类型 = typeof 弛律召野
