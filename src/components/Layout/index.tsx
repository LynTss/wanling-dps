import React from 'react'
// import ImgBg from '../../assets/main.jpg'
import ImgBg_1 from '../../assets/bg/1.png'
import ImgBg_2 from '../../assets/bg/2.png'
import ImgBg_3 from '../../assets/bg/3.png'
import ImgBg_4 from '../../assets/bg/4.png'
import ImgBg_5 from '../../assets/bg/5.png'
import ImgBg_6 from '../../assets/bg/6.png'
// import ImgBg_3 from '../../assets/bg/3.jpg'
import './index.css'
import { useAppSelector } from '@/hooks'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const random = Math.random()
  const 关闭背景图 = useAppSelector((state) => state?.basic?.关闭背景图)

  const mapKey =
    random < 1 / 6
      ? 1
      : random < 2 / 6
      ? 2
      : random < 3 / 6
      ? 3
      : random < 4 / 6
      ? 4
      : random < 5 / 6
      ? 5
      : 6
  const imgMap = {
    1: ImgBg_1,
    2: ImgBg_2,
    3: ImgBg_3,
    4: ImgBg_4,
    5: ImgBg_5,
    6: ImgBg_6,
    // 4: ImgBg_18,
  }

  return (
    <div className='layout'>
      <div className='layout-wrapper'>{children}</div>
      {!关闭背景图 ? (
        <img className='layout-bg' src={imgMap[mapKey]} alt='' />
      ) : (
        <div className={'layout-bg-color'} />
      )}
    </div>
  )
}

export default Layout
