package com.fooddelivery.auth.service;

import com.fooddelivery.auth.model.Role;
import com.fooddelivery.auth.model.User;
import com.fooddelivery.auth.repository.UserRepository;
import com.fooddelivery.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    @Override
    public Map<String, String> register(String email, String password, Role role) {
        if (userRepository.findByEmail(email).isPresent())
            throw  new RuntimeException("User Already Exist");

        if (isValidUser(email, password, role)) {
            User user = new User(email , passwordEncoder.encode(password),role);
            userRepository.save(user);

            // Generate tokens
            String accessToken = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }
        return Map.of();
    }

    @Override
    public Map<String, String> login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("Invalid Credentials"));

        if(!passwordEncoder.matches(password,user.getPasswordHash())){
            throw new RuntimeException("Invalid credentials");
        }

        String accessToken = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());
        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
    }

    @Override
    public Map<String, String> refreshToken(String refreshToken) {
        var claims = jwtUtil.validateToken(refreshToken);
        String email = claims.getSubject();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) throw new RuntimeException("User not found");

        String newAccessToken = jwtUtil.generateToken(email, userOpt.get().getRole().name());
        return Map.of("accessToken", newAccessToken);
    }

    public Boolean isValidUser(String email , String password ,Role role){
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email cannot be null or blank");
        }
        if (password == null || password.isBlank() || password.length() < 6 ) {
            throw new IllegalArgumentException("Password cannot be null or blank and should b greater than 6");
        }
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
        return true;

    }

}
