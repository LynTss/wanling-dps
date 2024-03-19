import 循环模拟技能基础数据 from '../../../constant/skill'
import 技能统一类 from '../../通用类/技能统一类'

class 寒更晓箭 extends 技能统一类 {
  static 技能数据 = 循环模拟技能基础数据?.find((item) => item.技能名称 === '寒更晓箭')

  constructor(模拟循环) {
    super(模拟循环)
  }

  释放() {
    this.模拟循环.角色状态信息 = {
      箭数: 8,
      箭形态: '黄箭',
    }
  }
}

export default 寒更晓箭

export const 寒更晓箭类型 = typeof 寒更晓箭
