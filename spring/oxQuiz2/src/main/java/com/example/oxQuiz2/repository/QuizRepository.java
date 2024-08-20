package com.example.oxQuiz2.repository;

import com.example.oxQuiz2.entity.Quiz;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface QuizRepository extends CrudRepository<Quiz, Integer> {
    @Query("SELECT id FROM quiz ORDER BY RAND() limit 1")
    Integer getRandomId();
}
