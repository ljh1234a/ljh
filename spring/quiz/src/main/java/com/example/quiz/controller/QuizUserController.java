package com.example.quiz.controller;

import com.example.quiz.entity.User;
import com.example.quiz.entity.UserQuiz;
import com.example.quiz.form.UserForm;
import com.example.quiz.form.UserQuizForm;
import com.example.quiz.repository.UserQuizRepository;
import com.example.quiz.service.UserQuizService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/quizUsers")
public class QuizUserController {
    @Autowired
    UserQuizRepository userQuizRepository;

    @GetMapping("/register")
    public String quizRegisterForm(Model model) {
        model.addAttribute("userForm", new UserQuizForm());
        return "quizRegister";
    }

    @PostMapping("/register")
    public String registerUser(@Valid @ModelAttribute UserQuizForm userQuizForm,
                               BindingResult result,
                               Model model) {
        if (result.hasErrors()) {
            return "quizRegister";
        }

        if (userQuizRepository.findByUsername(userQuizForm.getUsername()) != null) {
            model.addAttribute("message", "이미 존재하는 아이디입니다.");
            return "quizRegister";
        }

        UserQuiz userQuiz = new UserQuiz();
        userQuiz.setUsername(userQuizForm.getUsername());
        userQuiz.setPassword(userQuizForm.getPassword());
        userQuiz.setRole(userQuizForm.getRole() != null ? userQuizForm.getRole() : "ROLE_USER");

        userQuizRepository.save(userQuiz);

        return "redirect:/quizUsers/login?success=true&username=" + userQuizForm.getUsername();
    }

    @GetMapping("/login")
    public String quizLoginForm(Model model) {
        model.addAttribute("userForm", new UserQuizForm());
        return "quizLogin";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute UserQuizForm userQuizForm,
                            Model model, HttpSession session) {
        UserQuiz userQuiz = userQuizRepository.findByUsername(userQuizForm.getUsername());
        if (userQuiz != null && userQuiz.getPassword().equals(userQuizForm.getPassword())) {
            session.setAttribute("userquiz", userQuiz);
            if("ROLE_ADMIN".equals(userQuiz.getRole())) {
                return "redirect:/quiz";
            }
            return "redirect:/quiz";
        } else {
            model.addAttribute("message", "아이디 또는 비밀번호가 틀렸습니다.");
            return "quizLogin";
        }
    }

    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/quizUsers/login";
    }
}
