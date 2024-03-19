import 循环主类类型 from '../main'

class 技能统一类 {
  模拟循环: 循环主类类型 = {} as any

  constructor(模拟循环) {
    this.模拟循环 = 模拟循环
    return
  }

  触发伤害行为(
    伤害名称,
    伤害次数 = 1,
    额外增益列表: string[] = [],
    触发伤害时间: number | undefined = undefined
  ) {
    this.模拟循环.技能造成伤害?.(伤害名称, 伤害次数, 额外增益列表, 触发伤害时间)
  }
}

export default 技能统一类
