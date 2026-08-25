package com.nanaxinh.shop.dto;

import com.nanaxinh.shop.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;

public record OrderDto(
    Long id,
    String customerName,
    String phone,
    BigDecimal subtotal,
    BigDecimal shippingFee,
    BigDecimal total,
    OrderStatus status,
    Instant createdAt
) {}
