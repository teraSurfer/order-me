package com.orderme.ordermeapi.service;

import com.orderme.ordermeapi.dto.ProductDto;
import com.orderme.ordermeapi.model.Product;
import com.orderme.ordermeapi.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public List<ProductDto> getFeaturedProducts() {
        log.info("Fetching featured products");
        List<Product> products = productRepository.findFeaturedProducts();
        return products.stream()
                .map(ProductDto::fromEntity)
                .collect(Collectors.toList());
    }
    
    public List<ProductDto> getAllProducts() {
        log.info("Fetching all available products");
        List<Product> products = productRepository.findByIsAvailableTrue();
        return products.stream()
                .map(ProductDto::fromEntity)
                .collect(Collectors.toList());
    }
    
    public ProductDto getProductById(Long id) {
        log.info("Fetching product with id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return ProductDto.fromEntity(product);
    }
    
    public List<ProductDto> getProductsByCategory(String category) {
        log.info("Fetching products by category: {}", category);
        try {
            com.orderme.ordermeapi.model.ProductCategory productCategory = 
                com.orderme.ordermeapi.model.ProductCategory.valueOf(category.toUpperCase());
            List<Product> products = productRepository.findByCategoryAndIsAvailableTrue(productCategory);
            return products.stream()
                    .map(ProductDto::fromEntity)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            log.error("Invalid category: {}", category);
            throw new RuntimeException("Invalid category: " + category);
        }
    }
    
    public ProductDto createProduct(ProductDto productDto) {
        log.info("Creating new product: {}", productDto.getName());
        
        // Create new Product entity
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setCategory(productDto.getCategory());
        product.setImageUrl(productDto.getImageUrl());
        product.setIsAvailable(productDto.getIsAvailable() != null ? productDto.getIsAvailable() : true);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        
        // Save to database
        Product savedProduct = productRepository.save(product);
        
        log.info("Successfully created product with id: {}", savedProduct.getId());
        return ProductDto.fromEntity(savedProduct);
    }
}
