import '@tanstack/react-table'

type ValueType = 'string' | 'date' | 'link' | 'custom'

declare module '@tanstack/react-table' {
  // ValueType 에 따라 유니온으로 정의하고 싶은데 적용이 안 되넹...
  interface ColumnMeta {
    valueType: ValueType
    linkType?: 'internal' | 'external'
  }
}
