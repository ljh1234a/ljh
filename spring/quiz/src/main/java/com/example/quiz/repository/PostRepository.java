package com.example.quiz.repository;

import com.example.quiz.entity.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostRepository extends PagingAndSortingRepository<Post, Integer>, CrudRepository<Post, Integer> {
}
