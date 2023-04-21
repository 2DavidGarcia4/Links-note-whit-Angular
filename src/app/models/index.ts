export interface Group {
  id: number
  name: string
  color: string
  emoji?: string
  description?: string
}

export interface Link {
  id: number
  url: string
  name: string
  groupId?: number
  description?: string
}

export interface FocusedElement {
  id: number
  url?: string
  name: string
  type: 'link' | 'group'
  color?: string
  emoji?: string
  groupId?: number
  position?: number
  description?: string
}

export interface FormElementData {
  type: 'link' | 'group'
  element?: FocusedElement
}

export interface Tooltip {
  top: number
  left: number
  type: 'normal' | 'description'
  content: string
  direction: 'top' | 'left' | 'right' | 'bottom'
} 

export interface Option {
  top: number
  left: number
  type: 'add' | 'element',
}