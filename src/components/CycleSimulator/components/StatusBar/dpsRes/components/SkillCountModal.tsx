import React, { useMemo } from 'react'
import DpsCountModal from '@/components/Dps/DpsCountModal'
import { DpsListData } from '@/components/Dps/guoshi_dps_utils'
import '../../../../index.css'
import { 循环日志数据类型 } from '../../../../simulator/type'
import { 获取贯穿对应实际倍率 } from '@/components/CycleSimulator/utils'
import { Divider, Popover } from 'antd'

interface SkillCountModalProps {
  open: boolean
  onCancel: () => void
  dpsList: DpsListData[]
  total: number
  logData: 循环日志数据类型[]
}

const SkillCountModal: React.FC<SkillCountModalProps> = (props) => {
  const { open, onCancel, total, dpsList, logData } = props

  const { 引爆次数, 引爆倍率, 总倍率, 贯穿统计数组 } = useMemo(() => {
    const 引爆贯穿数组 = (logData || [])?.filter((item) => {
      return item?.日志?.includes('- 引爆') && item?.日志?.includes('贯穿')
    })
    const 贯穿数组 = (logData || [])
      ?.filter((item) => {
        return (
          item?.日志?.includes('贯穿') &&
          (item?.日志类型?.includes('造成伤害') || item?.日志?.includes('- 引爆'))
        )
      })
      .map((item) => item?.日志)
    const { 引爆倍率, 总倍率, 贯穿统计数组 } = 获取贯穿总倍率(贯穿数组)
    return {
      引爆次数: 引爆贯穿数组?.length,
      引爆倍率,
      总倍率,
      贯穿统计数组,
    }
  }, [logData])

  return (
    <DpsCountModal
      title={
        <div className={'cycle-simulator-modal-header space-between'}>
          <h1 className={'cycle-simulator-modal-title'}>技能统计</h1>
          <Popover
            content={
              <div>
                <p>引爆次数：{引爆次数}</p>
                <p>引爆倍率：{引爆倍率}</p>
                <p>总倍率：{总倍率}</p>
                <Divider style={{ margin: '4px 0' }} />
                {Object.keys(贯穿统计数组).map((item) => {
                  return (
                    <p key={`贯穿统计${item}`}>
                      贯穿·{item}：{贯穿统计数组[item]}次
                    </p>
                  )
                })}
              </div>
            }
          >
            <span className={'cycle-simulator-help'}>贯穿细节</span>
          </Popover>
        </div>
      }
      total={total}
      visible={open}
      onClose={() => onCancel()}
      dpsList={dpsList}
    />
  )
}

export default SkillCountModal

const 获取贯穿总倍率 = (贯穿数组) => {
  let 倍率 = 0
  let 引爆倍率 = 0

  const 贯穿统计完整数据 = 贯穿数组.map((item) => {
    const { 本次倍率, 引爆 } = 获取贯穿对应实际倍率(item)
    倍率 = 倍率 + 本次倍率
    if (引爆) {
      引爆倍率 = 引爆倍率 + 本次倍率
    }
    return 本次倍率
  })

  const 贯穿统计数组 = 获取贯穿的出现次数(贯穿统计完整数据)
  return {
    总倍率: 倍率,
    引爆倍率: 引爆倍率,
    贯穿统计数组,
  }
}

function 获取贯穿的出现次数(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1)
    return acc
  }, {})
}
