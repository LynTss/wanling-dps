export default [
  {
    version: '1.1.2',
    content: [
      '优化Dps核心算法类，dps计算效率提升约20%',
      '新增配装器内智能对比功能，开启后选择装备动态展示dps差异。',
      '优化收益图表显示，以第一项作为100%基准对比，仅优化显示不影响原收益高低关系',
    ],
  },
  {
    version: '1.1.1',
    content: ['增加了起手选项，可以选择是否为5层承契起手'],
  },
  {
    version: '1.1.0',
    content: ['修改门派套装双会buff的覆盖率为70%', '修正部分技能基础伤害系数', '部分系数计算优化'],
  },
  {
    version: '1.0.9',
    content: [
      '增加了快捷切换常用增益的选项，方便增益进行一键设置。部分增益层数是问群友的，如有出入请留言订正',
      '重构了dps计算部分的代码，dps结果不影响，仅增强代码可读性，方便代码review。',
    ],
  },
  {
    version: '1.0.8',
    content: ['更新阵眼计算无双相关的计算错误。感谢霸刀考拉大佬的捉虫'],
  },
  {
    version: '1.0.7',
    content: [
      '朱厌循环可以切换九乌。卢令奇穴。贯穿质量存在差异，计算时间统一为[3分02秒箭打完]',
      '增加了阵眼收益动态显示，基于当前属性动态计算，按从高到底排序',
    ],
  },
  {
    version: '1.0.6',
    content: [
      '更新了优化后朝仪万汇-桑柘(非CW)循环的技能数量【计算时间3分04秒】，循环来自风雪入我怀',
      '更新了优化后朱厌循环技能数量【计算时间3分04秒】',
    ],
  },
  {
    version: '1.0.5',
    content: [
      '更新了朝仪万汇-诸怀CW循环的技能数量',
      '更新了基于清城优化后的朱厌循环技能数量',
      '11月6日技改，饮羽系数-10%，饮羽添加新秘籍（15非侠）',
      '技改总结：单饮加强了1.1 ~ 1.4%。结合饮的实际占比，总dps变化不到1%',
    ],
  },
  {
    version: '1.0.4',
    content: [
      '新增了朝仪万汇套路下两个循环的CW循环，选择CW和朝仪万汇套路时会自动触发',
      '新增了装备10800橙武',
    ],
  },
  {
    version: '1.0.3',
    content: [
      '因为诸怀循环会比桑拓循环更快的叠满承契。精细了各循环承契的实际覆盖率使各循环计算更加合理',
      '拆分了大招流桑拓和诸怀循环',
      '限制了饮羽只能选择一个伤害秘籍',
      '计算前请重新选择循环',
      'CW只有数值没有做CW循环！！',
    ],
  },
  {
    version: '1.0.2',
    content: ['更新循环，变更为朱厌、星烨、朝仪万汇。计算前请手动重新选择奇穴'],
  },
  {
    version: '1.0.1',
    content: ['更新小CW落梨雪'],
  },
  {
    version: '1.0.0',
    content: ['万灵正式版', '暂无CW循环'],
  },
  {
    version: '0.0.1',
    content: ['体服版本，千变万化，代码还有很多问题，先看一乐。循环、系数待定。'],
  },
]
