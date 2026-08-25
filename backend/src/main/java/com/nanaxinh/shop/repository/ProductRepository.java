package com.nanaxinh.shop.repository;

import com.nanaxinh.shop.entity.Product;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByActiveTrueOrderByCreatedAtDesc();
  List<Product> findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc();
  Optional<Product> findBySlugAndActiveTrue(String slug);
}
