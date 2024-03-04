// const LocalStorage = require('node-localstorage').LocalStorage;

// // 如果你需要更新计算js文件，
// // 访问链接'https://lyntss.gitee.io/wanling-dps/static/js/getDps.js'下载
// // 如果你可以直接用在线js执行，你也可以直接使用在线js执行下列问题

// export function getDps () {
//   // 创建一个本地存储实例，模拟 localStorage
//   // 这一行不能删掉，因为待执行代码里有localStorage的访问，这里做了个假的localStorage防止报错
//   global.localStorage = new LocalStorage('./scratch');

//   const json = require('./参数demo.json')

//   const DPS = require('./getDps')
//   const res = DPS?.计算Dps((
//     {
//       面板:{
//         ...json.面板,
//         装备增益:{...json.装备增益},
//       },
//       奇穴:json.奇穴
//     }
//   ))
//   console.log('res',res)
//   return res
// }
// // getDps()

// export default {}