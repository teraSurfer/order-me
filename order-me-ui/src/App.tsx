import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductManagementPage from './pages/ProductManagementPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductManagementPage />} />
          {/* Add more routes here as needed */}
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
