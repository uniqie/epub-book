function absoluteUrl(relativeUrl: string, base?: string) {
  if (base && relativeUrl.startsWith("/")) {
    throw new Error("invalid relative url")
  }

  if (base) {
    const urlPath: string[] = []
    const basePath = base.split("/") as string[]
    const relativePath = relativeUrl.split("/") as string[]

    basePath.concat(relativePath).forEach((str) => {
      if (str !== ".." && str !== ".") {
        urlPath.push(str)
      }
      if (str === "..") {
        urlPath.pop()
      }
    })
    return urlPath.join("/")
  }
  return relativeUrl
}

export default absoluteUrl
