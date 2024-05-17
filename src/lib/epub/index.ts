import { convertArrToObj } from "@/lib/convert"
import { unzip } from "@/lib/unzip"

import { parseContainer, parseData, parsePackage } from "./parse"
import {
  ContainerConfigType,
  EntriesObjType,
  PackageConfigType,
  AsyncOperationHooksType,
  LoadStatusType,
  DataType,
} from "./types"
import { ObjectNonNullable } from "./types/typeUtils"

import getAttribute from "./utils/getAttribute"

class Epub {
  private file: File
  private hooks?: AsyncOperationHooksType
  private containerConfig?: ContainerConfigType
  private packageConfig?: PackageConfigType
  private data?: DataType

  public entriesObj: EntriesObjType
  public packageRootPath?: string
  public loadStatus: LoadStatusType

  constructor(file: File, hooks?: AsyncOperationHooksType) {
    this.file = file
    this.hooks = hooks
    this.entriesObj = {}
    this.loadStatus = "loading"

    this.build()
  }

  /**
   * 解压 -> 生成entriesObj
   * entriesObj["META-INF/container.xml"] -> 生成containerConfig，获得packagePath
   * packagePath -> 获得packageConfig
   * 处理回调钩子
   */
  private build() {
    const file = this.file
    const hooks = this.hooks

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
        // console.log(parseData(packageConfig))
        this.data = parseData(packageConfig, this.packageRootPath)

        this._updateLoadStatus("success")
        hooks?.onSuccess && hooks.onSuccess()
      })
      .catch((error) => {
        this._updateLoadStatus("failed")
        hooks?.onFailed && hooks.onFailed(error)
      })
      .finally(() => {
        hooks?.onFinished &&
          hooks.onFinished(
            this.loadStatus as Exclude<LoadStatusType, "loading">
          )
      })
  }

  private _updateLoadStatus(status: LoadStatusType) {
    this.loadStatus = status
  }

  private _judgeLoad(): void {
    if (this.loadStatus !== "success") {
      throw new Error("still didn't finish init")
    }
  }

  getConfig() {
    this._judgeLoad()
    const config = {
      containerConfig: this.containerConfig,
      packageConfig: this.packageConfig,
    }
    return config as ObjectNonNullable<typeof config>
  }
  
  getData() {
    this._judgeLoad()
    return this.data as DataType
  }
}

export default Epub
