import Epub from "@/lib/epub"

import { parseEpubConfig } from "./parse"
import { InitBookOptions, BookBasicInfoType } from "./types"

class Book {
  private epub?: Epub
  private options?: InitBookOptions
  private filename?: string

  private basicInfo?: BookBasicInfoType

  constructor(options?: InitBookOptions) {
    this.options = options
    // this.epub = new Epub(file)
  }

  load(file: File) {
    this.filename = file.name
    return new Promise<void>((resolve, reject) => {
      this.epub = new Epub(file, {
        onSuccess: () => {
          if (this.epub) {
            this.basicInfo = parseEpubConfig(this.epub)
          }
          resolve()
        },
        onFailed: (err) => {
          reject(err)
        },
        onFinished: (status) => {},
      })
    })
  }
}

export default Book
