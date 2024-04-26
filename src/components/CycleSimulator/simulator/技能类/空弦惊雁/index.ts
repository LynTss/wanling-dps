import 循环模拟技能基础数据 from '../../../constant/skill'
import 有CD技能通用类 from '../../通用类/有CD技能通用类'
import { 箭形态枚举 } from '../../../constant/enum'

class 空弦惊雁 extends 有CD技能通用类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '空弦惊雁')

  constructor(模拟循环) {
    super(模拟循环)

    // 因为横断技能充能信息受奇穴影响，这里做覆盖
    空弦惊雁.技能数据 = 模拟循环?.技能基础数据?.find((item) => item.技能名称 === '空弦惊雁')

    this.初始化技能运行数据(空弦惊雁.技能数据)
  }

  释放() {
    // 将箭袋中所有箭变为红箭，如果已经为蓝箭则变为紫箭
    const 新箭袋信息 = (this.模拟循环?.角色状态信息?.箭袋信息 || []).map((item, index) => {
      return index < 5 || item.箭形态 !== 箭形态枚举.紫箭
        ? {
            箭形态: item.箭形态 === 箭形态枚举.红箭 ? 箭形态枚举.紫箭 : 箭形态枚举.蓝箭,
          }
        : item
    })
    this.模拟循环.角色状态信息.箭袋信息 = 新箭袋信息
  }
}

export default 空弦惊雁

export const 空弦惊雁类型 = typeof 空弦惊雁
