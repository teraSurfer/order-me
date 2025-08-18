# OrderMe UI

A modern React-based user interface for the OrderMe food ordering application, built with TypeScript, TanStack Query, and React Bootstrap.

## 🚀 Features

- **Modern React 19** with TypeScript
- **TanStack Query** for efficient data fetching and caching
- **React Bootstrap** for beautiful, responsive UI components
- **React Router** for client-side routing
- **Custom hooks** for API operations
- **Type-safe** API client with error handling
- **Utility functions** for common operations

## 📦 Dependencies

### Core Dependencies
- `react` ^19.1.1
- `react-dom` ^19.1.1
- `@tanstack/react-query` - Data fetching and caching
- `@tanstack/react-query-devtools` - Development tools for React Query
- `react-bootstrap` - UI component library
- `bootstrap` - CSS framework
- `react-router-dom` - Client-side routing

### Development Dependencies
- `typescript` ~5.8.3
- `vite` ^7.1.2 - Build tool and dev server
- `eslint` ^9.33.0 - Code linting

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
│   └── useApi.ts      # API query and mutation hooks
├── layouts/            # Layout components
│   └── MainLayout.tsx # Main application layout
├── pages/              # Page components
│   └── HomePage.tsx   # Home page component
├── services/           # API and external services
│   └── api.ts         # HTTP client and API methods
├── types/              # TypeScript type definitions
│   └── index.ts       # Application types and interfaces
├── utils/              # Utility functions
│   └── index.ts       # Common utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd order-me-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### API Configuration

The application is configured to connect to a Spring Boot backend API. Update the `API_BASE_URL` in `src/services/api.ts` or use environment variables.

## 📱 Components

### MainLayout
- Navigation header with responsive menu
- Footer with company information
- Uses React Router for navigation

### HomePage
- Hero section with call-to-action
- Featured products display
- Features section highlighting app benefits

## 🎣 Custom Hooks

### useApiQuery
Generic hook for GET requests with TanStack Query:

```typescript
const { data, isLoading, error } = useApiQuery(
  ['products'],
  () => apiClient.get<Product[]>('/products'),
  { staleTime: 1000 * 60 * 5 }
)
```

### useApiMutation
Generic hook for POST/PUT/DELETE requests:

```typescript
const createOrder = useApiMutation(
  (orderData: CreateOrderForm) => apiClient.post('/orders', orderData)
)
```

## 🛠️ API Client

The `ApiClient` class provides a clean interface for HTTP requests:

```typescript
import { apiClient } from './services/api'

// GET request
const products = await apiClient.get<Product[]>('/products')

// POST request
const newOrder = await apiClient.post<Order>('/orders', orderData)

// PUT request
const updatedOrder = await apiClient.put<Order>(`/orders/${id}`, orderData)

// DELETE request
await apiClient.delete(`/orders/${id}`)
```

## 🎨 Styling

- **Bootstrap 5** for responsive grid and components
- **React Bootstrap** for React-specific components
- **Custom CSS** for application-specific styles
- **Utility classes** for spacing, colors, and layout

## 🔍 TypeScript

The application is fully typed with TypeScript:

- **Interfaces** for API responses and form data
- **Enums** for status and category values
- **Generic types** for reusable components
- **Type guards** for runtime type checking

## 🧪 Testing

Testing setup is ready for:
- Unit tests with Jest/Vitest
- Component testing with React Testing Library
- API mocking with MSW

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
