package com.orderme.ordermeapi.dto;

import com.orderme.ordermeapi.model.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private ProductCategory category;
    private String imageUrl;
    private Boolean isAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Static factory method to convert from entity
    public static ProductDto fromEntity(com.orderme.ordermeapi.model.Product product) {
        return new ProductDto(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getCategory(),
            product.getImageUrl(),
            product.getIsAvailable(),
            product.getCreatedAt(),
            product.getUpdatedAt()
        );
    }
}
