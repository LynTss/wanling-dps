// 循环模拟器
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Modal, Popover, Space, Tag, Tooltip } from 'antd'
import { ReactSortable } from 'react-sortablejs'
import { CycleSimulatorLog, CycleSimulatorSkillDTO } from '@/@types/cycleSimulator'
import { useAppDispatch, useAppSelector } from '@/hooks'
import 循环模拟技能基础数据 from '@/data/cycleSimulator/skill'
import { 测试宠物顺序, 测试循环_397 } from './constant'
import { SimulatorCycle } from './simulator'
import BattleLogModal from './BattleLogModal'
import './index.css'
import { getDpsCycle } from './utils'
import {
  CurrentDpsFunctionRes,
  currentDpsFunction,
} from '@/store/basicReducer/current-dps-function'

function CycleSimulator() {
  const [logData, setLogData] = useState<CycleSimulatorLog[]>([])
  // 基础弹窗
  const [basicModalOpen, setBasicModalOpen] = useState<boolean>(false)
  // 日志log
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false)
  // 技能统计
  const [countModal, setCountModal] = useState<boolean>(false)
  // 循环
  const [cycle, setCycle] = useState<CycleSimulatorSkillDTO[]>([
    循环模拟技能基础数据?.[循环模拟技能基础数据?.length - 1],
  ])
  // 宠物顺序
  const [宠物顺序, 设置宠物顺序] = useState<string[]>([...测试宠物顺序])
  // 当前面板加速值
  const 加速值 = useAppSelector((state) => state?.basic?.characterFinalData)?.加速值
  // 当前网络延迟
  const 网络按键延迟 = useAppSelector((state) => state?.basic?.network) - 1

  // dps结果
  const [dpsRes, setDpsRes] = useState<CurrentDpsFunctionRes>({
    totalDps: 0,
    dpsList: [],
    dpsPerSecond: 0,
  })
  // 奇穴
  const qixuedata = useAppSelector((state) => state?.basic?.qixueData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!basicModalOpen) {
      setLogData([])
      setBasicModalOpen(false)
      setLogModalOpen(false)
      setCountModal(false)
      设置宠物顺序([...测试宠物顺序])
      setCycle([循环模拟技能基础数据?.[循环模拟技能基础数据?.length - 1]])
      setDpsRes({
        totalDps: 0,
        dpsList: [],
        dpsPerSecond: 0,
      })
    }
  }, [basicModalOpen])

  useEffect(() => {
    simulator()
  }, [cycle, 宠物顺序])

  const 技能统计数据 = useMemo(() => {
    const newLog = logData
      ?.filter((item) => item?.日志类型 === '造成伤害')
      .map((item) => {
        return item?.日志
      })

    const res: any[] = Array.from(new Set(newLog)).map((item) => {
      return {
        技能名称: item,
        技能数量: 0,
      }
    })
    newLog.forEach((item) => {
      for (let i = 0; i <= res?.length; i++) {
        if (res[i]?.技能名称 === item) {
          res[i].技能数量 = res[i].技能数量 + 1
        }
      }
    })

    res.sort((a, b) => {
      return b.技能数量 - a.技能数量
    })

    return res
  }, [logData])

  const simulator = async () => {
    const data = await SimulatorCycle({
      测试循环: cycle.map((item) => item?.技能名称) || [],
      加速值,
      网络按键延迟,
      测试宠物顺序: 宠物顺序,
      奇穴: qixuedata,
    })
    setLogData(data)
    计算DPS(data)
  }

  // 计算DPS
  const 计算DPS = async (data) => {
    // 将日志信息转换为计算DPS所需要的循环数据
    const 用于计算循环 = getDpsCycle(data)
    // 最后一秒
    const 最后一秒 = data[data.length - 1]?.日志时间 / 16
    const res = await dispatch(
      currentDpsFunction({
        更新计算时间: 最后一秒,
        更新循环技能列表: 用于计算循环,
      })
    )

    setDpsRes(res)
  }

  // 向循环内新增技能
  const addCycle = (item: CycleSimulatorSkillDTO) => {
    const newCycle = [...(cycle || []), item]
    setCycle(newCycle)
  }

  // 从循环内删除技能
  const removeSkill = (index) => {
    const newCycle = [...(cycle || [])]
    newCycle.splice(index, 1)
    setCycle(newCycle)
  }

  // 根据循环计算更适合展示的多层数组，用于显示
  const 显示循环 = useMemo(() => {
    // 根据箭数拆分
    const res: any[] = []
    let 当前消耗箭 = 0
    cycle.forEach((item, index) => {
      if (当前消耗箭 + item?.消耗箭数 > 8 || 当前消耗箭 === 0) {
        res[res?.length] = [{ ...item, index: index || 0 }]
        当前消耗箭 = item?.消耗箭数 || 0
      } else {
        res[res?.length - 1] = [...(res[res?.length - 1] || []), { ...item, index: index || 0 }]
        当前消耗箭 = 当前消耗箭 + item?.消耗箭数
      }
    })
    return res
  }, [cycle])

  // 拖拽更新循环
  const 拖拽更新循环 = (newList) => {
    // 首先获取被替换轮次的第一个元素的index索引
    const minIndex = newList.reduce(function (min, obj) {
      return Math.min(min, obj.index)
    }, Infinity)
    // 获取最大的索引，判断拖拽生效范围
    const maxIndex = newList.reduce(function (min, obj) {
      return Math.max(min, obj.index)
    }, Number.NEGATIVE_INFINITY)
    // 将数组哪索引范围内跌元素替换为新的数组元素
    const newCycle = cycle.map((item, index) => {
      if (index < minIndex || index > maxIndex) {
        return { ...item }
      } else {
        return newList[index - minIndex]
      }
    })
    // 更新循环
    setCycle(newCycle)
  }

  return (
    <>
      <Button danger onClick={() => setBasicModalOpen(true)}>
        循环模拟
      </Button>
      <Modal
        className="cycle-simulator-modal"
        width={'90%'}
        title={'循环模拟'}
        centered
        footer={null}
        open={basicModalOpen}
        onCancel={() => setBasicModalOpen(false)}
        destroyOnClose
      >
        <Alert
          type="warning"
          message="目前默认每轮箭都有金乌，由于贯穿的计算还有很多问题，可能存在贯穿数量的偏差，仅供参考。请勿以本功能作为直接结论。功能持续迭代，后续会开放更多模拟循环相关能力。"
        />
        <div className={'cycle-simulator-setting'}>
          <div className={'cycle-simulator-setting-header'}>
            <h1>配置你的循环</h1>
            <Popover
              content={
                <div>
                  <p>1、点击下方技能按钮添加至循环内</p>
                  <p>2、在单行内可以使用拖动改变技能顺序</p>
                  <p>3、宠物可以通过拖动改变宠物顺序</p>
                </div>
              }
            >
              <span className={'cycle-simulator-help'}>如何使用?</span>
            </Popover>
            <span>
              {/* 目前未支持功能：宠物顺序编辑、朱厌奇穴宠物支持、承契buff添加、dps显示、验证循环合理性、日志分析buff覆盖、重复循环复制等等。后续会逐步按计划实现。 */}
              目前未支持功能：验证循环合理性、日志分析buff覆盖、重复循环复制、宏命令生成循环等等。后续会逐步按计划实现。
            </span>
          </div>
          <div className={'cycle-simulator-setting-btns'}>
            <Space size={[8, 16]} wrap>
              {循环模拟技能基础数据
                .filter((item) => !item?.创建循环不可选)
                .map((item) => {
                  return item?.技能名称 === '弛风鸣角' ? (
                    <Tooltip title="弛风鸣角没有做释放间换箭的功能">
                      <Button
                        key={item?.技能名称}
                        className={'cycle-simulator-setting-btn'}
                        onClick={() => addCycle(item)}
                      >
                        {item?.技能名称}
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button
                      key={item?.技能名称}
                      className={'cycle-simulator-setting-btn'}
                      onClick={() => addCycle(item)}
                    >
                      {item?.技能名称}
                    </Button>
                  )
                })}
            </Space>
            <Space>
              {/* <Button
                onClick={() =>
                  setCycle(
                    测试循环_买糖.map((item) => {
                      return (
                        循环模拟技能基础数据?.find((a) => a?.技能名称 === item) ||
                        循环模拟技能基础数据[0]
                      )
                    })
                  )
                }
              >
                大招买糖循环
              </Button> */}
              <Button
                onClick={() =>
                  setCycle(
                    测试循环_397.map((item) => {
                      return (
                        循环模拟技能基础数据?.find((a) => a?.技能名称 === item) ||
                        循环模拟技能基础数据[0]
                      )
                    })
                  )
                }
              >
                大招桑柘循环
              </Button>
              <Button
                onClick={() => setCycle([循环模拟技能基础数据?.[循环模拟技能基础数据?.length - 1]])}
              >
                清空循环
              </Button>
            </Space>
          </div>
          <div className={'cycle-simulator-setting-res'}>
            {(显示循环 || []).map((轮次, index) => {
              return (
                <div className="cycle-simulator-setting-turn" key={index}>
                  <ReactSortable
                    list={轮次.map((i) =>
                      Object.assign(i, { id: `${i?.技能名称}_${index}_${i?.index}` })
                    )}
                    setList={(e) => {
                      拖拽更新循环(e)
                    }}
                    animation={150}
                  >
                    {(轮次 || []).map((item) => {
                      return (
                        <Tag
                          closable={item?.index !== 0}
                          color={SkillColorMap[item?.技能名称] || undefined}
                          className={'cycle-simulator-setting-skill'}
                          key={`${item?.技能名称}_${index}_${item?.index}`}
                          onClose={() => removeSkill(item?.index)}
                        >
                          {item?.技能名称}
                        </Tag>
                      )
                    })}
                  </ReactSortable>
                </div>
              )
            })}
          </div>
        </div>
        <div className={'cycle-simulator-modal-footer'}>
          <div className={'cycle-simulator-pet'}>
            <ReactSortable
              list={宠物顺序.map((i) => Object.assign(i, { id: i }))}
              setList={(e) => {
                设置宠物顺序(e.map((item) => item.id))
              }}
              animation={150}
            >
              {(宠物顺序 || []).map((item, index) => {
                return (
                  <Tag
                    color={PetColorMap[item] || undefined}
                    className={'cycle-simulator-setting-skill'}
                    key={`${item}${index}`}
                  >
                    {item}
                  </Tag>
                )
              })}
            </ReactSortable>
          </div>
          <div>
            {dpsRes?.totalDps ? (
              <span>
                模拟DPS: <span className={'cycle-simulator-dps-res'}>{dpsRes?.dpsPerSecond}</span>
              </span>
            ) : null}
            <Tooltip title="实际模拟计算较为复杂，随着延迟、加速不同。可能存在部分技能数量误差。仅供参考">
              <Button type="primary" onClick={simulator}>
                {logData?.length ? '重新模拟' : '开始模拟'}
              </Button>
            </Tooltip>
            {logData?.length ? (
              <>
                <Button onClick={() => setLogModalOpen(true)}>战斗日志</Button>
                <Button onClick={() => setCountModal(true)}>技能统计</Button>
              </>
            ) : null}
          </div>
        </div>
        <BattleLogModal
          open={logModalOpen}
          onCancel={() => setLogModalOpen(false)}
          logData={logData}
        />
        <Modal
          className="cycle-simulator-modal"
          footer={false}
          centered
          width={'50%'}
          title={
            <div className={'cycle-simulator-modal-header'}>
              <h1 className={'cycle-simulator-modal-title'}>技能统计</h1>
              <span style={{ margin: '0 12px' }}>
                贯穿数量{' '}
                {
                  (logData || [])?.filter((item) => {
                    return item?.日志?.includes('- DOT') || item?.日志?.includes('- 引爆')
                  })?.length
                }
              </span>
            </div>
          }
          open={countModal}
          onCancel={() => setCountModal(false)}
        >
          {技能统计数据.map((item) => {
            return (
              <p className={'cycle-simulator-skill-count'} key={item?.技能名称}>
                <span>{item?.技能名称}</span>
                <span>{item?.技能数量}</span>
              </p>
            )
          })}
        </Modal>
      </Modal>
    </>
  )
}

export default CycleSimulator

const SkillColorMap = {
  引风唤灵: 'green',
  弛律召野: 'lime',
  劲风簇: 'blue',
  弛风鸣角: 'cyan',
  饮羽簇: 'red',
  '饮羽簇-读条': 'red',
  没石饮羽: 'orange',
  朝仪万汇: 'purple',
}

const PetColorMap = {
  虎: 'red',
  鹰: 'blue',
  猪: 'green',
  象: 'lime',
  熊: 'orange',
  狼: 'purple',
}
