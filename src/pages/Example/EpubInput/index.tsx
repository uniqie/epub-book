import { useState } from "react"

import { Input } from "@/components/Epub"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import DataTable from "@/components/DataTable"
import { Button } from "@/components/ui/button"

import Book from "@/lib/book"
import { type BookBrief } from "./interface"
import { BookShelfColumns, BookDataColumns } from "./configuration"

function EpubInput() {

  const [books, setBooks] = useState<Book[]>([])
  const [data, setData] = useState<BookBrief[]>([])

  const handleBooksChange = (files: FileList | null) => {
    setData(files ? Array.from(files) : [])
  }

  const handleUnzip = () => {
    const books: Book[] = []
    data.forEach((file) => {
      books.push(new Book(file as File))
    })
    Promise.all(books.map((book) => book.getEntries())).then(() => {
      setBooks(books)
      console.log(books)
    })
  }

  return (
    <>
      <Card className="m-4 mt-10 p-2">
        <CardTitle className="m-4">epub-button</CardTitle>
        <CardContent>
          {data.length > 0 ? (
            <DataTable columns={BookShelfColumns} data={data} striped />
          ) : (
            <Input onChange={handleBooksChange} />
          )}
        </CardContent>
      </Card>
      <Button disabled={!data?.length} onClick={handleUnzip}>
        unzip
      </Button>

      <Card className="mt-10">
        <CardTitle className="m-8">细则</CardTitle>
        <CardContent>
          {books[0]?.entries && (
            <DataTable columns={BookDataColumns} data={books[0].entries} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default EpubInput
