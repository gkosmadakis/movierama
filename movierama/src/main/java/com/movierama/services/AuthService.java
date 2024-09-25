package com.movierama.services;

import com.movierama.models.User;

public interface AuthService {
    User signup(User user);
    User login(String username, String password);
}

