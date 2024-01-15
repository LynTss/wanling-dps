import React from 'react'
import { Button, Select } from 'antd'
import { 延迟设定, 目标集合, 起手设定 } from '@/data/constant'
import { 获取全部循环 } from '@/data/skillCycle'
import { useAppDispatch, useAppSelector } from '@/hooks'

import {
  setCurrentTarget,
  setCurrentCycle,
  setNetwork,
  setQixueData,
  setStartType,
} from '@/store/basicReducer'
import MijiSet from './MijiSet'
import QixueSet from './QixueSet'
import CycleSimulator from './CycleSimulator'
import './index.css'
// import { getExportFunction } from '@/utils/wasm'
// import { getExportFunction } from '@/utils/wasm'
// import { useWasm } from '@/hooks/use-wasm'
// import { getExportFunction } from '@/utils/wasm'
// import JX3DPS_InParams_1_JSON from './JX3DPS_InParams_1.json'

function CommonSet({ getDpsFunction, setZengyiVisible }) {
  const dispatch = useAppDispatch()
  const currentCycleName = useAppSelector((state) => state?.basic?.currentCycleName)
  const currentTargetName = useAppSelector((state) => state?.basic?.currentTargetName)
  const startType = useAppSelector((state) => state?.basic?.startType)
  const network = useAppSelector((state) => state?.basic?.network)

  const setCurrentTargetVal = (val) => {
    const target = 目标集合?.find((item) => item.名称 === val)
    if (target) {
      localStorage?.setItem('wl_当前目标', val)
      dispatch(
        setCurrentTarget({
          name: val,
          target,
        })
      )
      getDpsFunction()
    }
  }

  const handleChangeNetwork = (val) => {
    localStorage?.setItem('wl_network_data', val)
    dispatch(setNetwork(val))
    getDpsFunction()
  }

  const setCurrentCycleVal = (val) => {
    const cycleData = skillCycle?.find((item) => item.name === val)
    const cycle = cycleData?.cycle || []
    if (cycle) {
      localStorage?.setItem('wl_当前循环_1', val)
      dispatch(
        setCurrentCycle({
          name: val,
          cycle,
        })
      )
      if (cycleData?.qixue) {
        localStorage.setItem('wl_qixue_data', JSON.stringify(cycleData?.qixue))
        dispatch(setQixueData(cycleData?.qixue))
      }
      getDpsFunction()
    }
  }

  const setCurrentStartType = (val) => {
    if (val) {
      localStorage?.setItem('wl_start_type', val)
      dispatch(setStartType(val))
      getDpsFunction()
    }
  }

  const skillCycle = 获取全部循环()

  // const wasm = useWasm('/JX3DPS_Wasm/libJX3DPS.wasm')

  // const wasmTest = async () => {
  // const instance = await getExportFunction('/calc.wasm')
  // const instance = await getExportFunction('/CppDemo.wasm')
  // const instance = getExportFunction('/test/CppDemo.js')
  // const a = require('./test/CppDemo.js')
  // console.log('a', a)
  // const a = instance.add(999, 111)
  // console.log('instance', instance)
  // }

  return (
    <div className={'common-set'}>
      {/* <h1 className={'common-title'} onClick={() => wasmTest()}> */}
      <h1 className={'common-title'}>
        基础设置
        <Button
          type="text"
          size="small"
          className={'common-title-zengyi'}
          onClick={() => setZengyiVisible()}
        >
          增益详情
        </Button>
      </h1>
      <div className="common-item">
        <h1 className="common-label">目标</h1>
        <div className="common-content">
          <Select
            className="current-boss"
            value={currentTargetName}
            onChange={(v) => {
              setCurrentTargetVal(v)
            }}
          >
            {目标集合.map((item) => {
              return (
                <Select.Option value={item?.名称} key={item.名称}>
                  {item.名称}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className="common-item">
        <h1 className="common-label">循环</h1>
        <div className="common-content">
          <Select
            value={currentCycleName}
            className="cycle-select"
            onChange={(v) => {
              setCurrentCycleVal(v)
            }}
          >
            {skillCycle
              .filter((item) => !item.hide)
              .map((item) => {
                return (
                  <Select.Option value={item?.name} key={item.name}>
                    {item.name}
                  </Select.Option>
                )
              })}
          </Select>
        </div>
      </div>
      <div className="common-item">
        <h1 className="common-label">延迟</h1>
        <div className="common-content">
          <Select value={network} onChange={handleChangeNetwork}>
            {延迟设定.map((item) => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className="common-item">
        <div className={'common-item-sub'}>
          <h1 className="common-label">起手</h1>
          <div className="common-content">
            <Select
              value={startType}
              className="cycle-select"
              onChange={(v) => {
                setCurrentStartType(v)
              }}
            >
              {起手设定.map((item) => {
                return (
                  <Select.Option value={item?.value} key={item?.value}>
                    {item?.label}
                  </Select.Option>
                )
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="common-item">
        <MijiSet getDpsFunction={getDpsFunction} />
        <QixueSet getDpsFunction={getDpsFunction} />
        <CycleSimulator />
      </div>
    </div>
  )
}

export default CommonSet
