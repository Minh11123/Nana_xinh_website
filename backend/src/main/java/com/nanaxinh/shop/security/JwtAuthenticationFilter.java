package com.nanaxinh.shop.security;

import com.nanaxinh.shop.entity.UserAccount;
import com.nanaxinh.shop.repository.UserAccountRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtService jwtService;
  private final TokenBlacklistService tokenBlacklistService;
  private final UserAccountRepository userAccountRepository;

  public JwtAuthenticationFilter(
      JwtService jwtService,
      TokenBlacklistService tokenBlacklistService,
      UserAccountRepository userAccountRepository
  ) {
    this.jwtService = jwtService;
    this.tokenBlacklistService = tokenBlacklistService;
    this.userAccountRepository = userAccountRepository;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {
    String token = resolveBearerToken(request);

    if (token != null && !tokenBlacklistService.isRevoked(token) && jwtService.isValid(token)) {
      Claims claims = jwtService.parseClaims(token);
      String email = claims.getSubject();
      userAccountRepository.findByEmailIgnoreCase(email)
          .filter(user -> Boolean.TRUE.equals(user.getActive()))
          .ifPresent(user -> authenticate(user, token));
    }

    filterChain.doFilter(request, response);
  }

  private void authenticate(UserAccount user, String token) {
    List<SimpleGrantedAuthority> authorities = List.of(
        new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
    );
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(user.getEmail(), token, authorities);
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

  private String resolveBearerToken(HttpServletRequest request) {
    String authorization = request.getHeader("Authorization");

    if (authorization == null || !authorization.startsWith("Bearer ")) {
      return null;
    }

    return authorization.substring(7);
  }
}
