import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../services/api'
import type { Product, ProductCategory } from '../types'

interface CreateProductData {
  name: string
  description: string
  price: number
  category: ProductCategory
  imageUrl?: string
  isAvailable?: boolean
}

// React Query hooks for API calls
export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.get<Product[]>('/products'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useFeaturedProductsQuery = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => apiClient.get<Product[]>('/products/featured'),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (productData: CreateProductData) => 
      apiClient.post<Product>('/products', productData),
    onSuccess: () => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      apiClient.put<Product>(`/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// Zustand store for UI state only
interface ProductUIState {
  // UI state
  selectedProduct: Product | null
  showCreateModal: boolean
  showDeleteModal: boolean
  showEditModal: boolean
  
  // Actions
  setSelectedProduct: (product: Product | null) => void
  setShowCreateModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  setShowEditModal: (show: boolean) => void
  resetModals: () => void
}

export const useProductUIStore = create<ProductUIState>()(
  devtools(
    (set) => ({
      // Initial state
      selectedProduct: null,
      showCreateModal: false,
      showDeleteModal: false,
      showEditModal: false,

      // Actions
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      setShowCreateModal: (show) => set({ showCreateModal: show }),
      setShowDeleteModal: (show) => set({ showDeleteModal: show }),
      setShowEditModal: (show) => set({ showEditModal: show }),
      resetModals: () => set({ 
        showCreateModal: false, 
        showDeleteModal: false, 
        showEditModal: false,
        selectedProduct: null 
      }),
    }),
    {
      name: 'product-ui-store',
    }
  )
)
