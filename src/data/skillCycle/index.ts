// import 九乌, { 循环默认奇穴 as 九乌奇穴 } from './九乌'
import 朝仪万汇_棘矢 from './现启用循环/朝仪万汇_棘矢.json'
import 朝仪万汇_孰湖 from './现启用循环/朝仪万汇_孰湖.json'
import 朝仪万汇_孰湖_cw from './现启用循环/朝仪万汇_孰湖_cw.json'

const Cycle_Data = [{ ...朝仪万汇_棘矢 }, { ...朝仪万汇_孰湖 }, { ...朝仪万汇_孰湖_cw }]

export default Cycle_Data

// 获取包含网页内存自定义循环在内的全部循环
export const 获取全部循环 = () => {
  const 自定义循环 = JSON.parse(localStorage.getItem('wl_custom_cycle_2') || '{}') || {}
  const 循环数组 = Object.keys(自定义循环).map((item) => 自定义循环[item]) || []
  return [...Cycle_Data, ...循环数组]
}
