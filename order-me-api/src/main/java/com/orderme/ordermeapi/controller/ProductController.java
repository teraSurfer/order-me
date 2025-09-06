package com.orderme.ordermeapi.controller;

import com.orderme.ordermeapi.dto.ProductDto;
import com.orderme.ordermeapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // In production, specify exact origins
public class ProductController {
    
    private final ProductService productService;
    
    @GetMapping("/featured")
    public ResponseEntity<List<ProductDto>> getFeaturedProducts() {
        log.info("GET /api/products/featured - Fetching featured products");
        try {
            // For now, return mock data to test the frontend
            List<ProductDto> featuredProducts = getMockFeaturedProducts();
            log.info("Successfully retrieved {} featured products", featuredProducts.size());
            return ResponseEntity.ok(featuredProducts);
        } catch (Exception e) {
            log.error("Error fetching featured products: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Mock data method for testing
    private List<ProductDto> getMockFeaturedProducts() {
        return Arrays.asList(
            new ProductDto(1L, "Bruschetta", 
                "Toasted bread topped with tomatoes, garlic, and fresh basil", 
                new BigDecimal("8.99"), 
                com.orderme.ordermeapi.model.ProductCategory.APPETIZER,
                "https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=400",
                true, LocalDateTime.now(), LocalDateTime.now()),
            
            new ProductDto(2L, "Grilled Salmon", 
                "Fresh Atlantic salmon grilled to perfection with herbs", 
                new BigDecimal("24.99"), 
                com.orderme.ordermeapi.model.ProductCategory.MAIN_COURSE,
                "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
                true, LocalDateTime.now(), LocalDateTime.now()),
            
            new ProductDto(3L, "Beef Tenderloin", 
                "Premium cut beef tenderloin with red wine reduction sauce", 
                new BigDecimal("32.99"), 
                com.orderme.ordermeapi.model.ProductCategory.MAIN_COURSE,
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
                true, LocalDateTime.now(), LocalDateTime.now()),
            
            new ProductDto(4L, "Tiramisu", 
                "Classic Italian dessert with coffee-flavored mascarpone cream", 
                new BigDecimal("9.99"), 
                com.orderme.ordermeapi.model.ProductCategory.DESSERT,
                "https://images.unsplash.com/photo-1571877227200-a98ea607e9?w=400",
                true, LocalDateTime.now(), LocalDateTime.now()),
            
            new ProductDto(5L, "Fresh Fruit Smoothie", 
                "Blend of seasonal fruits with yogurt and honey", 
                new BigDecimal("6.99"), 
                com.orderme.ordermeapi.model.ProductCategory.BEVERAGE,
                "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
                true, LocalDateTime.now(), LocalDateTime.now()),
            
            new ProductDto(6L, "Truffle Fries", 
                "Crispy fries tossed with truffle oil and parmesan cheese", 
                new BigDecimal("8.99"), 
                com.orderme.ordermeapi.model.ProductCategory.SIDE_DISH,
                "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
                true, LocalDateTime.now(), LocalDateTime.now())
        );
    }
    
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        log.info("GET /api/products - Fetching all products");
        try {
            List<ProductDto> products = productService.getAllProducts();
            log.info("Successfully retrieved {} products", products.size());
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error fetching all products: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        log.info("GET /api/products/{} - Fetching product by id", id);
        try {
            ProductDto product = productService.getProductById(id);
            log.info("Successfully retrieved product: {}", product.getName());
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            log.warn("Product not found with id: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching product with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        log.info("POST /api/products - Creating new product: {}", productDto.getName());
        try {
            ProductDto createdProduct = productService.createProduct(productDto);
            log.info("Successfully created product with id: {}", createdProduct.getId());
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e) {
            log.error("Error creating product: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String category) {
        log.info("GET /api/products/category/{} - Fetching products by category", category);
        try {
            List<ProductDto> products = productService.getProductsByCategory(category);
            log.info("Successfully retrieved {} products for category: {}", products.size(), category);
            return ResponseEntity.ok(products);
        } catch (RuntimeException e) {
            log.warn("Invalid category: {}", category);
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Error fetching products for category {}: {}", category, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
