package com.example.board.entity;

import com.example.board.Controller.MemberController;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id@GeneratedValue
    @Column(name = "board_Id")
    private Long Id;
    private String title;
    private String writer;
    private String password;
    private LocalDateTime dateTime;
    private String content;
    private Integer views;
    private Integer count;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_Id")
    private Member member;
}
