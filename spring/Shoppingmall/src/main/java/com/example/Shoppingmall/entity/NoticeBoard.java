package com.example.Shoppingmall.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("free_board")
public class FreeBoard {
    @Id
    private Integer id;
    private String title;
    private String content;
    private Integer userId;
    private String username;
    private LocalDateTime createDate;
    private Integer views = 0;
}
