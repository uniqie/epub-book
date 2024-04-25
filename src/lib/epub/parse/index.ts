import { Entry } from "@zip.js/zip.js"
import { ContainerConfigType, PackageConfigType } from "../types"
import validContainerConfig from "../validator/validContainerConfig"
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
  const packageConfig = (await xml.parse(entry, {})) as PackageConfigType
  return packageConfig
}
