import React from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import { 角色状态信息类型 } from '../../../simulator/type'
import './index.css'
import { 箭形态枚举 } from '@/components/CycleSimulator/constant/enum'

interface TitaiProps {
  角色状态信息: 角色状态信息类型
}

function Jian(props: TitaiProps) {
  const { 角色状态信息 } = props

  return (
    <div className={'cycle-status-bar-content'}>
      <div className={'cycle-status-bar-title'}>箭袋</div>
      <div className={'cycle-status-bar-arrow-wrap'}>
        {Array.from({ length: 8 }, (v, i) => {
          // const 当前箭显示状态 = i < 角色状态信息.箭数 ? 角色状态信息.箭形态 : ''
          const 当前箭显示状态 = 角色状态信息?.箭袋信息?.[i]?.箭形态
          const cls = classnames(
            'cycle-status-bar-arrow',
            当前箭显示状态 === 箭形态枚举.黄箭 ? 'cycle-status-bar-arrow-yellow' : undefined,
            当前箭显示状态 === 箭形态枚举.蓝箭 ? 'cycle-status-bar-arrow-blue' : undefined,
            当前箭显示状态 === 箭形态枚举.红箭 ? 'cycle-status-bar-arrow-red' : undefined,
            当前箭显示状态 === 箭形态枚举.紫箭 ? 'cycle-status-bar-arrow-purple' : undefined
          )
          return <ArrowUpOutlined key={i} className={cls} />
        })}
      </div>
    </div>
  )
}

export default Jian
