// DPS结果显示
import React, { useEffect, useRef, useState } from 'react'
import { CycleSimulatorLog } from '@/@types/cycleSimulator'
import { Modal, ModalProps } from 'antd'
import * as G2 from '@antv/g2'
import { DOMAIN_COLOR } from '@/utils/system_constant'
import './index.css'

interface DpsResModalProps extends ModalProps {
  logData: CycleSimulatorLog[]
}

const DpsResModal: React.FC<DpsResModalProps> = (props) => {
  const { open, onCancel, logData } = props
  const [chartData, setChartData] = useState<any>()
  const limitRef: any = useRef<any>()

  useEffect(() => {
    setTimeout(() => {
      initChart()
    }, 20)
    if (open) {
      limitRef.current = false
    } else {
      limitRef.current = false
    }
  }, [open])

  const initChart = () => {
    if (limitRef.current) {
      return
    }
    limitRef.current = true

    const chart = chartData
      ? chartData
      : new G2.Chart({
          container: 'dps-res-chart',
          autoFit: true,
          renderer: 'canvas',
          padding: [24, 120, 100, 120],
        })
    chart.axis('dps', {
      label: {
        style: {
          fontSize: 12, // 文本大小
        },
      },
    })
    chart.tooltip({
      crosshairs: false,
    })
    const dataSource = getDataSource()
    chart.source(dataSource, {
      time: {
        tickCount: 10,
      },
    })
    chart.axis('time', {
      label: {
        style: {
          textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fontSize: 16, // 文本大小
        },
      },
    })
    chart.legend(false)
    chart.line().position('time*dps').color(DOMAIN_COLOR)

    if (!chartData) {
      setChartData(chart)
    }
    chart.data(dataSource)
    chart.render()
    setTimeout(() => {
      limitRef.current = false
    }, 10)
  }

  const getDataSource = () => {
    return logData.map((item) => {
      return {
        time: item?.日志时间 / 16,
        dps: item?.秒伤,
      }
    })
  }

  return (
    <Modal
      className="cycle-simulator-dps-modal"
      open={open}
      onCancel={onCancel}
      title={'Dps'}
      width={'80%'}
      centered
      footer={false}
    >
      <div className={'dps-res-chart'} id="dps-res-chart" />
    </Modal>
  )
}

export default DpsResModal
