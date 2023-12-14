import { Alert, Button, Modal, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import QuestionImg from '../../assets/question/2023-12.jpg'
import log_data from './log_data'
import './index.css'

const 当前问卷调查标识 = '2023-12'

function Log() {
  // 更新日志
  const [visible, setVisible] = useState(false)
  // 新版本公告
  const [newVersionModalVisible, setNewVersionModalVisible] = useState(false)
  // 使用须知
  const [noticeVisible, setNoticeVisible] = useState(false)
  // 问卷调查
  const [questionVisible, setQuestionVisible] = useState(false)

  useEffect(() => {
    checkLogVersion()
    checkNotice()
    checkQuestion()
  }, [])

  const checkLogVersion = () => {
    const storageVersion = localStorage.getItem('wl_new_log_version')
    if (!storageVersion || storageVersion !== log_data?.[0]?.version) {
      setNewVersionModalVisible(true)
    }
  }

  const checkQuestion = () => {
    const storageFlag = localStorage.getItem('wl_question')
    if (!storageFlag && storageFlag !== 当前问卷调查标识) {
      setQuestionVisible(true)
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
      {/* 问卷调查 */}
      <Modal
        title={'问卷调查'}
        footer={false}
        open={questionVisible}
        onCancel={() => {
          setNoticeVisible(false)
          localStorage?.setItem('wl_question', 当前问卷调查标识)
        }}
      >
        <Alert message={'本问卷由问卷星提供，您可以放心使用'} />
        <p className={'question-link'}>
          <a href="https://www.wjx.cn/vm/rNS26pu.aspx#" target="_blank" rel="noreferrer">
            点击这里参与问卷调查（一共11题）
          </a>
        </p>
        <div className={'question-link-img-wrap'}>
          <img src={QuestionImg} className={'question-link-img'} />
          <p className={'question-link-img-text'}>您也可以通过手机扫码参与调查</p>
        </div>
      </Modal>
    </div>
  )
}

export default Log
