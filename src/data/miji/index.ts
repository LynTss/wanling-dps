import { SkillMijiBasicDataDTO } from '@/@types/miji'
import 秘籍_劲风 from './秘籍_劲风'
import 秘籍_饮雨 from './秘籍_饮雨'
// import 秘籍_霖急 from './秘籍_霖急'

const skillMijiBasicData: SkillMijiBasicDataDTO[] = [
  {
    描述技能名称: '劲风簇',
    生效技能: ['劲风簇'],
    秘籍列表: 秘籍_劲风,
  },
  {
    描述技能名称: '饮雨簇',
    生效技能: ['饮雨簇'],
    秘籍列表: 秘籍_饮雨,
  },
  // {
  //   描述技能名称: '霖急簇',
  //   生效技能: ['霖急簇'],
  //   秘籍列表: 秘籍_霖急,
  // },
]

export default skillMijiBasicData
