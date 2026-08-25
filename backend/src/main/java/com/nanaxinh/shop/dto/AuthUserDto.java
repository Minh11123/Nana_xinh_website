package com.nanaxinh.shop.dto;

import com.nanaxinh.shop.entity.UserRole;

public record AuthUserDto(
    Long id,
    String email,
    String name,
    UserRole role
) {}
