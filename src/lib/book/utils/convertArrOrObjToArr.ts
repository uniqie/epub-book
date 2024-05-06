function convertArrOrObjToArr<T>(data: T | T[]): T[] {
  return Array.isArray(data) ? data : [data]
}

export default convertArrOrObjToArr
