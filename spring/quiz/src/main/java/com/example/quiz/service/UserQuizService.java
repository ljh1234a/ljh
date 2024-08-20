package com.example.quiz.service;

import com.example.quiz.entity.User;
import com.example.quiz.entity.UserQuiz;

public interface UserQuizService {
    UserQuiz findByUsername(String username);
    void save(UserQuiz userQuiz);
}
