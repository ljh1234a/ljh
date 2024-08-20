package com.example.Shoppingmall.repository;

import com.example.Shoppingmall.entity.NoticeBoard;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FreeBoardRepository extends PagingAndSortingRepository<NoticeBoard, Integer>, CrudRepository<NoticeBoard, Integer> {
}
