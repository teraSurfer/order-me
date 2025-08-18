import React from 'react'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../services/api'
import type { Product } from '../types'

const HomePage: React.FC = () => {
  // Example query using TanStack Query
  const { data: featuredProducts, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => apiClient.get<Product[]>('/products/featured'),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading featured products: {error.message}
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 rounded mb-4">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold">Welcome to OrderMe</h1>
            <p className="lead">
              Order delicious food online and get it delivered to your doorstep.
            </p>
            <Button variant="light" size="lg">
              Order Now
            </Button>
          </Col>
          <Col md={6} className="text-center">
            <div className="bg-white bg-opacity-25 rounded p-4">
              <h3>Quick Stats</h3>
              <Row>
                <Col xs={6}>
                  <div className="text-center">
                    <h4 className="mb-0">100+</h4>
                    <small>Menu Items</small>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="text-center">
                    <h4 className="mb-0">24/7</h4>
                    <small>Service</small>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* Featured Products */}
      <section className="mb-5">
        <h2 className="mb-4">Featured Products</h2>
        <Row>
          {featuredProducts?.slice(0, 6).map((product) => (
            <Col key={product.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                {product.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {product.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="secondary">{product.category}</Badge>
                    <span className="h5 mb-0">${product.price.toFixed(2)}</span>
                  </div>
                  <Button variant="primary" className="mt-3">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Features Section */}
      <section className="mb-5">
        <h2 className="mb-4">Why Choose OrderMe?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-truck fs-1 text-primary"></i>
              </div>
              <h4>Fast Delivery</h4>
              <p className="text-muted">
                Get your food delivered within 30 minutes or it's free!
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-shield-check fs-1 text-success"></i>
              </div>
              <h4>Quality Assured</h4>
              <p className="text-muted">
                We use only the finest ingredients and maintain high hygiene standards.
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-phone fs-1 text-warning"></i>
              </div>
              <h4>Easy Ordering</h4>
              <p className="text-muted">
                Simple and intuitive ordering process with real-time tracking.
              </p>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default HomePage
