package com.example.board.service;

import com.example.board.dto.BoardDto;
import com.example.board.entity.Board;

import java.util.List;

public interface BoardService {
    Board save(BoardDto boardDto);
    List<Board> findAll();
}
