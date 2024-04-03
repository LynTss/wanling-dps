import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'

class 丛云隐月 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '丛云隐月')

  constructor(模拟循环) {
    super(模拟循环)

    this.初始化技能运行数据(丛云隐月.技能数据)
  }

  释放() {
    this.模拟循环.添加buff?.({ 名称: '丛云隐月', 对象: '自身', 新增层数: 1 })

    this.模拟循环.技能类实例集合.白羽流星.重置CD()
  }
}

export default 丛云隐月

export const 引风唤灵类型 = typeof 丛云隐月
