package com.nanaxinh.shop.repository;

import com.nanaxinh.shop.entity.UserAccount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
  Optional<UserAccount> findByEmailIgnoreCase(String email);
  Optional<UserAccount> findByPasswordResetToken(String passwordResetToken);
  boolean existsByEmailIgnoreCase(String email);
}
