package com.example.SpringDataJDBCSample.repository;

import com.example.SpringDataJDBCSample.entity.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserCrudRepository extends CrudRepository<User, Integer> {
    @Query("SELECT * FROM public.user ORDER BY user_name ASC")
    Iterable<User> sortAscName();

    @Query("SELECT * FROM public.user ORDER BY user_name DESC")
    Iterable<User> sortDescName();

    @Query("SELECT * FROM public.user ORDER BY user_birth ASC, user_name ASC")
    Iterable<User> sortAscBirth();

    @Query("SELECT * FROM public.user ORDER BY user_birth DESC, user_name ASC")
    Iterable<User> sortDescBirth();

    @Query("SELECT * FROM public.user WHERE user_name like :srcName")
    Iterable<User> searchName(@Param("srcName") String srcName);
}
