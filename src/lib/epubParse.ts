import { Entry, TextWriter } from "@zip.js/zip.js"
import { XMLParser } from "fast-xml-parser"

const epubParse = {
  parser: new XMLParser(),
  async resolveContainer(entry: Entry) {
    if (!entry) return new Error("invalid container.xml")

    // const textWriter = new TextWriter('utf-8')

    // const data = await entry.getData(textWriter)
    // this.parser.parse(entry.getData())
  },
}

export default epubParse
