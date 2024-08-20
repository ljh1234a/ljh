package com.example.Shop.controller;

import com.example.Shop.dto.UserFormDTO;
import com.example.Shop.service.UserService;
import com.example.Shop.service.UserServiceImpl;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserServiceImpl userServiceImpl;

    @GetMapping("/")
    public String Home() {
        return "home";
    }

    // 로그인
    @GetMapping("/user/login")
    public String login() {
        return "login";
    }

    // 로그인
    @PostMapping("/user/login")
    public String login(@Valid @RequestParam String userId, @RequestParam String password, @ModelAttribute UserFormDTO userFormDTO, HttpSession session, Model model) {
        UserFormDTO loginResult = userServiceImpl.login(userFormDTO);
        if (loginResult != null) {
            session.setAttribute("userName", loginResult.getUserName());
            return "redirect:/";
        } else {
            model.addAttribute("error", "아이디 또는 비밀번호가 틀렸습니다.");
            return "login";
        }
    }

    @GetMapping("/user/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    // 회원가입
    @GetMapping("/user/save")
    public String createUserForm() {
        return "createUserForm";
    }

    @PostMapping("/user/save")
    public String createUser(UserFormDTO userFormDTO) {
        Long userId = userService.join(userFormDTO);
        return "home";
    }

    @GetMapping("/user/info")
    public String userList(Model model) {
        List<UserFormDTO> userFormDTOList = userServiceImpl.findAll();

        model.addAttribute("userList", userFormDTOList);
        return "list";
    }
}
