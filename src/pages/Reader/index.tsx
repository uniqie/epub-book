import { useRef, useState } from "react"
import ePub from "epubjs"
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
      files.item(0)
    }
  }

  return (
    <>
      <Button>{"render"}</Button>
      <Input
        id="file"
        className={cn(["w-fit"])}
        accept=".epub"
        type="file"
        onChange={handleValueChange}
      />
    </>
  )
}

export default Reader
