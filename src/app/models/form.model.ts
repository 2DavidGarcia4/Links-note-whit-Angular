export interface FormElementData {
  type: 'group' | 'link'
  element?: {
    id?: number
    name: string
    description: string,
    color?: string
    emoji?: string
  }
}