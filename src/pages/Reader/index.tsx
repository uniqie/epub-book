import { useRef, useState } from "react"
import Epub from "epubjs"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

function Reader() {
  const [list, setList] = useState([])
  const path = useRef<FileList | null>()

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e)
    path.current = e.target.files
  }

  const render = () => {
    if (path.current) {
      const files = path.current
      const file = files.item(0)
      if (file) {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = () => {
          const bufferData = fileReader.result as ArrayBuffer
          const book = Epub(bufferData)
          book.renderTo("book", {  flow: "paginated", width: 600, height: 400 }).display()
        }
      } else {
        throw new Error('book')
      }
    } else {
      throw new Error('cannot get path')
    }
  }

  return (
    <>
      <Button onClick={render}>
        {"render"}
      </Button>
      <Input
        id="file"
        className={cn(["w-fit"])}
        accept=".epub"
        type="file"
        onChange={handleValueChange}
      />
      <div id="book"/>
    </>
  )
}

export default Reader
