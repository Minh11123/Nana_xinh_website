package com.nanaxinh.shop.controller;

import com.nanaxinh.shop.dto.OrderDto;
import com.nanaxinh.shop.dto.OrderRequest;
import com.nanaxinh.shop.service.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  public List<OrderDto> list() {
    return orderService.listOrders();
  }

  @PostMapping
  public OrderDto create(@Valid @RequestBody OrderRequest request) {
    return orderService.createOrder(request);
  }
}
