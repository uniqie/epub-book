import { BlobReader, ZipReader, Entry, TextWriter } from "@zip.js/zip.js"

export async function unzip(data: File): Promise<Entry[]> {
  const zipFileReader = new BlobReader(data)
  const entries = await new ZipReader(zipFileReader).getEntries()
  return entries
}

export async function getText(
  entry: Entry,
  encoding: string = "utf-8"
): Promise<string> {
  const str = (await entry.getData?.(new TextWriter(encoding))) || ""
  return str
}
