import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  // const navigate = useNavigate()

  // const handleLogout = () => {
  //   // TODO: Implement logout logic
  //   console.log('Logout clicked')
  //   navigate('/login')
  // }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Header */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            OrderMe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                Menu
              </Nav.Link>
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
            </Nav>
            {/* <Nav>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="flex-grow-1">
        <Outlet />
      </Container>

      {/* Footer */}
      <footer className="bg-light py-4 mt-auto">
        <Container>
          <div className="text-center text-muted">
            <p className="mb-0">&copy; 2024 OrderMe. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default MainLayout
