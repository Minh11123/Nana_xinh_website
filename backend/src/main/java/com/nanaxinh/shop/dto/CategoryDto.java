package com.nanaxinh.shop.dto;

public record CategoryDto(
    Long id,
    String name,
    String slug,
    String description,
    String imageUrl
) {}
