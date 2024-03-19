import { getServerList } from '@/api'
import { useRequest } from 'ahooks'
import { Cascader } from 'antd'
import React from 'react'

const filterZoneList = ['國際服', '比赛专区', '缘起大区']

function ServerCascader(props) {
  const { ...options } = props

  // 调用接口获取区服信息
  const { data, loading } = useRequest(() =>
    getServerList().then((res) => {
      const list: any[] = []
      ;(res?.data || [])?.forEach((item) => {
        if (!filterZoneList?.includes(item?.zone_name)) {
          const exist = list?.find((a) => a?.value === item?.zone_name)
          if (exist) {
            exist.children.push({
              value: item?.server_name,
              label: item?.server_name,
            })
          } else {
            list.push({
              value: item?.zone_name,
              label: item?.zone_name,
              children: [
                {
                  value: item?.server_name,
                  label: item?.server_name,
                },
              ],
            })
          }
        }
      })
      return list
    })
  )

  return (
    <Cascader placeholder={'请选择服务器'} options={data || []} loading={loading} {...options} />
  )
}

export default ServerCascader
