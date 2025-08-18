
// Product related types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  imageUrl?: string
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}

export const ProductCategory = {
  APPETIZER: 'APPETIZER',
  MAIN_COURSE: 'MAIN_COURSE',
  DESSERT: 'DESSERT',
  BEVERAGE: 'BEVERAGE',
  SIDE_DISH: 'SIDE_DISH'
} as const

export type ProductCategory = typeof ProductCategory[keyof typeof ProductCategory]

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  size: number
  totalPages: number
}

export interface ApiErrorResponse {
  message: string
  status: number
  timestamp: string
  path: string
}

