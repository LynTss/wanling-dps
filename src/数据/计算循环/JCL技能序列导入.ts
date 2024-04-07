export const JCL技能序列导入 = (原序列: string) => {
  let newStr = 原序列.replaceAll('\n', ',')
  Object.keys(替换枚举).forEach((key) => {
    newStr = newStr.replaceAll(key, `${替换枚举[key]}`)
  })
  const arr = newStr.split(',')
  return arr.filter((item) => item)
}

const 替换枚举 = {
  没石饮羽: `白羽流星`,
  弛风鸣角: `白羽流星`,
}
