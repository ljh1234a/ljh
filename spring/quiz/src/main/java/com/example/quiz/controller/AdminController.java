package com.example.quiz.controller;

import com.example.quiz.entity.Quiz;
import com.example.quiz.form.QuizForm;
import com.example.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/quiz")
public class AdminController {
    @Autowired
    QuizService quizService;

    @GetMapping("/admin")
    public String showAdminQuizForm(Model model) {
        model.addAttribute("quizForm", new QuizForm());
        return "admin_quiz";
    }

    @PostMapping("/admin/insert")
    public String insertQuiz(@Validated @ModelAttribute QuizForm quizForm,
                             BindingResult bindingResult,
                             Model model) {
        if (bindingResult.hasErrors()) {
            return "admin_quiz";
        }

        Quiz quiz = new Quiz();
        quiz.setQuestion(quizForm.getQuestion());
        quiz.setAnswer(quizForm.getAnswer());
        quiz.setAuthor(quizForm.getAuthor());

        quizService.insertQuiz(quiz);
        model.addAttribute("complete", "퀴즈 등록을 완료하였습니다.");
        return "admin_quiz";
    }
}
