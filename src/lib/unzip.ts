import { BlobReader, ZipReader, Entry } from "@zip.js/zip.js"

export async function unzip(data: File): Promise<Entry[]> {
  const zipFileReader = new BlobReader(data)

  const entries = await new ZipReader(zipFileReader).getEntries()
  
  return entries
}
