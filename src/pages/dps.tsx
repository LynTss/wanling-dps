// import React from 'react'

function GetDps() {
  const href = location.href
  const url = new URL(href)
  const searchParams = url.searchParams

  const playerName = searchParams.get('name')
  const playerClass = searchParams.get('class')

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

export default GetDps as any
