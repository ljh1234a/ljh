package com.example.Shoppingmall.repository;

import com.example.Shoppingmall.entity.Shop;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepository extends PagingAndSortingRepository<Shop, Integer>, CrudRepository<Shop, Integer> {
}
