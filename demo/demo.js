const LocalStorage = require('node-localstorage').LocalStorage;

// 如果你需要更新计算js文件，
// 访问链接'https://lyntss.gitee.io/wanling-dps/static/js/getDps.js'下载
// 如果你可以直接用在线js执行，你也可以直接使用在线js执行下列问题

function getDps () {
  // 创建一个本地存储实例，模拟 localStorage
  // 这一行不能删掉，因为待执行代码里有localStorage的访问，这里做了个假的localStorage防止报错
  global.localStorage = new LocalStorage('./scratch');

  const json = require('./参数demo.json')

  const DPS = require('../build/static/js/getDps')
  const res = DPS?.计算Dps((
    {
      面板:{
        ...json.面板,
        装备增益:{...json.装备增益},
      },
      奇穴:json.奇穴
    }
  ))
  console.log('res',res)
  return res
}
getDps()

  // console.log('开始获取')
  // axios.get('https://lyntss.github.io/wanling-dps/static/js/getDps.js')
  //   .then(response => {
  //     console.log('拿到结果')
  //       const script = new vm.Script(response.data);
  //       const context = vm.createContext({});
  //       script.runInContext(context);

  //       // console.log('context',context)
        
  //       // 假设远程文件中有一个名为 "remoteFunction" 的方法
  //       if (context.计算Dps) {
  //           const res = context.计算Dps((
  //             {
  //               面板:{
  //                 ...json.面板,
  //                 装备增益:{...json.装备增益},
  //               },
  //               奇穴:json.奇穴
  //             }
  //           ));  // 调用远程文件中的方法
  //         console.log('res',res)
  //       } else {
  //           console.log('远程文件中未找到指定的方法');
  //       }
  //   })
  //   .catch(error => {
  //       console.error('下载远程文件时出错：', error);
  //   });


// export default {}