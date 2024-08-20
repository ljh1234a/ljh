package com.example.SpringDataJDBCSample.repository;

import com.example.SpringDataJDBCSample.entity.Member;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MemberCrudRepository extends CrudRepository<Member, Integer> {
    @Query("SELECT * FROM Member ORDER BY name")
    Iterable<Member> sortAscName();

    @Query("SELECT * FROM Member ORDER BY name DESC")
    Iterable<Member> sortDescName();

    @Query("SELECT * FROM Member WHERE name LIKE :searchString")
    Iterable<Member> searchList(@Param("searchString") String searchString);
}
