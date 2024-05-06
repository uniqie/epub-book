import { ContainerConfigType } from "../types"
import getAttribute from "../utils/getAttribute"

/**
 * https://www.w3.org/TR/epub-33/#sec-container.xml-container-elem
 * 校验container.xml配置
 * @param config
 */
export default function (config: any) {
  let flag = false
  if (typeof config === "object") {
    const temp = config as ContainerConfigType
    if (getAttribute(temp.container, "version") === "1.0") {
      const rootfile = temp.container.rootfiles?.[0]?.rootfile
      if (
        getAttribute(rootfile, "full-path") &&
        getAttribute(rootfile, "media-type") === "application/oebps-package+xml"
      ) {
        flag = true
      }
    }
  }
  return flag
}
