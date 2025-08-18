package com.orderme.ordermeapi.repository;

import com.orderme.ordermeapi.model.Product;
import com.orderme.ordermeapi.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCategory(ProductCategory category);
    
    List<Product> findByIsAvailableTrue();
    
    @Query("SELECT p FROM Product p WHERE p.isAvailable = true ORDER BY p.createdAt DESC LIMIT 6")
    List<Product> findFeaturedProducts();
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByCategoryAndIsAvailableTrue(ProductCategory category);
}
