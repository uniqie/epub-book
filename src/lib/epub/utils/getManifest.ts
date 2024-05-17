import { PackageConfigType } from "../types"

function getManifest(packageConfig: PackageConfigType, rootPath?: string) {
  const item = packageConfig.package.manifest.item
  const items = Array.isArray(item) ? item : [item]

  return items.map((i) => {
    const attrs = i.attrs
    if (rootPath) {
      attrs.href = attrs.href?.startsWith(`${rootPath}/`)
        ? attrs.href
        : `${rootPath}/${attrs.href}`
    }

    return attrs
  })
}

export default getManifest
