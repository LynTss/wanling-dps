import { SkillMijiBasicDataDTO } from '@/@types/miji'
import 秘籍_劲风 from './秘籍_劲风'
import 秘籍_饮羽 from './秘籍_饮羽'
// import 秘籍_霖急 from './秘籍_霖急'

const skillMijiBasicData: SkillMijiBasicDataDTO[] = [
  {
    描述技能名称: '劲风簇',
    生效技能: ['劲风簇'],
    秘籍列表: 秘籍_劲风,
  },
  {
    描述技能名称: '饮羽簇',
    生效技能: ['饮羽簇'],
    秘籍列表: 秘籍_饮羽,
  },
  // {
  //   描述技能名称: '霖急簇',
  //   生效技能: ['霖急簇'],
  //   秘籍列表: 秘籍_霖急,
  // },
]

export default skillMijiBasicData
