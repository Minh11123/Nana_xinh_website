package com.nanaxinh.shop.service;

import com.nanaxinh.shop.dto.AuthResponse;
import com.nanaxinh.shop.dto.AuthUserDto;
import com.nanaxinh.shop.dto.ForgotPasswordRequest;
import com.nanaxinh.shop.dto.ForgotPasswordResponse;
import com.nanaxinh.shop.dto.LoginRequest;
import com.nanaxinh.shop.dto.MessageResponse;
import com.nanaxinh.shop.dto.ResetPasswordRequest;
import com.nanaxinh.shop.entity.UserAccount;
import com.nanaxinh.shop.repository.UserAccountRepository;
import com.nanaxinh.shop.security.JwtService;
import com.nanaxinh.shop.security.TokenBlacklistService;
import jakarta.persistence.EntityNotFoundException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
  private final UserAccountRepository userAccountRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final TokenBlacklistService tokenBlacklistService;
  private final SecureRandom secureRandom = new SecureRandom();
  private final String frontendBaseUrl;

  public AuthService(
      UserAccountRepository userAccountRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      TokenBlacklistService tokenBlacklistService,
      @Value("${app.frontend-base-url}") String frontendBaseUrl
  ) {
    this.userAccountRepository = userAccountRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.tokenBlacklistService = tokenBlacklistService;
    this.frontendBaseUrl = frontendBaseUrl;
  }

  @Transactional
  public AuthResponse login(LoginRequest request) {
    UserAccount user = userAccountRepository.findByEmailIgnoreCase(request.email())
        .filter(account -> Boolean.TRUE.equals(account.getActive()))
        .orElseThrow(() -> new BadCredentialsException("Email hoặc mật khẩu không đúng"));

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
    }

    user.setLastLoginAt(Instant.now());
    user.setUpdatedAt(Instant.now());
    JwtService.TokenResult token = jwtService.createToken(user);
    return new AuthResponse(token.token(), "Bearer", token.expiresAt(), toUserDto(user));
  }

  public MessageResponse logout(String bearerToken) {
    String token = extractToken(bearerToken);

    if (token != null && jwtService.isValid(token)) {
      tokenBlacklistService.revoke(token, jwtService.getExpiresAt(token));
    }

    return new MessageResponse("Đã đăng xuất");
  }

  @Transactional
  public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
    UserAccount user = userAccountRepository.findByEmailIgnoreCase(request.email())
        .filter(account -> Boolean.TRUE.equals(account.getActive()))
        .orElse(null);

    if (user == null) {
      return new ForgotPasswordResponse(
          "Nếu email tồn tại, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu.",
          null,
          null,
          null
      );
    }

    String token = createResetToken();
    Instant expiresAt = Instant.now().plusSeconds(30 * 60);
    user.setPasswordResetToken(token);
    user.setPasswordResetExpiresAt(expiresAt);
    user.setUpdatedAt(Instant.now());

    return new ForgotPasswordResponse(
        "Reset token đã được tạo. Khi tích hợp email, token này sẽ được gửi cho quản trị viên.",
        token,
        frontendBaseUrl + "/reset-password?token=" + token,
        expiresAt
    );
  }

  @Transactional
  public MessageResponse resetPassword(ResetPasswordRequest request) {
    UserAccount user = userAccountRepository.findByPasswordResetToken(request.token())
        .orElseThrow(() -> new EntityNotFoundException("Reset token không hợp lệ"));

    if (user.getPasswordResetExpiresAt() == null || user.getPasswordResetExpiresAt().isBefore(Instant.now())) {
      throw new BadCredentialsException("Reset token đã hết hạn");
    }

    user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
    user.setPasswordResetToken(null);
    user.setPasswordResetExpiresAt(null);
    user.setUpdatedAt(Instant.now());
    return new MessageResponse("Mật khẩu đã được cập nhật");
  }

  private String createResetToken() {
    byte[] bytes = new byte[32];
    secureRandom.nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }

  private String extractToken(String bearerToken) {
    if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
      return null;
    }

    return bearerToken.substring(7);
  }

  private AuthUserDto toUserDto(UserAccount user) {
    return new AuthUserDto(user.getId(), user.getEmail(), user.getFullName(), user.getRole());
  }
}
