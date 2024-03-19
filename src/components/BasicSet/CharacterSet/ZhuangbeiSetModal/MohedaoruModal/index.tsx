import { Modal, Tabs } from 'antd'
import React, { useState } from 'react'

import Jx3BoxImport from './Jx3BoxImport'
import AccountImport from './AccountImport'
import './index.css'

function EquipImportModal({ visible, onClose, onOk }) {
  const [active, setActive] = useState('jx3box')
  const beforeClose = () => {
    onClose()
  }

  const beforeOk = (e) => {
    onOk(e)
    beforeClose()
  }

  const items = [
    { label: '魔盒导入', key: 'jx3box' },
    // { label: '区服角色导入', key: 'account' },
  ]

  return (
    <Modal
      className={'pz-daoru-modal'}
      title={
        <div>
          <Tabs className={'pz-daoru-tabs'} items={items} onChange={setActive} />
        </div>
      }
      open={visible}
      centered
      onCancel={() => beforeClose()}
      footer={null}
    >
      {active === 'jx3box' ? <Jx3BoxImport onOk={beforeOk} /> : <AccountImport onOk={beforeOk} />}
    </Modal>
  )
}

export default EquipImportModal
