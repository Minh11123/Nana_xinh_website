package com.nanaxinh.shop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String slug;

  @Column(nullable = false)
  private String name;

  @Column(unique = true)
  private String sku;

  @Column(columnDefinition = "text")
  private String description;

  @Column(nullable = false, precision = 12, scale = 2)
  private BigDecimal price;

  @Column(precision = 12, scale = 2)
  private BigDecimal salePrice;

  private String imageUrl;
  private Integer stockQuantity = 0;
  private Boolean featured = false;
  private Boolean active = true;
  private Instant createdAt = Instant.now();
  private Instant updatedAt = Instant.now();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getSku() { return sku; }
  public void setSku(String sku) { this.sku = sku; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public BigDecimal getPrice() { return price; }
  public void setPrice(BigDecimal price) { this.price = price; }
  public BigDecimal getSalePrice() { return salePrice; }
  public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public Integer getStockQuantity() { return stockQuantity; }
  public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
  public Boolean getFeatured() { return featured; }
  public void setFeatured(Boolean featured) { this.featured = featured; }
  public Boolean getActive() { return active; }
  public void setActive(Boolean active) { this.active = active; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
  public Instant getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
  public Category getCategory() { return category; }
  public void setCategory(Category category) { this.category = category; }
}
