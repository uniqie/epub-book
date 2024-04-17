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
      <Card className="my-4 p-2">
        <CardTitle className="m-4">epub-input</CardTitle>
        <CardContent>
          {data.length > 0 ? (
            <DataTable columns={BookShelfColumns} data={data} striped />
          ) : (
            <Input onChange={handleBooksChange} />
          )}
        </CardContent>
      </Card>
      <Input onChange={handleBooksChange} />
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

// @ts-ignore
if (module?.hot) {
  // @ts-ignore
  module.hot.accept("./index.tsx", function () {
    console.log("Accepting the updated printMe module!")
    // printMe()
  })
}

export default EpubInput
