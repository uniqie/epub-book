import { Entry } from "@zip.js/zip.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { unzip } from "./unzip"
import epubParse from "./epubParse"

enum Status {
  pending,
  finished,
  failed,
}

const { pending, finished, failed } = Status

type InitBookOptions = {
  immediate?: boolean // 立即初始化
}

class Book {
  // 文件相关
  private _file?: File
  public entries?: Entry[]

  // 基础信息
  public readonly name?: string
  public readonly author?: string
  public readonly language?: string

  // 加载状态
  public loadStatus: Status = pending
  // 加载长度
  public static loadingLength: number = 0

  // 基础介绍
  public static renderIntroduction = (book: Book) => {
    return (
      <Card key={book.name}>
        <CardHeader>
          <CardTitle>{book.name}</CardTitle>
        </CardHeader>
        <CardContent>作者：{book.author}</CardContent>
      </Card>
    )
  }

  constructor(file: File, options?: InitBookOptions) {
    this._file = file
    this.name = file.name

    Book.loadingLength += 1
    if (options?.immediate) {
      this.resolve()
    }
  }

  async resolve() {
    if (!this.entries) {
      await this.getEntries()
    }
    if (this.entries && this.entries.length > 0) {
      const containerEntry = this.entries.find(
        (entry) => entry.filename === "META-INF/container.xml"
      )
      if (containerEntry) {
        epubParse.resolveContainer(containerEntry)
      } else {
        throw new Error(
          "invalid epub, it didn't contain META-INF/container.xml file"
        )
      }
    }
  }

  getIntroduction() {
    return Book.renderIntroduction(this)
  }
  async getEntries() {
    if (this.loadStatus === pending && this._file) {
      try {
        this.entries = await unzip(this._file)
        this.loadStatus = finished
      } catch (error) {
        this.loadStatus = failed
        throw error
      }
      Book.loadingLength -= 1
    }

    if (this.loadStatus === finished) {
      return this.entries
    }
    return null
  }
}

export default Book
