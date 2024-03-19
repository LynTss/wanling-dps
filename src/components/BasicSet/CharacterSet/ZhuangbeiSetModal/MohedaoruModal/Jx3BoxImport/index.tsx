import { getPzDataById } from '@/api'
import { Alert, Button, Input, Image, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { getEquipData } from './util'
import Img_Help_1 from '../../../../../../assets/daoru/daoru_help_1.png'
import Img_Help_2 from '../../../../../../assets/daoru/daoru_help_2.png'

function Jx3BoxImport({ onOk }) {
  const [loading, setLoading] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [id, setId] = useState()
  const [data, setData] = useState<any>(undefined)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const changeId = (e) => {
    setId(e.target.value.trim())
  }

  const handleGetPzData = async () => {
    setLoading(true)
    setData(undefined)
    setErrorMsg('')
    const res: any = await getPzDataById({ id })
    setLoading(false)
    if (!res.code) {
      const getData = getPzData(res.data)
      if (getData?.msg) {
        setErrorMsg(getData?.msg)
      } else {
        setData(getData)
      }
    } else {
      setErrorMsg(res.msg)
    }
    return
  }

  const handleClickImport = () => {
    if (data?.equipData) {
      onOk(data?.equipData)
    }
  }

  return (
    <div>
      <Alert
        message={
          <span>
            在使用导入功能之前，请确保你的配装方案权限公开。
            <a onClick={() => setHelpVisible(true)}>如何获取配装ID</a>
          </span>
        }
        type="info"
      />
      <div className="pz-daoru-input-wrap">
        <Input value={id} onChange={changeId} placeholder="请输入魔盒配装方案ID" />
        <Button disabled={loading || !id} onClick={() => handleGetPzData()}>
          获取配装方案
        </Button>
      </div>
      {loading ? (
        <div className="pz-daoru-text-wrap">
          正在获取配装方案
          <Spin style={{ marginLeft: 12 }} spinning={true} />
        </div>
      ) : (
        <>
          {data ? (
            <div className={'pz-daoru-success'}>
              <p className="pz-daoru-success-tip">成功获取配装方案</p>
              <div className="pz-daoru-success-content">
                <div className="pz-daoru-success-info">
                  <div className="pz-daoru-success-user">
                    <img
                      className="pz-daoru-success-avatar"
                      src={data?.showData?.user_avatar}
                      alt=""
                    />
                    <div>{data?.showData?.display_name}</div>
                  </div>
                  <div className="pz-daoru-success-title" title={data?.showData?.title}>
                    {data?.showData?.title}
                  </div>
                </div>
                <Button type="primary" onClick={handleClickImport}>
                  导入
                </Button>
              </div>
            </div>
          ) : null}
          {errorMsg ? (
            <div className="pz-daoru-text-wrap pz-daoru-text-error">{errorMsg}</div>
          ) : null}
        </>
      )}
      <Modal
        footer={null}
        title="如何获取配装ID"
        open={helpVisible}
        onCancel={() => setHelpVisible(false)}
      >
        <p>
          1、打开你的配装方案，点击导出。
          <Image className="pz-daoru-help-img" src={Img_Help_1} />
        </p>
        <p>
          2、选择数据版,复制配装ID.
          <Image className="pz-daoru-help-img" src={Img_Help_2} />
        </p>
      </Modal>
    </div>
  )
}

export default Jx3BoxImport

// 获取配装数据
const getPzData = (data) => {
  // 获取展示信息
  const showData = {
    display_name: data?.pz_author_info?.display_name,
    user_avatar: data?.pz_author_info?.user_avatar,
    title: data?.title,
  }
  let equipData = null
  let msg: any = ''
  if (data?.snapshot) {
    const { equip, errorMsg } = getEquipData(data?.snapshot)
    if (equip) {
      equipData = equip
    }
    if (errorMsg) {
      msg = errorMsg
    }
  }
  return { showData, equipData, msg }
}
