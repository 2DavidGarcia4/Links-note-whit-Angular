export interface FormCreateData {
  type: 'group' | 'link'
  element?: {
    name: string
    position: number
    description: string,
    color?: string
  }
}