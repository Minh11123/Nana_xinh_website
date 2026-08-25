package com.nanaxinh.shop.dto;

import java.time.Instant;

public record ForgotPasswordResponse(
    String message,
    String resetToken,
    String resetUrl,
    Instant expiresAt
) {}
