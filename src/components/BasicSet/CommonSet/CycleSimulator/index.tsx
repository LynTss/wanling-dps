// 循环模拟器
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Select, Table } from 'antd'
import { CycleSimulatorLog } from '@/@types/cycleSimulator'
import 循环模拟技能基础数据, { 日志类型数组 } from '@/data/cycleSimulator/skill'
import { 测试循环_397 as 测试循环, 测试宠物顺序 } from './constant'
import './index.css'

function CycleSimulator() {
  const [logData, setLogData] = useState<CycleSimulatorLog[]>([])
  const [加速等级, 设置加速等级] = useState<number>(1)
  const [网络按键延迟, 设置延迟] = useState<number>(1)
  const [countModal, setCountModal] = useState<boolean>(false)
  const [showModalOpen, setShowModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (showModalOpen) {
      simulator()
    }
  }, [加速等级, 网络按键延迟, showModalOpen])

  const 初始时间 = -32 - 网络按键延迟

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

  // 开始模拟
  const simulator = () => {
    let 当前箭带内箭数 = 8
    let 开始释放上一个技能的时间 = 初始时间
    // let 当前时间 = 0 // 从0开始计算时间，按帧计算
    let 当前时间 = 初始时间 // 从0开始计算时间，按帧计算
    let 召唤宠物索引 = -1 // 上次召唤完的索引
    let 当前标鹄层数 = 0
    let 战斗日志: CycleSimulatorLog[] = []

    // 增加时间
    const 增加时间 = (time) => {
      当前时间 = 当前时间 + (time > 0 ? time : 0 || 0)
    }

    // 释放寒更晓箭
    const 释放寒更晓箭 = () => {
      当前箭带内箭数 = 8
      添加战斗日志([
        {
          日志: `开始换箭 - 寒更晓箭`,
          日志类型: '释放技能',
          日志时间: 当前时间,
        },
      ])
      开始释放上一个技能的时间 = 当前时间
      增加时间(16)
      添加战斗日志([
        {
          日志: `换箭完成 - 寒更晓箭`,
          日志类型: '技能释放结果',
          日志时间: 当前时间,
        },
      ])
    }

    // 添加战斗日志
    const 添加战斗日志 = (log) => {
      战斗日志 = [...(战斗日志 || []), ...(log || [])]
    }

    // 上一层贯穿
    const 上一层贯穿 = (技能名称, 当前事件时间?) => {
      添加战斗日志([
        {
          日志: `${技能名称}`,
          日志类型: '上贯穿',
          日志时间: 当前事件时间 !== undefined ? 当前事件时间 : 当前时间,
        },
      ])
    }

    // 引爆贯穿
    const 引爆贯穿 = (技能名称, 当前事件时间?) => {
      添加战斗日志([
        {
          日志: `${技能名称}`,
          日志类型: '引爆贯穿',
          日志时间: 当前事件时间 !== undefined ? 当前事件时间 : 当前时间,
        },
      ])
    }

    // 消耗箭
    const 消耗箭 = (当前技能, 消耗, 当前事件时间?) => {
      const 新箭数 = 当前箭带内箭数 - 消耗
      当前箭带内箭数 = 新箭数 > 0 ? 新箭数 : 0
      添加战斗日志([
        {
          日志: `${当前技能?.技能名称} 使【箭】变为 ${新箭数}`,
          日志类型: '消耗箭',
          日志时间: (当前事件时间 || 当前时间) + 1,
        },
      ])
    }

    // 判断是否需要等待GCD，发还需要等待的时间
    const 判断是否需要等待GCD = (当前技能, 上一个技能) => {
      const 释放下一个技能实际所需时间 =
        开始释放上一个技能的时间 +
        (上一个技能 === '寒更晓箭' ? 16 : 上一个技能?.技能释放后添加GCD - 1 || 0)

      // 判断连续技能GCD
      if (释放下一个技能实际所需时间 > 0 && 释放下一个技能实际所需时间 > 当前时间) {
        增加时间(释放下一个技能实际所需时间 - 当前时间)
      }

      // 判断相同技能CD
      if (当前技能?.技能CD) {
        // 在日志里找到上一次释放此技能的时间
        const newLog = [...战斗日志]
        newLog.reverse()
        const 上一次释放本技能技能 = newLog?.find(
          (item) => item?.日志 === `${当前技能?.技能名称}` && item?.日志类型 === '释放技能'
        )?.日志时间
        // 判断CD是否够用
        const newTime = 上一次释放本技能技能 + 当前技能?.技能CD
        // GCD还没好，等待转好
        if (newTime > 当前时间) {
          增加时间(newTime - 当前时间)
        }
      }
    }

    // 标鹄触发
    const 标鹄触发 = (当前事件时间) => {
      // 判断贯侯
      const 贯侯 = true
      const 标鹄引爆后基础层数 = 贯侯 ? 2 : 1
      if (当前标鹄层数 + 1 === 5) {
        // 标鹄上贯穿
        上一层贯穿('标鹄', 当前事件时间)
        // 红箭标鹄额外上一层（疑似bug）
        上一层贯穿('标鹄', 当前事件时间)
        // 桑柘标鹄额外上一层贯穿
        上一层贯穿('标鹄', 当前事件时间)
        添加战斗日志([
          {
            日志: `标鹄`,
            日志类型: '造成伤害',
            日志时间: 当前事件时间,
          },
        ])
      }
      当前标鹄层数 = 当前标鹄层数 + 1 > 4 ? 标鹄引爆后基础层数 : 当前标鹄层数 + 1
      添加战斗日志([
        {
          日志: `标鹄【层数】变为 ${当前标鹄层数}`,
          日志类型: '目标buff变动',
          日志时间: 当前事件时间,
        },
      ])
    }

    // 第一次循环，不包含引爆贯穿
    for (let i = 0; i < 测试循环?.length; i++) {
      const 当前轮次 = 测试循环[i]
      for (let j = 0; j < 当前轮次?.length; j++) {
        增加时间(网络按键延迟)
        const 当前技能 = 循环模拟技能基础数据?.find((item) => item?.技能名称 === 当前轮次[j])
        // 判断是否为当前箭袋第一个技能
        const 上一个技能 =
          当前箭带内箭数 === 8 && 当前时间 !== 初始时间
            ? '寒更晓箭'
            : 循环模拟技能基础数据?.find((item) => item?.技能名称 === 当前轮次[j - 1])

        // 判断是否需要等待GCD
        判断是否需要等待GCD(当前技能, 上一个技能)
        // 开始释放技能
        开始释放上一个技能的时间 = 当前时间
        添加战斗日志([
          {
            日志: `${当前技能?.技能名称}`,
            日志类型: '释放技能',
            日志时间: 当前时间,
          },
        ])
        if (当前技能?.造成伤害次数) {
          // 多段伤害计数
          if (当前技能?.初次伤害频率 || 当前技能?.伤害频率) {
            if (当前技能?.技能名称 !== '弛风鸣角' && 当前技能?.消耗箭数) {
              消耗箭(当前技能, 当前技能?.消耗箭数)
            }

            // 造成伤害
            for (let k = 0; k < 当前技能?.造成伤害次数; k++) {
              const 频率计算 = 当前技能?.是否为读条技能 ? -加速等级 : 0
              const 当前事件时间 =
                当前时间 +
                (当前技能.初次伤害频率 || 0) +
                (!网络按键延迟 ? 频率计算 : 0) +
                k * (当前技能?.伤害频率 + 频率计算)

              // 触发标鹄
              标鹄触发(当前事件时间)

              if (当前技能?.是否上贯穿) {
                // 能上贯穿的技能才能引爆贯穿
                // if (校验当前时间是否箭为1()) {
                //   引爆贯穿(当前技能?.技能名称, 当前事件时间)
                // }
                上一层贯穿(当前技能?.技能名称, 当前事件时间)
              }

              添加战斗日志([
                {
                  日志: `${当前技能?.技能名称} - ${k + 1}`,
                  日志类型: '造成伤害',
                  日志时间: 当前事件时间,
                },
              ])

              // 单独处理弛风的消耗，每次伤害消耗一次
              if (当前技能?.技能名称 === '弛风鸣角') {
                消耗箭(当前技能, 1, 当前事件时间)
              }
            }
            // 单段伤害计数
          } else {
            // 触发标鹄
            标鹄触发(当前时间)
            if (当前技能?.是否上贯穿) {
              // 0
              // if (校验当前时间是否箭为1()) {
              //   引爆贯穿(当前技能?.技能名称)
              // }
              上一层贯穿(当前技能?.技能名称)
            }
            添加战斗日志([
              {
                日志: `${当前技能?.技能名称}`,
                日志类型: '造成伤害',
                日志时间: 当前时间,
              },
            ])

            if (当前技能?.消耗箭数) {
              消耗箭(当前技能, 当前技能?.消耗箭数)
            }
          }
        }
        if (当前技能?.召唤宠物数量) {
          // 释放召唤后延迟1秒（16帧）宠物才造成伤害
          const 本次事件召唤索引 =
            召唤宠物索引 + 当前技能?.召唤宠物数量 > 5
              ? 召唤宠物索引 + 当前技能?.召唤宠物数量 - 5 - 1
              : 召唤宠物索引 + 当前技能?.召唤宠物数量
          const 事件时间 = 当前时间 + 16
          if (测试宠物顺序[本次事件召唤索引] === '鹰') {
            // 鹰默认上4次，点了九乌上6次
            for (let m = 0; m < 4; m++) {
              添加战斗日志([
                {
                  日志: `${测试宠物顺序[本次事件召唤索引]}-宠物`,
                  日志类型: '上贯穿',
                  日志时间: 事件时间,
                },
              ])
            }
          }
          添加战斗日志([
            {
              日志: `${测试宠物顺序[本次事件召唤索引]}-宠物`,
              日志类型: '造成伤害',
              日志时间: 事件时间,
            },
          ])
          召唤宠物索引 = 本次事件召唤索引
        }
        // 读条时间受加速影响
        if (当前技能?.是否为读条技能) {
          const 读条时间 = (当前技能.伤害频率 - 加速等级) * 当前技能.造成伤害次数
          增加时间(
            读条时间 > 当前技能?.技能释放后添加GCD
              ? 读条时间
              : 当前技能?.技能释放后添加GCD - 加速等级
          )
        } else {
          增加时间((当前技能?.技能释放后添加GCD || 0) - 加速等级)
        }
        // console.log('当前技能', 当前技能)
        // 释放技能结束
        // 判断箭数量
        if (当前箭带内箭数 === 0) {
          释放寒更晓箭()
        }
      }
    }

    const 消耗箭0和1的时间区间 = 战斗日志
      ?.filter(
        (item) =>
          item?.日志类型 === '消耗箭' && (item?.日志?.includes('0') || item?.日志?.includes('1'))
      )
      .map((item) => {
        return {
          ...item,
          箭: item?.日志?.includes('0') ? 0 : 1,
        }
      })

    // 第二次循环，判断引爆贯穿情况，添加引爆贯穿数据
    for (let i = 0; i < 战斗日志?.length; i++) {
      const 当前日志 = 战斗日志[i]

      // 当前技能
      const 当前技能 = 循环模拟技能基础数据?.find((item) =>
        当前日志?.日志?.includes(item?.技能名称)
      )

      if (当前日志?.日志类型 === '造成伤害' && 当前技能?.是否引爆贯穿) {
        for (let j = 0; j < 消耗箭0和1的时间区间?.length; j++) {
          if (
            j % 2 === 0 &&
            当前日志?.日志时间 > 消耗箭0和1的时间区间[j]?.日志时间 - 1 &&
            当前日志?.日志时间 <= 消耗箭0和1的时间区间[j + 1]?.日志时间 - 1 &&
            消耗箭0和1的时间区间[j]?.箭 === 1 &&
            消耗箭0和1的时间区间[j + 1]?.箭 === 0
          ) {
            引爆贯穿(当前技能?.技能名称, 当前日志?.日志时间)
          }
        }
      }
    }
    // 开始分析贯穿
    const 添加贯穿后日志 = 贯穿分析(战斗日志)

    添加贯穿后日志.sort((a, b) => {
      return a?.日志时间 - b?.日志时间
    })

    setLogData(添加贯穿后日志)
  }

  const columns = [
    {
      title: '日志',
      dataIndex: '日志',
      filters: [...循环模拟技能基础数据, { 技能名称: '贯穿' }]?.map((item) => {
        return {
          text: item?.技能名称,
          value: item?.技能名称,
        }
      }),
      onFilter: (value: any, record) => {
        return record.日志?.includes(value) || record?.日志类型?.includes(value)
      },
    },
    {
      title: '日志类型',
      dataIndex: '日志类型',
      filters: 日志类型数组?.map((item) => {
        return {
          text: item,
          value: item,
        }
      }),
      onFilter: (value: any, record) => record.日志类型.indexOf(value) === 0,
    },
    {
      title: '日志帧',
      dataIndex: '日志时间',
      render: (_) => {
        return _
      },
    },
    {
      title: '日志秒',
      dataIndex: '日志秒',
      render: (_, row) => {
        return row?.日志时间 / 16
      },
    },
  ]

  return (
    <>
      <Button onClick={() => setShowModalOpen(true)}>循环模拟</Button>
      <Modal
        className="cycle-simulator-modal"
        open={showModalOpen}
        onCancel={() => setShowModalOpen(false)}
        title={
          <div className={'cycle-simulator-modal-header'}>
            <h1 className={'cycle-simulator-modal-title'}>战斗日志</h1>
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
            <Button size="small" onClick={simulator}>
              计算
            </Button>
            <span style={{ margin: '0 12px' }}>
              贯穿数量{' '}
              {
                (logData || [])?.filter((item) => {
                  return item?.日志?.includes('- DOT') || item?.日志?.includes('- 引爆')
                })?.length
              }
            </span>
            <Button onClick={() => setCountModal(true)}>技能统计</Button>
          </div>
        }
        width={'100%'}
        centered
        footer={false}
      >
        <Table
          dataSource={logData}
          columns={columns}
          size="small"
          pagination={{ pageSize: 100, showTotal: (total) => total }}
        />
      </Modal>
      <Modal
        className="cycle-simulator-modal"
        footer={'false'}
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
    </>
  )
}

