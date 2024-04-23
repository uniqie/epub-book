import { convertArrToObj } from "@/lib/convert"
import { unzip } from "@/lib/unzip"

import { parseContainer, parsePackage } from "./parse"
import { ContainerConfigType, EntriesObj } from "./types"


class Epub {
  private entriesObj: EntriesObj
  private containerConfig?: ContainerConfigType

  constructor(file: File) {
    this.entriesObj = {}

    unzip(file)
      .then((entries) => {
        this.entriesObj = convertArrToObj(entries, "filename")
        if (!this.entriesObj["META-INF/container.xml"]) {
          throw new Error(
            "META-INF/container.xml didn't exist, invalid epub format"
          )
        }
        return parseContainer(this.entriesObj["META-INF/container.xml"])
      })
      .then((containerConfig) => {
        this.containerConfig = containerConfig
        const packagePath = this.containerConfig.container.rootfiles[0].rootfile["attr_full-path"]
        if(!this.entriesObj[packagePath]) {
          throw new Error(`${packagePath} didn't exist, failed to parse`)
        }
        return parsePackage(this.entriesObj[packagePath])
      })
  }
}

export default Epub
