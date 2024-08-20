package com.example.SpringDataJDBCSample.repository;

import com.example.SpringDataJDBCSample.entity.Member;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MemberPagingAndSortingRepository extends PagingAndSortingRepository<Member, Integer> {
}
