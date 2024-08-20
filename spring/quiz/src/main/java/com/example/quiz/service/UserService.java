package com.example.quiz.service;

import com.example.quiz.entity.User;

import java.util.Optional;

public interface UserService {
    User findByUserId(String userId);
    void save(User user);
}
