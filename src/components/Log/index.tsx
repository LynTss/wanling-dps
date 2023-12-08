import { Button, Modal, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.css'
import log_data from './log_data'

function Log() {
  const [visible, setVisible] = useState(false)
  const [newVersionModalVisible, setNewVersionModalVisible] = useState(false)
  const [noticeVisible, setNoticeVisible] = useState(false)

  useEffect(() => {
    checkLogVersion()
    checkNotice()
  }, [])

  const checkLogVersion = () => {
    const storageVersion = localStorage.getItem('wl_new_log_version')
    if (!storageVersion || storageVersion !== log_data?.[0]?.version) {
      setNewVersionModalVisible(true)
    }
  }

  const checkNotice = () => {
    const storageNotice = localStorage.getItem('wl_notice_modal')
    if (!storageNotice) {
      setNoticeVisible(true)
    }
  }

  const handleCloseNew = () => {
    localStorage?.setItem('wl_new_log_version', log_data?.[0]?.version)
    setNewVersionModalVisible(false)
  }

  const handleCloseNotice = () => {
    localStorage?.setItem('wl_notice_modal', '1')
    setNoticeVisible(false)
  }

  return (
    <div className="log-wrap">
      <span>当前版本: {log_data?.[0]?.version}</span>
      {/* <span onClick={() => setNoticeVisible(true)}>使用前声明</span> */}
      <span className="log" onClick={() => setVisible(true)}>
        更新日志
      </span>
      <Modal
        width={800}
        title="新版本公告"
        centered
        open={newVersionModalVisible}
        onCancel={handleCloseNew}
        footer={
          <Button onClick={handleCloseNew} type="primary">
            知道了
          </Button>
        }
      >
        <Timeline className={'log-line'}>
          <Timeline.Item style={{ padding: 0 }}>
            <div className="log-content-text">
              {Array.isArray(log_data?.[0].content)
                ? log_data?.[0].content.map((a) => {
                    return <p key={a}>{a}</p>
                  })
                : log_data?.[0].content}
            </div>
            <div className="log-right">
              <p className="log-version">{log_data?.[0].version}</p>
              <p className="log-date">{log_data?.[0].date || '-'}</p>
            </div>
          </Timeline.Item>
        </Timeline>
      </Modal>
      <Modal
        width={800}
        title="更新日志"
        centered
        className="log-modal"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Timeline className={'log-line'}>
          {log_data.map((item) => {
            return (
              <Timeline.Item key={item.version}>
                <div className="log-content-text">
                  {Array.isArray(item.content)
                    ? item.content.map((a) => {
                        return <p key={a}>{a}</p>
                      })
                    : item.content}
                </div>
                <div className="log-right">
                  <p className="log-version">{item.version}</p>
                  <p className="log-date">{item.date || '-'}</p>
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Modal>
      <Modal
        width={800}
        open={noticeVisible}
        onCancel={handleCloseNotice}
        maskClosable={false}
        title="声明"
        closable={false}
        footer={
          <Button onClick={handleCloseNotice} type="primary">
            使用本计算器则视作你已经知晓并同意此声明。
          </Button>
        }
      >
        <p>计算器只是木桩/理想环境下伤害模拟，仅能用于辅助配装和收益参考。不支持出警dps。</p>
        <p>严禁使用本计算器进行跨心法/门派比较。</p>
        <p>一切数据仅供参考，最终解释权归作者所有。</p>
      </Modal>
    </div>
  )
}

export default Log
