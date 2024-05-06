import {
  BlobReader,
  ZipReader,
  Entry,
  TextWriter,
  Data64URIWriter,
} from "@zip.js/zip.js"

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

export async function getBase64(entry: Entry, mimeType?: string) {
  const data = (await entry.getData?.(new Data64URIWriter(mimeType))) || ""
  return data
}
