// 如果你需要更新计算js文件，
// 访问链接'https://lyntss.gitee.io/wanling-dps/static/js/getDps.js'下载
// 如果你可以直接用在线js执行，你也可以直接使用在线js执行下列问题

function getDps () {
  // 这一行不能删掉，因为待执行代码里有localStorage的访问，这里做了个假的localStorage防止报错
  global.localStorage = { getItem:() => { return ''} }

  const data = require('./demo_params.json')
  const DPS = require('../build/static/js/getDps')
  const res = DPS?.计算Dps((
    {
      面板: data.面板,
      装备增益: data.装备增益,
      奇穴: data.奇穴
    }
  ))
  console.log('res',res)
  return res
}

getDps()