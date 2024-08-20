package com.example.board.service;

import com.example.board.dto.MemberDto;
import com.example.board.entity.Member;

public interface MemberService {
    Member saveEntity(Member member);
    Member saveDto(MemberDto memberDto);
    Member findByUsername(String username);
}
