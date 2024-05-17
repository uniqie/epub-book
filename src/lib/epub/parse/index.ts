import { Entry } from "@zip.js/zip.js"
import { ContainerConfigType, PackageConfigType, DataType } from "../types"
import validContainerConfig from "../validator/validContainerConfig"
import { getSpine, getManifest } from "../utils"
import xml from "./xml"

export async function parseContainer(
  entry: Entry
): Promise<ContainerConfigType> {
  const config = await xml.parse(entry, {
    isArray(tagName: string) {
      return ["rootfiles", "links"].includes(tagName)
    },
  })
  if (!validContainerConfig(config)) {
    throw new Error("invalid META-INF/container.xml format, failed to parse")
  }
  return config as ContainerConfigType
}

export async function parsePackage(entry: Entry) {
  const packageConfig = (await xml.parse(entry, {
    alwaysCreateTextNode: true,
  })) as PackageConfigType
  return packageConfig
}

export function parseData(packageConfig: PackageConfigType, rootPath?: string) {
  const manifest = getManifest(packageConfig, rootPath)
  const spine = getSpine(packageConfig).map((s) => {
    const spineItem = manifest.find((m) => m.id === s)
    return spineItem
  })
  return Object.freeze({
    spine,
    manifest,
  }) as DataType
}
