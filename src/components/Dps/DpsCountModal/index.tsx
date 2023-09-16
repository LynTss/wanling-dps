import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { DpsListData } from '../guoshi_dps_utils'
import './index.css'

function DpsCountModal({ visible, onClose, dpsList, total }) {
  const sortDpsList = useMemo(() => {
    const list: DpsListData[] = [...dpsList]
    const resList: DpsListData[] = []
    const guanchuanList: DpsListData[] = []
    const gongjiList: DpsListData[] = []

    const isSingleSkillCycle = list.some((item) => item.countName === '贯穿_一层_承契_1')
    list.forEach((item) => {
      if (item.countName && isSingleSkillCycle) {
        resList.push(item)
      } else if (item.name.includes('贯穿')) {
        guanchuanList.push(item)
      } else if (item.name.includes('攻击')) {
        gongjiList.push(item)
      } else {
        resList.push(item)
      }
    })
    if (!isSingleSkillCycle) {
      if (guanchuanList?.length) {
        let number = 0
        let dps = 0

        guanchuanList.forEach((item) => {
          number = number + item?.number
          dps = dps + item?.dps
        })

        resList.push({
          name: '贯穿(DOT)',
          number: number,
          dps: dps,
        })
      }
    }

    if (gongjiList?.length) {
      let number = 0
      let dps = 0

      gongjiList.forEach((item) => {
        number = number + item?.number
        dps = dps + item?.dps
      })

      resList.push({
        name: '攻击',
        number: number,
        dps: dps,
      })
    }

    resList.sort((a, b) => {
      return b.dps - a.dps
    })

    return resList.filter((item) => {
      return +item.dps > 0
    })
  }, [dpsList])

  return (
    <Modal
      className="dps-count-modal"
      width={700}
      centered
      title={'技能统计'}
      open={visible}
      onCancel={() => onClose()}
      footer={false}
    >
      <div>
        <div className={'dps-skill-count'}>
          <div className={'dps-line-header dps-total'}>
            <span>技能名称</span>
            <div className={'dps-count'}>
              <span className="dps-count-1">技能数量</span>
              <span className="dps-count-2">技能总伤</span>
              <span className="dps-count-3">技能比例</span>
            </div>
          </div>
        </div>
        {sortDpsList?.length ? (
          <div className={'dps-skill-count'}>
            {sortDpsList.map((item, index) => {
              return (
                <div className={'dps-line-wrap'} key={item.name + index}>
                  <div className={'dps-line'}>
                    <span>{item.countName || item.name}</span>
                    <div className={'dps-count'}>
                      <span className="dps-count-1">{item.number}</span>
                      <span className="dps-count-2">{item.dps}</span>
                      <span className="dps-count-3">{((item.dps / total) * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                  <div
                    className={'dps-line-bg'}
                    style={{ width: `${(item.dps / sortDpsList?.[0]?.dps) * 100}%` }}
                  />
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </Modal>
  )
}

export default DpsCountModal
