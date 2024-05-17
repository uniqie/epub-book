import { PackageConfigType } from "../types"

function getSpineItems(packageConfig: PackageConfigType): string[] {
  const spineItems = packageConfig.package.spine.itemref
  if (Array.isArray(spineItems)) {
    return spineItems.map((s) => s.attrs.idref) as string[]
  }
  return [spineItems.attrs.idref] as string[]
}

export default getSpineItems
