export function convertArrToObj<T extends Object>(arr: T[], id: keyof T) {
  const obj: { [id: string]: T } = {}
  arr.forEach((ele) => {
    if (typeof ele[id] === "string") {
      obj[ele[id] as string] = ele
    }
  })
  return obj
}
