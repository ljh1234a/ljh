package com.example.oxQuiz.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {
    @Id
    private Integer id;
    private String question;
    private Boolean answer;
    private String author;
}
