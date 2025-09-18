package com.fooddelivery.auth.service;

import com.fooddelivery.auth.model.Role;

import java.util.Map;

public interface AuthService {

    // Register new user and return tokens
    Map<String, String> register(String email, String password, Role role);

    // Login user and return tokens
    Map<String, String> login(String email, String password);

    // Refresh access token using refresh token
    Map<String, String> refreshToken(String refreshToken);
}
