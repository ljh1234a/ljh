package com.example.oxQuiz2.service;

import com.example.oxQuiz2.entity.Quiz;

import java.util.Optional;

public interface QuizService {
    Iterable<Quiz> selectAll();
    Optional<Quiz> selectOneById(Integer id);
    Optional<Quiz> selectOneRandomQuiz();
    Boolean checkQuiz(Integer id, Boolean myAnswer);
    void insertQuiz(Quiz quiz);
    void updateQuiz(Quiz quiz);
    void deleteQuizById(Integer id);
}
