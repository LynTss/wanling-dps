import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd'
import { skillBasicDps, skillFinalDps } from '../../utils/skill-dps'
import { useAppSelector } from '@/hooks'
import './index.css'

function SkillDamageTable() {
  const characterFinalData = useAppSelector((state) => state?.basic?.characterFinalData)
  const currentTarget = useAppSelector((state) => state?.basic?.currentTarget)
  const skillBasicData = useAppSelector((state) => state?.zengyi?.skillBasicData)

  const [visible, setVisible] = useState(false)

  const hrefSkill = location.href?.includes('?skill=1')
  useEffect(() => {
    if (hrefSkill) {
      setVisible(true)
    }
  }, [hrefSkill])

  const columns = [
    {
      title: '技能名称',
      dataIndex: '技能名称',
      fixed: 'left',
      // width: 200,
    },
    {
      title: '伤害系数',
      dataIndex: '技能伤害系数',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.技能伤害系数 - b.技能伤害系数,
    },
    {
      title: '武伤系数',
      dataIndex: '武器伤害系数',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.武器伤害系数 - b.武器伤害系数,
    },
    {
      title: '基础-min',
      dataIndex: '技能基础伤害_最小值',
    },
    {
      title: '基础-max',
      dataIndex: '技能基础伤害_最大值',
    },
    {
      title: '层数',
      dataIndex: '伤害计算次数',
    },
    {
      title: '原始伤害-min',
      dataIndex: 'yuanshi_min',
      render: (_, row) => {
        return skillBasicDps(row, characterFinalData)?.min
      },
    },
    {
      title: '原始伤害-max',
      dataIndex: 'yuanshi_max',
      render: (_, row) => {
        return skillBasicDps(row, characterFinalData)?.max
      },
    },
    // {
    //   title: '基准伤害-min',
    //   dataIndex: 'jizhun_min',
    //   render: (_, row) => {
    //     const damage = skillBasicDps(row, characterFinalData)?.min
    //     return skillStandardDps(damage, characterFinalData, currentTarget)
    //   },
    // },
    // {
    //   title: '基准伤害-min',
    //   dataIndex: 'jizhun_max',
    //   render: (_, row) => {
    //     const damage = skillBasicDps(row, characterFinalData)?.max
    //     return skillStandardDps(damage, characterFinalData, currentTarget)
    //   },
    // },
    {
      title: '实际伤害-min',
      dataIndex: 'min',
      className: 'keyTable',
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, characterFinalData, currentTarget)?.min
      },
    },
    {
      title: '实际伤害-max',
      dataIndex: 'max',
      className: 'keyTable',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return (
          skillFinalDps(a, characterFinalData, currentTarget)?.max -
          skillFinalDps(b, characterFinalData, currentTarget)?.max
        )
      },
      fix: 'right',
      width: 120,
      render: (_, row) => {
        return skillFinalDps(row, characterFinalData, currentTarget)?.max
      },
    },
  ]

  return (
    <div className="skill-dmage-wrapper">
      <Modal
        title={'技能详细数据及计算过程数据'}
        centered
        footer={null}
        width={'100%'}
        className={'skillDmageVisible'}
        open={visible}
        onCancel={() => setVisible(false)}
      >
        <Table
          rowKey={'技能名称'}
          className={'skillDamageTable'}
          dataSource={skillBasicData}
          pagination={false}
          columns={columns as any}
          scroll={{ x: 'max-content' }}
        />
      </Modal>
      <span className="skillDamageBtn" onClick={() => setVisible(true)}>
        单技能数据
      </span>
    </div>
  )
}

export default SkillDamageTable
