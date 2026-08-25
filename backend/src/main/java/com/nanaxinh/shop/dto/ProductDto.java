package com.nanaxinh.shop.dto;

import java.math.BigDecimal;

public record ProductDto(
    Long id,
    Long categoryId,
    String name,
    String slug,
    String sku,
    String description,
    BigDecimal price,
    BigDecimal salePrice,
    String imageUrl,
    Boolean featured,
    Integer stockQuantity
) {}
