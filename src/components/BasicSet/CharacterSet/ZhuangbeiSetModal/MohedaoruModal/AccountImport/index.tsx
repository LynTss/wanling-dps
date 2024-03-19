// 根据账号角色导入
// import { getEquipDataByName } from '@/api'
import { Button, Input, Image, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { getEquipData } from './util'
import Img_Help_1 from '@/assets/daoru/daoru_help_1.png'
import Img_Help_2 from '@/assets/daoru/daoru_help_2.png'
import ServerCascader from '@/components/common/ServerCascader'

function AccountImport({ onOk }) {
  const [loading, setLoading] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [name, changeName] = useState<string>()
  const [server, changeServer] = useState<string>()
  const [data, setData] = useState<any>(undefined)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleGetPzData = async () => {
    setLoading(true)
    setData(undefined)
    setErrorMsg('')
    let res: any
    let errorMessage = ''
    try {
      // const requestRes: any = await getEquipDataByName({
      //   name,
      //   server,
      //   // server: '绝代天骄',
      //   // zone: '电信八区',
      // })
      const requestRes: any = {}
      console.log('requestRes', requestRes)
      if (requestRes?.data && requestRes?.status === 200) {
        res = requestRes?.data
      } else {
        errorMessage = '没有查询到角色信息，清稍后再试'
      }
    } catch (e) {
      console.log('e', e)
      errorMessage = '没有查询到角色信息，清稍后再试'
    }
    setLoading(false)
    console.log('res', res)
    if (!errorMessage) {
      const getData = getPzData(res?.equip)
      if (getData?.msg) {
        setErrorMsg(getData?.msg)
      } else {
        setData(getData)
      }
    } else {
      setErrorMsg(errorMessage)
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
      <div className="pz-daoru-input-wrap no-padding">
        <Input
          className="pz-daoru-input-wrap-input"
          value={name}
          onChange={(e) => changeName(e.target.value.trim())}
          placeholder="请输入角色名称"
        />
        <Input
          className="pz-daoru-input-wrap-input"
          value={server}
          onChange={(e) => changeServer(e.target.value.trim())}
          placeholder="请输入区服名称"
        />
        <ServerCascader />
        <Button disabled={loading || !name || !server} onClick={() => handleGetPzData()}>
          查询角色
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

export default AccountImport

// 获取配装数据
const getPzData = (data) => {
  // 获取展示信息
  let equipData = null
  let msg: any = ''
  if (data) {
    const { equip, errorMsg } = getEquipData(data)
    console.log('equip', equip)
    console.log('equipData', equipData)
    if (equip) {
      equipData = equip
    }
    if (errorMsg) {
      msg = errorMsg
    }
  }
  return { equipData, msg }
}
