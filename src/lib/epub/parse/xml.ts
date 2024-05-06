import { getText } from "@/lib/unzip"
import { Entry } from "@zip.js/zip.js"
import { XMLParser, X2jOptions } from "fast-xml-parser"

const defaultOption = Object.freeze({
  ignoreAttributes: false,
  textNodeName: "value",
  htmlEntities: true,
  removeNSPrefix: true,
  attributesGroupName: "attrs",
  attributeNamePrefix: "",
})

const defaultParser = new XMLParser(defaultOption)

const xml = {
  async parse(entry: Entry, options?: X2jOptions) {
    const entryText = await getText(entry)
    if (!options) {
      return defaultParser.parse(entryText)
    } else {
      const parser = new XMLParser(Object.assign({}, defaultOption, options))
      return parser.parse(entryText)
    }
  },
}

export default xml
