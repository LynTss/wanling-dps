const LocalStorage = require('node-localstorage').LocalStorage;
function a () {
  // 创建一个本地存储实例，模拟 localStorage
  global.localStorage = new LocalStorage('./scratch');
  const js = require('./build/static/js/getDps')
  const json = require('./参数demo.json')
  console.log('json',json)
  const 面板 = json.面板
  const 装备增益 = json.装备增益
  const 奇穴 = json.奇穴
  const res = js?.计算Dps((
    {
      面板:{
        ...面板,
        装备增益:{...装备增益},
      },
      奇穴
    }
  ))

  console.log('res',res)
}
a()
