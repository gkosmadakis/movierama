package com.movierama.controllers;

import com.movierama.dto.JwtResponse;
import com.movierama.dto.LoginRequest;
import com.movierama.models.User;
import com.movierama.services.AuthService;
import com.movierama.utils.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    private final JwtUtil jwtUtil;
    
    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        return ResponseEntity.ok(authService.signup(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        User userLoggedIn = authService.login(username, password);
        if (userLoggedIn!= null) {
            // Generate JWT Token
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(new JwtResponse(userLoggedIn, token));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
