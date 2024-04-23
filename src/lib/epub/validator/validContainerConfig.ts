import { ContainerConfigType } from "../types"

/**
 * https://www.w3.org/TR/epub-33/#sec-container.xml-container-elem
 * 校验container.xml配置
 * @param config
 */
export default function (config: any) {
  let flag = false
  if (typeof config === "object") {
    const temp = config as Partial<ContainerConfigType>
    if (temp.container?.attr_version === "1.0") {
      const rootfile = temp.container.rootfiles?.[0]?.rootfile
      if (
        rootfile["attr_full-path"] &&
        rootfile["attr_media-type"] === "application/oebps-package+xml"
      ) {
        flag = true
      }
    }
  }
  return flag
}
