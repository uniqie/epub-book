import { useRef } from "react"
import Epub, { Book, type Rendition } from "epubjs"
import localforage from "localforage"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

function Reader() {
  const book = useRef<Book>()
  const rendition = useRef<Rendition>()

  const handleValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const bookBufferData = await e.target.files.item(0)?.arrayBuffer()
      if (bookBufferData) {
        book.current = Epub(bookBufferData)
        localforage.setItem("book", bookBufferData)
      }
    }
  }

  const render = async () => {
    if (!book.current) {
      const bookBufferData = await localforage.getItem("book")
      if (bookBufferData) {
        book.current = Epub(bookBufferData)
        rendition.current = book.current.renderTo(
          document.querySelector("#book") as Element,
          {
            width: 400,
            height: 500,
          }
        )
      }
    }
    if (rendition.current) {
      rendition.current.display()
    } else {
      throw new Error("cannot get path")
    }
  }

  return (
    <>
      <Button onClick={render}>{"render"}</Button>
      <Input
        id="file"
        className={cn(["w-fit"])}
        accept=".epub"
        type="file"
        onChange={handleValueChange}
      />
      <div id="book" />
    </>
  )
}

export default Reader
