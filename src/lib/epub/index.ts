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

import getAttribute from "./utils/getAttribute"

class Epub {
  private containerConfig?: ContainerConfigType
  private packageConfig?: PackageConfigType

  public entriesObj: EntriesObjType
  public packageRootPath?: string
  public loadStatus: LoadStatusType

  constructor(file: File, hooks?: AsyncOperationHooksType) {
    this.entriesObj = {}
    this.loadStatus = "loading"

    /**
     * 解压 -> 生成entriesObj
     * entriesObj["META-INF/container.xml"] -> 生成containerConfig，获得packagePath
     * packagePath -> 获得packageConfig
     * 处理回调钩子
     */
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
        const packagePath = getAttribute(
          this.containerConfig.container.rootfiles[0].rootfile,
          "full-path"
        )
        this.packageRootPath = packagePath?.includes("/")
          ? packagePath?.replace(/\/.*\.opf/, "")
          : ""

        if (!packagePath || !this.entriesObj[packagePath]) {
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

  getConfig() {
    return {
      containerConfig: this.containerConfig,
      packageConfig: this.packageConfig,
    }
  }
}

export default Epub
