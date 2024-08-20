package com.example.quiz.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizForm {
    private Integer id;
    @NotBlank(message = "문제를 입력해주세요")
    private String question;
    @NotNull(message = "정답을 선택해주세요.")
    private Boolean answer;
    private String author = "관리자";
    private Boolean newQuiz;
}