export default CycleSimulator

/**
 * 贯穿分析
 */

const 贯穿分析 = (战斗日志: CycleSimulatorLog[]) => {
  let 当前贯穿层数 = 0
  // 这里换一个思路处理，将待生效的贯穿塞入一个待处理数组。先不管她。在下一次上贯穿、引爆触发的时候判断后。去更新待生效贯穿数组，根据时间判断哪些是生效哪些需要更新时间
  let 待生效贯穿: 待生效贯穿[] = []
  let 最后一次贯穿buff消失时间 = 0

  // 桑柘多上一次贯穿
  const 桑柘 = true
  const 单次上贯穿次数 = 桑柘 ? 5 : 4
  let 战斗日志副本 = [...战斗日志]
  const 贯穿日志 = 战斗日志.filter((item) => item?.日志类型?.includes('贯穿'))

  贯穿日志.sort((a, b) => {
    return a?.日志时间 - b?.日志时间
  })

  const 添加战斗日志 = (log) => {
    战斗日志副本 = [...(战斗日志副本 || []), ...(log || [])]
  }
  for (let i = 0; i < 贯穿日志?.length; i++) {
    const 当前事件 = 贯穿日志?.[i]
    if (当前事件) {
      // 将生效时间前的贯穿跳完
      for (let j = 0; j < 待生效贯穿?.length; j++) {
        const 当前贯穿 = 待生效贯穿[j]
        if (当前贯穿?.生效时间 < 当前事件?.日志时间) {
          添加战斗日志([
            {
              日志: `贯穿【${当前贯穿层数}】- DOT`,
              日志类型: '造成伤害',
              日志时间: 当前贯穿?.生效时间,
            },
          ])
        }
      }

      // 先判断是不是所有贯穿已经跳完
      if (待生效贯穿?.[待生效贯穿.length - 1]?.生效时间 < 当前事件?.日志时间) {
        添加战斗日志([
          {
            日志: `贯穿Buff消失`,
            日志类型: '目标buff变动',
            日志时间: 待生效贯穿?.[待生效贯穿.length - 1]?.生效时间,
          },
        ])
        当前贯穿层数 = 0
        最后一次贯穿buff消失时间 = 待生效贯穿?.[待生效贯穿.length - 1]?.生效时间
        待生效贯穿 = []
      }

      // 从待处理列表中移除已生效的贯穿
      待生效贯穿 = 待生效贯穿.filter((item) => item?.生效时间 >= 当前事件?.日志时间)

      if (当前事件?.日志类型 === '上贯穿') {
        let 续贯穿第一次时间 =
          (待生效贯穿[待生效贯穿?.length - 1]?.生效时间 || 当前事件?.日志时间) + 8
        // 当前没有贯穿buff
        if (!待生效贯穿?.length) {
          // 以下为测试推导的续dot原理
          // 第一次上贯穿
          if (续贯穿第一次时间 === 8) {
            续贯穿第一次时间 = 8
            // 当上贯穿时dot刚消失不到4帧
          } else if (当前事件?.日志时间 - 最后一次贯穿buff消失时间 <= 4) {
            续贯穿第一次时间 = 最后一次贯穿buff消失时间 + 32 - 24 + 4
            // 当上buff时间 - 最后一次的时间已经超过8帧（0.5秒）
          } else if (当前事件?.日志时间 - 最后一次贯穿buff消失时间 > 8) {
            续贯穿第一次时间 =
              当前事件?.日志时间 + 32 + 当前事件?.日志时间 - 最后一次贯穿buff消失时间 - 24 - 4
          } else {
            续贯穿第一次时间 = 最后一次贯穿buff消失时间 + 16
          }
        }
        for (let k = 0; k < 5; k++) {
          if (待生效贯穿?.length < 单次上贯穿次数) {
            // 目前测试不吃加速。8帧一次
            const DOT单跳间隔 = 8
            待生效贯穿.push({
              生效时间: 续贯穿第一次时间 + DOT单跳间隔 * k,
            })
          }
        }
        当前贯穿层数 = 当前贯穿层数 + 1 > 6 ? 6 : 当前贯穿层数 + 1
      } else if (当前事件?.日志类型 === '引爆贯穿') {
        if (当前贯穿层数 && 待生效贯穿?.length) {
          添加战斗日志([
            {
              日志: `${当前事件?.日志}成功触发【棘矢】引爆贯穿【${当前贯穿层数}】`,
              日志类型: '技能释放结果',
              日志时间: 当前事件?.日志时间,
            },
          ])
          添加战斗日志([
            {
              日志: `贯穿【${当前贯穿层数}】- 引爆`,
              日志类型: '造成伤害',
              日志时间: 当前事件?.日志时间,
            },
          ])
        } else {
          添加战斗日志([
            {
              日志: `${当前事件?.日志}触发【棘矢】失败，当前无可引爆贯穿`,
              日志类型: '技能释放结果',
              日志时间: 当前事件?.日志时间,
            },
          ])
        }
      }
    }
  }

  // 触发贯穿日志循环结束，把剩余贯穿跳完
  // for (let j = 0; j < 待生效贯穿?.length; j++) {
  //   const 当前贯穿 = 待生效贯穿[j]
  //   添加战斗日志([
  //     {
  //       日志: `贯穿【${当前贯穿层数}】- DOT`,
  //       日志类型: '造成伤害',
  //       日志时间: 当前贯穿?.生效时间,
  //     },
  //   ])
  // }

  const 结果日志 = [...战斗日志副本]

  结果日志.sort((a, b) => {
    return a?.日志时间 - b?.日志时间
  })

  return 结果日志
}

interface 待生效贯穿 {
  生效时间: number // 生效时间（帧）
}

// a0层后上贯穿buff时间 b 最后一次贯穿时间
// function test(a, b) {
//   if (a - b <= 0.25) {
//     return b + 2 + 0.25 - 1.5
//   } else if (a - b > 0.49) {
//     return a + 2 + a - b - 0.25 - 1.5
//   } else {
//     return b + 1
//   }
// }
