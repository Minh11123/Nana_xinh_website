package com.nanaxinh.shop.controller;

import com.nanaxinh.shop.dto.AuthResponse;
import com.nanaxinh.shop.dto.ForgotPasswordRequest;
import com.nanaxinh.shop.dto.ForgotPasswordResponse;
import com.nanaxinh.shop.dto.LoginRequest;
import com.nanaxinh.shop.dto.MessageResponse;
import com.nanaxinh.shop.dto.ResetPasswordRequest;
import com.nanaxinh.shop.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest request) {
    return authService.login(request);
  }

  @PostMapping("/logout")
  public MessageResponse logout(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String token) {
    return authService.logout(token);
  }

  @PostMapping("/forgot-password")
  public ForgotPasswordResponse forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
    return authService.forgotPassword(request);
  }

  @PostMapping("/reset-password")
  public MessageResponse resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
    return authService.resetPassword(request);
  }
}
