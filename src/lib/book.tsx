import { Entry } from "@zip.js/zip.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Epub from "./epub"

type InitBookOptions = {
  immediate?: boolean // 立即初始化
}

class Book {
  private epub?: Epub

  // 基础信息
  public readonly name?: string
  public readonly author?: string
  public readonly language?: string

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
    this.name = file.name
    this.epub = new Epub(file)
    console.log(this.epub)
  }

  getIntroduction() {
    return Book.renderIntroduction(this)
  }
}

export default Book
