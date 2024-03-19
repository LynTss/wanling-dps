import React, { useMemo } from 'react'
import { 宠物数据, 当前宠物数据 } from '../../../simulator/type'

import { Space, Tooltip } from 'antd'
import { 每秒郭氏帧 } from '@/components/CycleSimulator/constant'
import { 宠物基础数据 } from '@/components/CycleSimulator/constant/skill'
import './index.css'

interface TitaiProps {
  当前宠物数据: 当前宠物数据
  当前时间点: number
}

function Chongwu(props: TitaiProps) {
  const { 当前宠物数据, 当前时间点 } = props

  const 当前宠物列表: 宠物数据[] = useMemo(() => {
    return Object.keys(当前宠物数据)
      .map((key) => {
        const 数据 = 当前宠物数据[key]
        if (数据) {
          return 数据?.入场时间 <= 当前时间点 && 数据?.离场时间 > 当前时间点 ? 数据 : false
        } else {
          return false as any
        }
      })
      .filter((item) => item)
  }, [当前宠物数据, 当前时间点])

  return (
    <div className={'cycle-status-bar-content'}>
      <div className={'cycle-status-bar-title'}>宠物</div>
      <Space className={'cycle-status-bar-buff-list-chongwu'} size={[8, 8]} wrap>
        {当前宠物列表?.length ? (
          当前宠物列表.map((item) => {
            const 剩余时间 = item.离场时间 - 当前时间点 || 0
            const 剩余时间秒 = (剩余时间 / 每秒郭氏帧).toFixed(1)
            const 宠物原始数据 = 宠物基础数据?.[item.宠物]
            return (
              <div className={'cycle-status-bar-buff'} key={item.宠物}>
                <div className={'cycle-status-bar-buff-item'}>
                  <Tooltip title={item.宠物}>
                    <img className={'cycle-status-bar-buff-img'} src={宠物原始数据.图标} />
                  </Tooltip>
                </div>
                <p
                  className={`cycle-status-bar-buff-second ${
                    剩余时间 < 每秒郭氏帧 * 2 ? 'cycle-status-bar-buff-second-limit' : ''
                  }`}
                >
                  {剩余时间秒}
                </p>
              </div>
            )
          })
        ) : (
          <p className={'cycle-buff-empty'}>无</p>
        )}
      </Space>
    </div>
  )
}

export default Chongwu
