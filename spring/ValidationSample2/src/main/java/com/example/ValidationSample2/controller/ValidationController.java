package com.example.ValidationSample2.controller;

import com.example.ValidationSample2.form.CalcForm;
import com.example.ValidationSample2.validator.CalcValidator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ValidationController {
    @ModelAttribute
    public CalcForm setUpForm() {
        return new CalcForm();
    }

    @GetMapping("calc")
    public String showCalc() {
        return "calcf";
    }

    @PostMapping("result")
    public String confirmView(@Validated CalcForm form,
                              BindingResult bindingResult,
                              Model model) {
        if(bindingResult.hasErrors()) {
            return "calcf";
        }

        Integer result = form.getLeftNum() + form.getRightNum();
        model.addAttribute("result", result);

        return "confirm";
    }

    @Autowired
    CalcValidator calcValidator;

    @InitBinder("calcForm")
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(calcValidator);
    }

    @GetMapping("login")
    public String login(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        System.out.println(session.getAttribute("loginUser"));

        return "login";
    }

    @PostMapping("login_ok")
    public String loginOk(Model model,
                          @RequestParam("userId") String userId,
                          @RequestParam("userPw") String userPw,
                          RedirectAttributes redirectAttributes,
                          HttpServletRequest httpServletRequest) {
        String dbUserId = "tester";
        String dbUserPw = "0000";

        if(userId.equals(dbUserId) && userPw.equals(dbUserPw)) {
            HttpSession session = httpServletRequest.getSession();
            session.setAttribute("loginUser", userId);

            // 페이지 이름
            return "loginOk";
        } else {
            redirectAttributes.addFlashAttribute("loginFail", "로그인 실패");

            // 주소
            return "redirect:/login";
        }
    }

    @GetMapping("logout")
    public String logOut(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        session.invalidate();

        return "loginOk";
    }
}
