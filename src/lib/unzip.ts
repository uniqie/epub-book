import { BlobReader, ZipReader, TextWriter } from "@zip.js/zip.js"

export async function unzip(data: File) {
  const zipFileReader = new BlobReader(data)

  const entries = await new ZipReader(zipFileReader).getEntries()

  if (entries.length > 0) {
    const writer = new TextWriter()

    if (entries[4]?.getData) {
      await entries[4].getData(writer)
      return await writer.getData()
    }
  }
}
