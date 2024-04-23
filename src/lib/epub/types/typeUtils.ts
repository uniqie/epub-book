type RequiredKeys<T> = {
    [K in keyof T]-?: T extends Record<K, T[K]> ? K : never
}[keyof T];


export type RequiredPointTag<T, K> = {
  [P in Extract<keyof T, K>]: T[P]
} & {
  [U in Exclude<keyof T, K>]?: T[U]
}

export type Attribute<T> = RequiredPointTag<
  {
    [P in keyof T as `attr_${string & P}`]?: T[P]
  },
 `attr_${ string & RequiredKeys<T>}`
>
