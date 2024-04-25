// 循环
import 朝仪_棘矢_考古 from './现启用循环/朝仪_棘矢_考古.json'
import 朝仪_孰湖_三压 from './现启用循环/朝仪_孰湖_三压.json'
import 朝仪_孰湖_丛云 from './现启用循环/朝仪_孰湖_丛云_1.json'
// import 朝仪_孰湖_丛云_2 from './现启用循环/朝仪_孰湖_丛云_2.json'
// import 朝仪_孰湖_丛云_3 from './现启用循环/朝仪_孰湖_丛云_3.json'
import 朝仪_孰湖_橙武 from './现启用循环/朝仪_孰湖_橙武.json'
import 朱厌_一键宏 from './现启用循环/朱厌_一键宏.json'
import 朱厌_压缩 from './现启用循环/朱厌_压缩.json'
// 无界
import 无界循环 from './无界/无界循环.json'
// 其他
import { 缓存映射 } from '@/utils/system_constant'
import { 全局平台标识枚举 } from '@/@types/enum'

const 计算循环 = [
  { ...朝仪_孰湖_丛云 },
  { ...朝仪_孰湖_三压 },
  // { ...朝仪_孰湖_丛云_2 },
  // { ...朝仪_孰湖_丛云_3 },
  { ...朝仪_棘矢_考古 },
  { ...朱厌_压缩 },
  { ...朱厌_一键宏 },
  { ...朝仪_孰湖_橙武 },
]

const 无界_计算循环 = [{ ...无界循环 }]

export { 无界_计算循环 }

export default 计算循环

// 获取包含网页内存自定义循环在内的全部循环
export const 获取全部循环 = (平台标识?) => {
  const 当前平台标识 = 平台标识 ? 平台标识 : localStorage.getItem(缓存映射.当前平台标识)
  if (当前平台标识 === 全局平台标识枚举.无界) {
    return 无界_计算循环
  } else {
    const 自定义循环 = JSON.parse(localStorage.getItem(缓存映射.自定义循环) || '{}') || {}
    const 循环数组 = Object.keys(自定义循环).map((item) => 自定义循环[item]) || []
    return [...计算循环, ...循环数组]
  }
}
