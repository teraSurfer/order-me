import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ProductCategory } from '../types'

interface ProductFormData {
  name: string
  description: string
  price: string
  category: ProductCategory
  imageUrl: string
  isAvailable: boolean
}

interface ProductFormState {
  // Form data
  formData: ProductFormData
  
  // Form state
  validationErrors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
  
  // Actions
  updateField: (field: keyof ProductFormData, value: string | boolean) => void
  setValidationError: (field: string, error: string) => void
  clearValidationError: (field: string) => void
  clearAllValidationErrors: () => void
  setIsSubmitting: (isSubmitting: boolean) => void
  resetForm: () => void
  validateForm: () => boolean
  setFormData: (data: Partial<ProductFormData>) => void
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  category: 'APPETIZER',
  imageUrl: '',
  isAvailable: true
}

export const useProductFormStore = create<ProductFormState>()(
  devtools(
    (set, get) => ({
      // Initial state
      formData: initialFormData,
      validationErrors: {},
      isSubmitting: false,
      isDirty: false,

      // Actions
      updateField: (field, value) => {
        set((state) => ({
          formData: { ...state.formData, [field]: value },
          isDirty: true,
        }))
        
        // Clear validation error for this field
        const { validationErrors } = get()
        if (validationErrors[field]) {
          set((state) => ({
            validationErrors: { ...state.validationErrors, [field]: '' }
          }))
        }
      },

      setValidationError: (field, error) => {
        set((state) => ({
          validationErrors: { ...state.validationErrors, [field]: error }
        }))
      },

      clearValidationError: (field) => {
        set((state) => {
          const newErrors = { ...state.validationErrors }
          delete newErrors[field]
          return { validationErrors: newErrors }
        })
      },

      clearAllValidationErrors: () => {
        set({ validationErrors: {} })
      },

      setIsSubmitting: (isSubmitting) => {
        set({ isSubmitting })
      },

      resetForm: () => {
        set({
          formData: initialFormData,
          validationErrors: {},
          isSubmitting: false,
          isDirty: false,
        })
      },

      validateForm: () => {
        const { formData } = get()
        const errors: Record<string, string> = {}

        if (!formData.name.trim()) {
          errors.name = 'Product name is required'
        }

        if (!formData.description.trim()) {
          errors.description = 'Product description is required'
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
          errors.price = 'Price must be greater than 0'
        }

        if (!formData.category) {
          errors.category = 'Category is required'
        }

        set({ validationErrors: errors })
        return Object.keys(errors).length === 0
      },

      setFormData: (data) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
          isDirty: true,
        }))
      },
    }),
    {
      name: 'product-form-store',
    }
  )
)
