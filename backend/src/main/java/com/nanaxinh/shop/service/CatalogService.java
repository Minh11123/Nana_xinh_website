package com.nanaxinh.shop.service;

import com.nanaxinh.shop.dto.CategoryDto;
import com.nanaxinh.shop.dto.ProductDto;
import com.nanaxinh.shop.dto.ProductRequest;
import com.nanaxinh.shop.entity.Category;
import com.nanaxinh.shop.entity.Product;
import com.nanaxinh.shop.repository.CategoryRepository;
import com.nanaxinh.shop.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CatalogService {
  private final CategoryRepository categoryRepository;
  private final ProductRepository productRepository;

  public CatalogService(CategoryRepository categoryRepository, ProductRepository productRepository) {
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
  }

  @Transactional(readOnly = true)
  public List<CategoryDto> listCategories() {
    return categoryRepository.findByActiveTrueOrderBySortOrderAscNameAsc().stream()
        .map(this::toCategoryDto)
        .toList();
  }

  @Transactional(readOnly = true)
  public List<ProductDto> listProducts(Boolean featured) {
    List<Product> products = Boolean.TRUE.equals(featured)
        ? productRepository.findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc()
        : productRepository.findByActiveTrueOrderByCreatedAtDesc();

    return products.stream().map(this::toProductDto).toList();
  }

  @Transactional(readOnly = true)
  public ProductDto getProduct(String slug) {
    return productRepository.findBySlugAndActiveTrue(slug)
        .map(this::toProductDto)
        .orElseThrow(() -> new EntityNotFoundException("Product not found"));
  }

  @Transactional
  public ProductDto createProduct(ProductRequest request) {
    Category category = categoryRepository.findById(request.categoryId())
        .orElseThrow(() -> new EntityNotFoundException("Category not found"));

    Product product = new Product();
    applyProductRequest(product, request, category);
    return toProductDto(productRepository.save(product));
  }

  @Transactional
  public ProductDto updateProduct(Long id, ProductRequest request) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    Category category = categoryRepository.findById(request.categoryId())
        .orElseThrow(() -> new EntityNotFoundException("Category not found"));

    applyProductRequest(product, request, category);
    product.setUpdatedAt(Instant.now());
    return toProductDto(product);
  }

  private void applyProductRequest(Product product, ProductRequest request, Category category) {
    product.setCategory(category);
    product.setName(request.name());
    product.setSlug(request.slug());
    product.setSku(request.sku());
    product.setDescription(request.description());
    product.setPrice(request.price());
    product.setSalePrice(request.salePrice());
    product.setImageUrl(request.imageUrl());
    product.setFeatured(Boolean.TRUE.equals(request.featured()));
    product.setActive(request.active() == null || request.active());
    product.setStockQuantity(request.stockQuantity() == null ? 0 : request.stockQuantity());
  }

  private CategoryDto toCategoryDto(Category category) {
    return new CategoryDto(
        category.getId(),
        category.getName(),
        category.getSlug(),
        category.getDescription(),
        category.getImageUrl()
    );
  }

  private ProductDto toProductDto(Product product) {
    return new ProductDto(
        product.getId(),
        product.getCategory().getId(),
        product.getName(),
        product.getSlug(),
        product.getSku(),
        product.getDescription(),
        product.getPrice(),
        product.getSalePrice(),
        product.getImageUrl(),
        product.getFeatured(),
        product.getStockQuantity()
    );
  }
}
