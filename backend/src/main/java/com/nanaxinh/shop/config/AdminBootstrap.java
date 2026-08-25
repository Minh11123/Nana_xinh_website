package com.nanaxinh.shop.config;

import com.nanaxinh.shop.entity.UserAccount;
import com.nanaxinh.shop.entity.UserRole;
import com.nanaxinh.shop.repository.UserAccountRepository;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminBootstrap implements ApplicationRunner {
  private final UserAccountRepository userAccountRepository;
  private final PasswordEncoder passwordEncoder;
  private final String adminEmail;
  private final String adminPassword;
  private final String adminName;

  public AdminBootstrap(
      UserAccountRepository userAccountRepository,
      PasswordEncoder passwordEncoder,
      @Value("${app.bootstrap.admin.email}") String adminEmail,
      @Value("${app.bootstrap.admin.password}") String adminPassword,
      @Value("${app.bootstrap.admin.name}") String adminName
  ) {
    this.userAccountRepository = userAccountRepository;
    this.passwordEncoder = passwordEncoder;
    this.adminEmail = adminEmail;
    this.adminPassword = adminPassword;
    this.adminName = adminName;
  }

  @Override
  public void run(ApplicationArguments args) {
    if (userAccountRepository.existsByEmailIgnoreCase(adminEmail)) {
      return;
    }

    UserAccount admin = new UserAccount();
    admin.setEmail(adminEmail);
    admin.setFullName(adminName);
    admin.setPasswordHash(passwordEncoder.encode(adminPassword));
    admin.setRole(UserRole.ADMIN);
    admin.setActive(true);
    admin.setCreatedAt(Instant.now());
    admin.setUpdatedAt(Instant.now());
    userAccountRepository.save(admin);
  }
}
