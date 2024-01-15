// const fs = require('fs')
// import fs from 'fs'
export const getExportFunction = async (url) => {
  // const env = {
  //   memoryBase: 0,
  //   tableBase: 0,
  //   memory: new WebAssembly.Memory({
  //     initial: 256,
  //   }),
  //   table: new WebAssembly.Table({
  //     initial: 2,
  //     element: 'anyfunc',
  //   }),
  // }
  const instance = await fetch(`${location.origin}${url}`).then(async (response) => {
    console.log('response', response)
    const result = await WebAssembly.instantiateStreaming(response)
    console.log('result', result)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const wasmSource = new Uint8Array(response)
    // const wasmModule = new WebAssembly.Module(wasmSource)
    // const wasmInstance = new WebAssembly.Instance(wasmModule, {
    // env: {},
    // })
    // console.log('wasmInstance', wasmInstance)
    return result?.instance?.exports
  })
  return instance
}
