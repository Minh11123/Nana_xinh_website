package com.nanaxinh.shop.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;

public record OrderRequest(
    @NotBlank String fullName,
    @NotBlank String phone,
    @Email String email,
    @NotBlank String address,
    LocalDate deliveryDate,
    String deliveryTimeSlot,
    String note,
    @NotEmpty List<@Valid Item> items
) {
  public record Item(@NotNull Long productId, @Positive Integer quantity) {}
}
