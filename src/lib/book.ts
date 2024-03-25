import { Entry } from "@zip.js/zip.js"
import { unzip } from "./unzip"

enum Status {
  pending,
  finished,
  failed,
}

const { pending, finished, failed } = Status

type InitBookOptions = {
  immediate?: boolean
}

class Book {
  private _file?: File
  public entries?: Entry[]
  public loadStatus: Status = pending

  public static loadingLength: number = 0

  constructor(file: File, options?: InitBookOptions) {
    this._file = file
    Book.loadingLength += 1

    if (options?.immediate) {
      this.getEntries()
    }
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
