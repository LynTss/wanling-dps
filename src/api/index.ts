import axios from 'axios'

const spiderApi = axios.create({
  baseURL: 'https://spider2.jx3box.com', // 设置 baseURL 为您的服务器地址
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以根据需要设置其他请求头
  },
})

// 根据配装ID获取配装方案
export const getPzDataById = (params) =>
  axios.get(`/api/cms/app/pz/${params.id}`, { params: params })

// 根据附魔ID获取附魔
export const getFumoDataById = (params) => axios.get(`/enchant/primary`, { params: params })

// 根据附魔
export const getWuCaiShiDataById = (params) => axios.get(`/enchant/stone`, { params: params })

// 获取当前区服列表
export const getServerList = (params?) =>
  spiderApi.get(`/api/spider/server/server_state`, {
    params: params,
  })

export { spiderApi }
