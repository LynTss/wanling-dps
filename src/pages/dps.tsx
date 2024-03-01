// import React from 'react'
import { useLocation } from 'react-router-dom'

function Dps() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const playerName = queryParams.get('name')
  const playerClass = queryParams.get('class')

  return (
    <div id="dps_res">
      {'dps_res_start'}
      {JSON.stringify({
        name: playerName,
        class: playerClass,
      })}
      {'dps_res_end'}
    </div>
  )
}

export default Dps as any
