package com.example.SpringMVCViewSample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("my")
public class MyController {
    @GetMapping("about")
    public String about(Model model) {
        model.addAttribute("msg", "타임리프!");
        return "aboutme";
    }
}
