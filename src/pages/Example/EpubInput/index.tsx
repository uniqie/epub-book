import { useState } from "react"
import { NotebookTabs } from "lucide-react"

import { Input } from "@/components/Epub"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Space } from "@/components/Space"

import Book from "@/lib/book"

function EpubInput() {
  const [books, setBooks] = useState<Book[]>([])

  const handleBooksChange = (files: FileList | null) => {
    if (files) {
      const books: Book[] = Array.from(files).map(
        (file) => new Book(file, { immediate: true })
      )
      // Promise.all(books.map((book) => book.resolveEntries())).then(() => {
      //   setBooks(books)
      // })
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

      {books.length > 0 && books.map((b) => b.getIntroduction())}
    </>
  )
}

export default EpubInput
