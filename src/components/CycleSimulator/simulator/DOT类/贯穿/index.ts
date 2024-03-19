// import 循环主类 from '../main'
import { 每秒郭氏帧 } from '@/components/CycleSimulator/constant'
import 通用DOT类 from '../../通用类/通用DOT类'

class 贯穿 extends 通用DOT类 {
  static 审固触发次数 = 0
  constructor(模拟循环) {
    super(模拟循环)
  }

  获得和刷新贯穿(来源?) {
    const 审固 = this.模拟循环.校验奇穴是否存在('审固')
    const 贯穿buff数据 = this.模拟循环.当前目标buff列表?.['贯穿']
    // console.log('贯穿buff数据', 贯穿buff数据)
    const 当前贯穿层数 = 贯穿buff数据?.当前层数 || 0
    // console.log('当前贯穿层数', 当前贯穿层数)
    const 贯穿最大层数 = this?.模拟循环?.Buff和Dot数据?.贯穿?.最大层数 || 6
    const 新贯穿层数 = Math.min(当前贯穿层数 + 1, 贯穿最大层数)
    // console.log('新贯穿层数', 新贯穿层数)
    const 数据 = this.获取当前DOT数据('贯穿')
    const 贯穿待生效数据 = [...this.DOT运行数据.待生效数据]
    if (审固 && 数据.当前层数 === 6 && 贯穿待生效数据 && 贯穿.审固触发次数 <= 3) {
      // 更新贯穿buff显示
      const 新buff对象 = {
        ...this.模拟循环.Buff和Dot数据['贯穿'],
        当前层数: 新贯穿层数,
        // 刷新时间往前延2秒，使得剩余时间延长2秒
        刷新时间: (贯穿buff数据?.刷新时间 || 0) - 每秒郭氏帧 * 2,
      }
      this.模拟循环.当前自身buff列表['贯穿'] = { ...新buff对象 }

      // 更新dot序列
      const 原最后一次生效时间 = 贯穿待生效数据[贯穿待生效数据?.length - 1]?.生效时间 || 0
      for (let i = 0; i < 2; i++) {
        贯穿待生效数据.push({
          当前层数: 新贯穿层数,
          生效时间: 原最后一次生效时间 + 数据.伤害频率 * (i + 1),
        })
      }

      // 增加审固次数
      贯穿.审固触发次数 = 贯穿.审固触发次数 + 1
      // 添加日志
      this.模拟循环.添加战斗日志({
        日志: `触发审固，贯穿延长2秒，本次贯穿已触发${贯穿.审固触发次数}次`,
        日志类型: '自身buff变动',
        日志时间: this.模拟循环.当前时间,
      })
    } else {
      this.模拟循环.添加buff?.({
        名称: '贯穿',
        对象: '目标',
        新增层数: 1,
      })
      this.更新待生效数据(新贯穿层数, 数据)
      贯穿.审固触发次数 = 0
    }
    if (来源) {
      this.模拟循环.添加战斗日志?.({
        日志: `${来源}`,
        日志类型: '上贯穿',
        日志时间: this.模拟循环.当前时间,
      })
    }
  }

  结算贯穿伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组: 待生效数据 } = this.结算并更新运行数据(事件时间)
    待生效数据.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      const 生效时间 = 数据.生效时间 || 0
      if (生效时间) {
        this.触发伤害行为(`贯穿·${[层数]}`, 1, [], 生效时间)
      }
    })
  }

  引爆贯穿逻辑(来源, 类型: '棘矢' | '于狩') {
    // 获取当前剩余的贯穿
    let 待生效数据 = [...this.DOT运行数据.待生效数据] || []
    this.模拟循环.添加战斗日志({
      日志: `${来源}`,
      日志类型: `${类型}引爆贯穿`,
      日志时间: this.模拟循环.当前时间,
    })
    if (待生效数据?.length) {
      const 引爆跳数 = Math.min(待生效数据?.length, 3)
      const 当前贯穿层数 = this.模拟循环.当前目标buff列表?.['贯穿']?.当前层数 || 0
      this.模拟循环.添加战斗日志({
        日志: `贯穿【${当前贯穿层数}】- 引爆【${引爆跳数}】跳`,
        日志类型: '造成伤害',
        日志时间: this.模拟循环.当前时间,
      })
      this.模拟循环.技能造成伤害(
        `贯穿·${当前贯穿层数 * 引爆跳数}`,
        1,
        [],
        this.模拟循环.当前时间,
        true
      )
      // 引爆贯穿，减少3跳
      if (待生效数据.length > 3) {
        待生效数据.splice(待生效数据.length - 3)
      } else {
        待生效数据 = []
        this.模拟循环.卸除buff({ 名称: '贯穿', 卸除层数: 6 })
      }
      this.更新DOT运行数据({
        待生效数据: [...(待生效数据 || [])],
      })
    } else {
      this.模拟循环.添加战斗日志({
        日志: `${来源}触发【${类型}】失败，当前无可引爆贯穿`,
        日志类型: '技能释放结果',
        日志时间: this.模拟循环.当前时间,
      })
    }
  }
}

export default 贯穿

export const 贯穿DOT类型 = typeof 贯穿
