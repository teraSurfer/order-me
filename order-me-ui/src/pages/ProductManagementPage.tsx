import React, { useState } from 'react'
import { Container, Row, Col, Button, Card, Table, Badge, Alert, Modal } from 'react-bootstrap'
import { useProductsQuery, useDeleteProductMutation, useProductUIStore } from '../stores/productStore'
import ProductForm from '../components/ProductForm'
import type { Product } from '../types'
import { formatCurrency } from '../utils'

const ProductManagementPage: React.FC = () => {
  const { 
    data: products = [], 
    isLoading, 
    error, 
    refetch 
  } = useProductsQuery()

  const deleteProductMutation = useDeleteProductMutation()
  
  const {
    selectedProduct,
    showCreateModal,
    showDeleteModal,
    setSelectedProduct,
    setShowCreateModal,
    setShowDeleteModal,
    resetModals,
  } = useProductUIStore()

  const [successMessage, setSuccessMessage] = useState('')

  const handleCreateSuccess = (product: Product) => {
    setShowCreateModal(false)
    setSuccessMessage(`Product "${product.name}" created successfully!`)
    setTimeout(() => setSuccessMessage(''), 5000)
  }

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      try {
        await deleteProductMutation.mutateAsync(selectedProduct.id)
        setSuccessMessage(`Product "${selectedProduct.name}" deleted successfully!`)
        setTimeout(() => setSuccessMessage(''), 5000)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
    resetModals()
  }

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'APPETIZER': return 'primary'
      case 'MAIN_COURSE': return 'success'
      case 'DESSERT': return 'warning'
      case 'BEVERAGE': return 'info'
      case 'SIDE_DISH': return 'secondary'
      default: return 'light'
    }
  }

  if (isLoading && products.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Product Management</h2>
              <p className="text-muted">Manage your restaurant's product catalog</p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add New Product
            </Button>
          </div>
        </Col>
      </Row>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => refetch()}>
          Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Products ({products.length})</h5>
                {isLoading && (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {products.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-box display-1 text-muted"></i>
                  <h4 className="mt-3">No products found</h4>
                  <p className="text-muted">Get started by adding your first product</p>
                  <Button
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Add First Product
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {product.imageUrl && (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="rounded me-3"
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                              )}
                              <div>
                                <div className="fw-medium">{product.name}</div>
                                <small className="text-muted">
                                  {product.description.substring(0, 50)}
                                  {product.description.length > 50 && '...'}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Badge bg={getCategoryBadgeVariant(product.category)}>
                              {product.category.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="fw-medium">
                            {formatCurrency(product.price)}
                          </td>
                          <td>
                            <Badge bg={product.isAvailable ? 'success' : 'danger'}>
                              {product.isAvailable ? 'Available' : 'Unavailable'}
                            </Badge>
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </small>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {/* TODO: Implement edit */}}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteClick(product)}
                                disabled={deleteProductMutation.isPending}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create Product Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the product{' '}
            <strong>"{selectedProduct?.name}"</strong>?
          </p>
          <p className="text-muted">
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ? 'Deleting...' : 'Delete Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ProductManagementPage
