package com.nanaxinh.shop.dto;

import java.time.Instant;

public record AuthResponse(
    String token,
    String tokenType,
    Instant expiresAt,
    AuthUserDto user
) {}
