import React, { useEffect } from 'react'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap'
import { useProductFormStore } from '../stores/productFormStore'
import { useCreateProductMutation } from '../stores/productStore'
import type { ProductCategory } from '../types'

interface ProductFormProps {
  onSuccess?: (product: unknown) => void
  onCancel?: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess, onCancel }) => {
  const {
    formData,
    validationErrors,
    isSubmitting,
    updateField,
    clearAllValidationErrors,
    setIsSubmitting,
    resetForm,
    validateForm,
  } = useProductFormStore()

  const createProductMutation = useCreateProductMutation()

  const categories: { value: ProductCategory; label: string }[] = [
    { value: 'APPETIZER', label: 'Appetizer' },
    { value: 'MAIN_COURSE', label: 'Main Course' },
    { value: 'DESSERT', label: 'Dessert' },
    { value: 'BEVERAGE', label: 'Beverage' },
    { value: 'SIDE_DISH', label: 'Side Dish' }
  ]

  // Reset form when component mounts
  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearAllValidationErrors()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl.trim() || undefined,
        isAvailable: formData.isAvailable
      }

      const newProduct = await createProductMutation.mutateAsync(productData)
      
      if (newProduct) {
        resetForm()
        onSuccess?.(newProduct)
      }
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    updateField(field, value)
  }

  const isLoading = isSubmitting || createProductMutation.isPending
  const error = createProductMutation.error

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h4 className="mb-0">Create New Product</h4>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => createProductMutation.reset()}>
            {error instanceof Error ? error.message : 'Failed to create product'}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  isInvalid={!!validationErrors.name}
                  placeholder="Enter product name"
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as ProductCategory)}
                  isInvalid={!!validationErrors.category}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              isInvalid={!!validationErrors.description}
              placeholder="Enter product description"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  isInvalid={!!validationErrors.price}
                  placeholder="0.00"
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <Form.Text className="text-muted">
                  Optional: URL to product image
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="Product is available"
              checked={formData.isAvailable}
              onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Product'}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ProductForm
