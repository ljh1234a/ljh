package com.example.quiz.form;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostForm {
    private Integer id;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private String username;
    private LocalDateTime createdDate;
    private int views;
}
