package com.example.quiz.repository;

import com.example.quiz.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUserId(String userId);
}
