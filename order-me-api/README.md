# OrderMe API

A Spring Boot REST API for the OrderMe food ordering application, providing endpoints for product management and order processing.

## 🚀 Features

- **Spring Boot 3.5.4** with Java 17
- **Spring Data JPA** for data persistence
- **H2 Database** for development (easily switchable to PostgreSQL)
- **RESTful API** endpoints
- **CORS enabled** for frontend integration
- **Comprehensive logging**
- **Mock data** for immediate testing

## 📦 Dependencies

### Core Dependencies
- `spring-boot-starter-web` - Web application starter
- `spring-boot-starter-data-jpa` - JPA and Hibernate
- `spring-boot-devtools` - Development tools
- `h2database` - H2 in-memory database
- `postgresql` - PostgreSQL driver (for production)
- `lombok` - Reduces boilerplate code

### Development Dependencies
- `spring-boot-starter-test` - Testing support

## 🏗️ Project Structure

```
src/main/java/com/orderme/ordermeapi/
├── controller/           # REST controllers
│   └── ProductController.java
├── service/             # Business logic services
│   └── ProductService.java
├── repository/          # Data access layer
│   └── ProductRepository.java
├── model/              # Entity classes
│   ├── Product.java
│   └── ProductCategory.java
├── dto/                # Data Transfer Objects
│   └── ProductDto.java
├── config/             # Configuration classes
│   └── DataInitializer.java
└── OrderMeApiApplication.java
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. **Clone the repository:**
```bash
git clone <repository-url>
cd order-me-api
```

2. **Build the project:**
```bash
mvn clean install
```

3. **Run the application:**
```bash
mvn spring-boot:run
```

4. **Access the application:**
   - API Base URL: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/h2-console`

### H2 Database Console
- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** `password`

## 📡 API Endpoints

### Products

#### Get Featured Products
```http
GET /api/products/featured
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Bruschetta",
    "description": "Toasted bread topped with tomatoes, garlic, and fresh basil",
    "price": 8.99,
    "category": "APPETIZER",
    "imageUrl": "https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=400",
    "isAvailable": true,
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
]
```

#### Get All Products
```http
GET /api/products
```

#### Get Product by ID
```http
GET /api/products/{id}
```

#### Get Products by Category
```http
GET /api/products/category/{category}
```

**Available Categories:**
- `APPETIZER`
- `MAIN_COURSE`
- `DESSERT`
- `BEVERAGE`
- `SIDE_DISH`

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

## 🔧 Configuration

### Application Properties
The application uses H2 in-memory database for development. To switch to PostgreSQL:

1. **Update `application.properties`:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/orderme
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

2. **Comment out H2 dependency** in `pom.xml`

### CORS Configuration
CORS is enabled for all origins in development. For production, update the controller:

```java
@CrossOrigin(origins = {"https://yourdomain.com", "https://www.yourdomain.com"})
```

## 📊 Sample Data

The application includes sample data for immediate testing:

- **Appetizers:** Bruschetta, Spinach Artichoke Dip
- **Main Courses:** Grilled Salmon, Beef Tenderloin, Chicken Marsala
- **Desserts:** Tiramisu, Chocolate Lava Cake
- **Beverages:** Fresh Fruit Smoothie, Craft Beer Selection
- **Side Dishes:** Truffle Fries, Grilled Asparagus, Wild Rice Pilaf

## 🧪 Testing

### Manual Testing
1. Start the application
2. Use a tool like Postman or curl to test endpoints
3. Access H2 console to verify data

### Example curl commands:
```bash
# Get featured products
curl http://localhost:8080/api/products/featured

# Get all products
curl http://localhost:8080/api/products

# Get products by category
curl http://localhost:8080/api/products/category/APPETIZER
```

## 📝 Logging

The application provides comprehensive logging:
- **Application logs:** DEBUG level for business logic
- **SQL logs:** DEBUG level for database queries
- **Web logs:** DEBUG level for HTTP requests

## 🔄 Development Workflow

1. **Add new entities** in the `model` package
2. **Create DTOs** in the `dto` package
3. **Add repositories** in the `repository` package
4. **Implement services** in the `service` package
5. **Create controllers** in the `controller` package
6. **Update sample data** in `DataInitializer`

## 🚀 Production Deployment

1. **Switch to PostgreSQL** database
2. **Update CORS origins** to production domains
3. **Configure logging levels** for production
4. **Set up proper security** (authentication, authorization)
5. **Configure monitoring** and health checks

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [H2 Database Documentation](https://www.h2database.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
