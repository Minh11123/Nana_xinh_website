package com.nanaxinh.shop.controller;

import com.nanaxinh.shop.dto.ProductDto;
import com.nanaxinh.shop.dto.ProductRequest;
import com.nanaxinh.shop.service.CatalogService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final CatalogService catalogService;

  public ProductController(CatalogService catalogService) {
    this.catalogService = catalogService;
  }

  @GetMapping
  public List<ProductDto> list(@RequestParam(required = false) Boolean featured) {
    return catalogService.listProducts(featured);
  }

  @GetMapping("/{slug}")
  public ProductDto getBySlug(@PathVariable String slug) {
    return catalogService.getProduct(slug);
  }

  @PostMapping
  public ProductDto create(@Valid @RequestBody ProductRequest request) {
    return catalogService.createProduct(request);
  }

  @PutMapping("/{id}")
  public ProductDto update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
    return catalogService.updateProduct(id, request);
  }
}
