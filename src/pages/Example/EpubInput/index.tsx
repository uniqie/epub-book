import { useState } from "react"
import { NotebookTabs } from "lucide-react"

import { Input } from "@/components/Epub"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Space } from "@/components/Space"

import Book from "@/lib/book"

function EpubInput() {
  const [books, setBooks] = useState<Book[]>([])

  const handleBooksChange = async (files: FileList | null) => {
    if (files) {
      for (const file of Array.from(files)) {
        const book = new Book()
        await book.load(file)
        console.log(book)
        books.push(book)
      }
      setBooks(books)
    }
  }

  return (
    <>
      <Card className="my-4 min-w-96 bg-zinc-200 shadow shadow-white">
        <CardHeader>
          <CardTitle>
            <Space>
              <NotebookTabs />
              epub
            </Space>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input onChange={handleBooksChange} />
        </CardContent>
      </Card>

      {/* {books.length > 0 && books.map((b) => b.getIntroduction())} */}
    </>
  )
}

export default EpubInput
