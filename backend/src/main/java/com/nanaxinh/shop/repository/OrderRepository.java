package com.nanaxinh.shop.repository;

import com.nanaxinh.shop.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
}
