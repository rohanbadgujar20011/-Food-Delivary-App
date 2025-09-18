package com.fooddelivery.auth.controller;

import com.fooddelivery.auth.dto.LoginRequest;
import com.fooddelivery.auth.dto.RegisterRequest;
import com.fooddelivery.auth.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Map<String , String> register(@RequestBody RegisterRequest registerRequest){
        return authService.register(registerRequest.getEmail() , registerRequest.getPassword(),registerRequest.getRole());
    }

    @PostMapping("/login")
    public  Map<String , String> login( @RequestBody LoginRequest loginRequest){
        return  authService.login(loginRequest.getEmail() , loginRequest.getPassword());
    }

    @PostMapping("/refresh-token")
    public Map<String, String> refresh(@RequestParam String refreshToken) {
        return authService.refreshToken(refreshToken);
    }


}
