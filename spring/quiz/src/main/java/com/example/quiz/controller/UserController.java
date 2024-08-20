package com.example.quiz.controller;

import com.example.quiz.entity.Post;
import com.example.quiz.entity.User;
import com.example.quiz.form.UserForm;
import com.example.quiz.repository.PostRepository;
import com.example.quiz.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @GetMapping
    public String PostsList(@RequestParam(value = "page", defaultValue = "0") int page,
                            @RequestParam(value = "size", defaultValue = "10") int size,
                            Model model) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Post> postsPage = postRepository.findAll(pageable);

        model.addAttribute("posts", postsPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", postsPage.getTotalPages());
        model.addAttribute("size", size);
        model.addAttribute("totalElements", postsPage.getTotalElements());
        return "/post/free";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("userForm", new UserForm());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@Validated @ModelAttribute UserForm userForm,
                               BindingResult result,
                               Model model) {
        if (result.hasErrors()) {
            return "register";
        }

        if(userRepository.findByUserId(userForm.getUserId()) != null) {
            model.addAttribute("message", "이미 존재하는 아이디입니다.");
            return "register";
        }

        User user = new User();
        user.setUsername(userForm.getUsername());
        user.setUserId(userForm.getUserId());
        user.setPassword(userForm.getPassword());
        userRepository.save(user);

        return "redirect:/users/login?success=true&userId=" + userForm.getUserId();
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute UserForm userForm,
                            Model model,
                            HttpSession session) {
        User user = userRepository.findByUserId(userForm.getUserId());
        if (user != null && user.getPassword().equals(userForm.getPassword())) {
            session.setAttribute("user", user);
            return "redirect:/posts";
        } else {
            model.addAttribute("message", "아이디 또는 비밀번호가 틀렸습니다.");
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session,
                         Model model) {
        session.invalidate();
//        Iterable<Post> posts = postRepository.findAll();
//        model.addAttribute("posts", posts);
        return "redirect:/posts?page=0&size=10";
    }
}
