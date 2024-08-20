package com.example.quiz.service;

import com.example.quiz.entity.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {
    List<Post> findAll();
    Post findById(Integer id);
    void save(Post post);
    void deleteById(Integer id);
}
