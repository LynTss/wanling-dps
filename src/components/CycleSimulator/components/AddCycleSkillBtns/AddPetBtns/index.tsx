import { 宠物基础数据 } from '@/components/CycleSimulator/constant/skill'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import './index.css'

function AddPetBtns(props) {
  const { 宠物顺序, 更新宠物顺序 } = props
  return (
    <div className={'cycle-simulator-pet-btns'}>
      <ReactSortable
        list={宠物顺序.map((i) => Object.assign(i, { id: i }))}
        setList={(e) => {
          更新宠物顺序(e.map((item) => item.id))
        }}
        animation={150}
      >
        {(宠物顺序 || [])
          .map((item) => {
            const 宠物数据 = 宠物基础数据?.[item]
            if (宠物数据) {
              return <img className={'cycle-simulator-pets-btn'} src={宠物数据?.图标} key={item} />
            } else {
              return null
            }
          })
          .filter((item) => item)}
      </ReactSortable>
    </div>
  )
}

export default AddPetBtns
