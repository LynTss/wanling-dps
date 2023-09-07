import { Button, message } from 'antd'
import React from 'react'

function QixueSet() {
  return (
    <>
      <Button className="qixue-set-button" onClick={() => message.success('comming soon')}>
        奇穴设置
      </Button>
    </>
  )
}

export default QixueSet
