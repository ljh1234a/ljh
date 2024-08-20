package com.example.quiz.repository;

import com.example.quiz.entity.UserQuiz;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserQuizRepository extends CrudRepository<UserQuiz, Integer> {
    UserQuiz findByUsername(String username);
}
