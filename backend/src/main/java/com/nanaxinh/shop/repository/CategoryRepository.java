package com.nanaxinh.shop.repository;

import com.nanaxinh.shop.entity.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  List<Category> findByActiveTrueOrderBySortOrderAscNameAsc();
}
