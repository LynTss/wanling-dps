// src/useWasm.js
const AsBind = require('as-bind')
import { useEffect, useState } from 'react'

export const useWasm = (url) => {
  const [state, setState] = useState(null)
  useEffect(() => {
    const fetchWasm = async () => {
      const wasm = await fetch(url)
      console.log('wasm', wasm)

      // wasm.
      const instance = await AsBind?.AsBind?.instantiate(wasm, {})
      setState(instance)
    }
    fetchWasm()
  }, [])
  return state
}
