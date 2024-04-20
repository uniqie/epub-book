import { forwardRef, useImperativeHandle, useRef } from "react"

import { Input } from "@/components/ui/input"

type EpubProps = {
  onChange?: (files: FileList | null) => void
}

const EpubInput = forwardRef<
  {
    getLocalPath: () => string | undefined
    getFiles: () => FileList | null | undefined
  },
  EpubProps
>((props, ref) => {
  const { onChange } = props

  // const [files, setFiles] = useState<FileList>() // eslint-disable-line
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: React.ChangeEvent) => {
    // if (inputRef.current?.files) {
    //   setFiles(inputRef.current.files)
    // }
    onChange && onChange(inputRef.current?.files || null)
  }

  useImperativeHandle(ref, () => {
    return {
      /**
       * 只会返回第一个文件路径
       */
      getLocalPath: () => inputRef.current?.value,
      getFiles: () => inputRef.current?.files,
    }
  })

  // const getUnzipData = () => {}

  return (
    <Input
      ref={inputRef}
      type="file"
      accept=".epub"
      multiple
      max={4}
      onChange={handleChange}
    />
  )
})
export default EpubInput
