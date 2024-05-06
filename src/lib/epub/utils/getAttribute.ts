export default function <T extends { attrs: any }, P extends keyof T["attrs"]>(
  tag: T,
  attributeName: P
): T["attrs"][string & P] {
  return tag.attrs[attributeName]
}
