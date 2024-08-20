package com.example.quiz.service;

import com.example.quiz.entity.Quiz;
import com.example.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class QuizServiceImpl implements QuizService {
    @Autowired
    QuizRepository repository;

    @Override
    public Iterable<Quiz> selectAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Quiz> selectOneById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Quiz> selectOneRandomQuiz() {
        Integer randId = repository.getRandomId();
        if (randId == null) {
            return Optional.empty(); // 무작위 ID가 없으면 빈 Optional 반환
        }
        return repository.findById(randId); // ID를 사용해 퀴즈 조회
    }

    @Override
    public Boolean checkQuiz(Integer id, Boolean myAnswer) {
        Optional<Quiz> optQuiz = repository.findById(id);
        if (optQuiz.isPresent()) {
            Quiz quiz = optQuiz.get();
            return quiz.getAnswer().equals(myAnswer);
        }
        return false;
    }

    @Override
    public void insertQuiz(Quiz quiz) {
        repository.save(quiz);
    }

    @Override
    public void updateQuiz(Quiz quiz) {
        repository.save(quiz);
    }

    @Override
    public void deleteQuizById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Quiz getRandomQuiz() {
        Optional<Quiz> randomQuiz = selectOneRandomQuiz();
        return randomQuiz.orElse(null); // No quiz found, return null or handle accordingly
    }
}
