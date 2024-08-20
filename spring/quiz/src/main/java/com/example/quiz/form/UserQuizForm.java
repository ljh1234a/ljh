package com.example.quiz.form;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserQuizForm {
    private Integer id;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private String role;
}
