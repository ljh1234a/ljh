package com.example.oxQuiz.service;

import com.example.oxQuiz.entity.Quiz;
import com.example.oxQuiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
        if(randId == null) {
            return Optional.empty();
        }
        return repository.findById(randId);
    }

    @Override
    public Boolean checkQuiz(Integer id, Boolean myAnswer) {
        Boolean check = false;
        Optional<Quiz> optQuiz = repository.findById(id);

        if(optQuiz.isPresent()) {
            Quiz quiz = optQuiz.get();
            if(quiz.getAnswer().equals(myAnswer)) {
                check = true;
            }
        }
        return check;
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
}
