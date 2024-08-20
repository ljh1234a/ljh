package com.example.SpringDataJDBCSample.repository;

import com.example.SpringDataJDBCSample.entity.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserPagingAndSortingRepository extends PagingAndSortingRepository<User, Integer> {
}
