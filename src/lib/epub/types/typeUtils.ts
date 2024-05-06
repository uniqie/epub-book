type RequiredKeys<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? K : never
}[keyof T]

export type RequiredPointTag<T, K> = {
  [P in Extract<keyof T, K>]: T[P]
} & {
  [U in Exclude<keyof T, K>]?: T[U]
}

export type Attrs<T> = RequiredKeys<T> extends never
  ? {
      attrs?: Attribute<T>
    }
  : {
      attrs: Attribute<T>
    }

export type Attribute<T> = RequiredPointTag<
  {
    [P in keyof T as `${string & P}`]?: T[P]
  },
  `${string & RequiredKeys<T>}`
>

export type ArrayOrObj<T> = T[] | T