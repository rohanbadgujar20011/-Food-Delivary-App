package com.fooddelivery.auth.dto;

import com.fooddelivery.auth.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private Role role;
}