import React from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import { 角色状态信息类型 } from '../../../simulator/type'

import { Tooltip } from 'antd'
import './index.css'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
}

function Jian(props: TitaiProps) {
  const { 角色状态信息 } = props

  return (
    <div className={'cycle-status-bar-content'}>
      <div className={'cycle-status-bar-title'}>箭数</div>
      <Tooltip title={`${角色状态信息.箭形态}：${角色状态信息?.箭数}支`} placement="topLeft">
        <div className={'cycle-status-bar-arrow-wrap'}>
          {Array.from({ length: 8 }, (v, i) => {
            const 当前箭显示状态 = i < 角色状态信息.箭数 ? 角色状态信息.箭形态 : ''
            const cls = classnames(
              'cycle-status-bar-arrow',
              当前箭显示状态 === '黄箭' ? 'cycle-status-bar-arrow-yellow' : undefined,
              当前箭显示状态 === '蓝箭' ? 'cycle-status-bar-arrow-blue' : undefined,
              当前箭显示状态 === '红箭' ? 'cycle-status-bar-arrow-red' : undefined,
              当前箭显示状态 === '紫箭' ? 'cycle-status-bar-arrow-purple' : undefined
            )
            return <ArrowUpOutlined key={i} className={cls} />
          })}
        </div>
      </Tooltip>
    </div>
  )
}

export default Jian
