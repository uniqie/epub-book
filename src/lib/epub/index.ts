import { convertArrToObj } from "@/lib/convert"
import { unzip } from "@/lib/unzip"

import { parseContainer, parsePackage } from "./parse"
import {
  ContainerConfigType,
  EntriesObjType,
  PackageConfigType,
  AsyncOperationHooksType,
  LoadStatusType,
} from "./types"

class Epub {
  private entriesObj: EntriesObjType
  private containerConfig?: ContainerConfigType
  private packageConfig?: PackageConfigType

  private loadStatus: LoadStatusType

  constructor(file: File, hooks?: AsyncOperationHooksType) {
    this.entriesObj = {}
    this.loadStatus = "loading"

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
        const packagePath =
          this.containerConfig.container.rootfiles[0].rootfile["attr_full-path"]
        if (!this.entriesObj[packagePath]) {
          throw new Error(`${packagePath} didn't exist, failed to parse`)
        }
        return parsePackage(this.entriesObj[packagePath])
      })
      .then((packageConfig) => {
        this.packageConfig = packageConfig
        this.loadStatus = "success"
        hooks?.onSuccess && hooks.onSuccess()
      })
      .catch((error) => {
        this.loadStatus = "failed"
        hooks?.onFailed && hooks.onFailed(error)
        // throw error
      })
      .finally(() => {
        hooks?.onFinished &&
          hooks.onFinished(
            this.loadStatus as Exclude<LoadStatusType, "loading">
          )
      })
  }
}

export default Epub
