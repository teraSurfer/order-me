import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'

// Generic API response type
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

// Generic error type
export interface ApiError {
  message: string
  status?: number
}

// Custom hook for GET requests
export function useApiQuery<T>(
  queryKey: string[],
  fetchFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
    ...options,
  })
}

// Custom hook for POST/PUT/DELETE requests
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries()
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

// Utility function to create query keys
export const createQueryKey = {
  orders: () => ['orders'],
  order: (id: string) => ['orders', id],
  user: (id: string) => ['user', id],
  // Add more query key factories as needed
}
