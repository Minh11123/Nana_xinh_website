package com.nanaxinh.shop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

public record ProductRequest(
    @NotNull Long categoryId,
    @NotBlank String name,
    @NotBlank String slug,
    String sku,
    String description,
    @NotNull @PositiveOrZero BigDecimal price,
    BigDecimal salePrice,
    String imageUrl,
    Boolean featured,
    Boolean active,
    Integer stockQuantity
) {}
