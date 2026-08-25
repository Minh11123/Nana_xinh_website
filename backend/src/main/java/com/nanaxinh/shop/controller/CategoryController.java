package com.nanaxinh.shop.controller;

import com.nanaxinh.shop.dto.CategoryDto;
import com.nanaxinh.shop.service.CatalogService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
  private final CatalogService catalogService;

  public CategoryController(CatalogService catalogService) {
    this.catalogService = catalogService;
  }

  @GetMapping
  public List<CategoryDto> list() {
    return catalogService.listCategories();
  }
}
