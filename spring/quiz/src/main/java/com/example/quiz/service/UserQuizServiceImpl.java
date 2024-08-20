package com.example.quiz.service;

import com.example.quiz.entity.User;
import com.example.quiz.entity.UserQuiz;
import com.example.quiz.repository.UserQuizRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserQuizServiceImpl implements UserQuizService {
    @Autowired
    UserQuizRepository userQuizRepository;


    @Override
    public UserQuiz findByUsername(String username) {
        return userQuizRepository.findByUsername(username);
    }

    @Override
    public void save(UserQuiz userQuiz) {
        userQuizRepository.save(userQuiz);
    }
}
