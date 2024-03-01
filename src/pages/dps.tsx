// import React from 'react'
import { useLocation } from 'react-router-dom'

function Dps() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const playerName = queryParams.get('name')
  const playerClass = queryParams.get('class')

  console.log('dps')
  // return (
  //   <div>
  //     <p>name：{playerName}</p>
  //     <p>class：{playerClass}</p>
  //   </div>
  // )

  return JSON.stringify({
    name: playerName,
    class: playerClass,
  })
}

export default Dps as any
