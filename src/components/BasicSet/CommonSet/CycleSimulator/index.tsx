// 循环模拟器
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Modal, Select, Space, Tag, Tooltip } from 'antd'
import { CycleSimulatorLog, CycleSimulatorSkillDTO } from '@/@types/cycleSimulator'
import { useAppSelector } from '@/hooks'
import 循环模拟技能基础数据 from '@/data/cycleSimulator/skill'
import { 测试宠物顺序, 测试循环_397 } from './constant'
import { SimulatorCycle } from './simulator'
import BattleLogModal from './BattleLogModal'
import './index.css'

function CycleSimulator() {
  const [logData, setLogData] = useState<CycleSimulatorLog[]>([])
  const [加速等级, 设置加速等级] = useState<number>(1)
  const [网络按键延迟, 设置延迟] = useState<number>(1)
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
  // TODO循环
  const 宠物顺序 = [...测试宠物顺序]
  // 奇穴
  const qixuedata = useAppSelector((state) => state?.basic?.qixueData)

  useEffect(() => {
    if (!basicModalOpen) {
      setLogData([])
      设置加速等级(1)
      设置延迟(1)
      setBasicModalOpen(false)
      setLogModalOpen(false)
      setCountModal(false)
      setCycle([循环模拟技能基础数据?.[循环模拟技能基础数据?.length - 1]])
    }
  }, [basicModalOpen])

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
      加速等级,
      网络按键延迟,
      测试宠物顺序: 宠物顺序,
      奇穴: qixuedata,
    })
    setLogData(data)
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

  return (
    <>
      <Button onClick={() => setBasicModalOpen(true)}>循环模拟</Button>
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
          message="根据当前状态模拟循环，目前默认每轮箭都有金乌，由于贯穿的计算还有很多问题，可能存在贯穿数量的偏差，仅供参考。本功能持续迭代，后续会开放更多模拟循环相关能力。"
        />
        <div className={'cycle-simulator-setting'}>
          <p className={'cycle-simulator-setting-header'}>
            <h1>配置你的循环</h1>
            <span>
              目前未支持功能：宠物顺序编辑、朱厌奇穴宠物支持、承契buff添加、dps显示、验证循环合理性、日志分析buff覆盖、重复循环复制等等。后续会逐步按计划实现。
            </span>
          </p>
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
                当前大招桑柘循环
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
                  {(轮次 || []).map((item, tIndex) => {
                    return (
                      <Tag
                        closable={item?.index !== 0}
                        color={SkillColorMap[item?.技能名称] || undefined}
                        className={'cycle-simulator-setting-skill'}
                        key={`${item?.技能名称}${item?.tIndex}${tIndex}`}
                        onClose={() => removeSkill(item?.index)}
                      >
                        {item?.技能名称}
                      </Tag>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className={'cycle-simulator-modal-footer'}>
          <div className={'cycle-simulator-pet'}>
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
          </div>
          <div>
            <Tooltip title="影响技能读条时间，技能间GCD">
              <Select
                className="cycle-simulator-modal-header-select"
                size="small"
                value={加速等级}
                onChange={(e) => 设置加速等级(e)}
              >
                <Select.Option value={0}>0段加速</Select.Option>
                <Select.Option value={1}>1段加速</Select.Option>
                <Select.Option value={2}>2段加速</Select.Option>
                <Select.Option value={3}>3段加速</Select.Option>
              </Select>
            </Tooltip>
            <Tooltip title="影响每个技能释放前的时间差，很低为0帧，正常为1帧，较高为2帧">
              <Select
                className="cycle-simulator-modal-header-select"
                size="small"
                value={网络按键延迟}
                onChange={(e) => 设置延迟(e)}
              >
                <Select.Option value={0}>很低</Select.Option>
                <Select.Option value={1}>正常</Select.Option>
                <Select.Option value={2}>很高</Select.Option>
              </Select>
            </Tooltip>
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
          title={'技能统计'}
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
