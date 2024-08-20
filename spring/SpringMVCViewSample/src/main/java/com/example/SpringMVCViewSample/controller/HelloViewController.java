package com.example.SpringMVCViewSample.controller;

import org.apache.commons.io.FileUtils;
import ch.qos.logback.core.util.FileUtil;
import com.example.SpringMVCViewSample.form.UserForm;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;

@Controller
@RequestMapping("/hello")
public class HelloViewController {
    // 도메인/hello/view
//    @GetMapping("view")
    @RequestMapping(value = {"hello", "hellospring"}, method = { RequestMethod.GET, RequestMethod.POST })
    public String helloView() {
        return "hello";
    }

    @RequestMapping(value = {"hello2", "hellospring2"}, method = { RequestMethod.GET, RequestMethod.POST })
    public String helloView2() {
        return "hello2";
    }

    @GetMapping("show")
    public String showView() {
        return "entry";
    }

    @PostMapping("confirm")
    public String confirmView(
            Model model, @RequestParam String name,
            @RequestParam Integer age, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            @RequestParam LocalDate birth, @RequestParam(value = "imgFile", required = false) MultipartFile imgFile) throws IOException, IllegalAccessException {
        model.addAttribute("name", name);
        model.addAttribute("age", age);
        model.addAttribute("birth", birth);

        if(!imgFile.isEmpty()) {
            System.out.println(imgFile);
            String fileName = imgFile.getOriginalFilename();
            File oFile = new File("C:/Temp/" + fileName);
            // 실제 파일 저장
            imgFile.transferTo(oFile);
//            File oFile = new File();

            // 이미지 파일을 문자로 변경 후 저장
            byte[] fileByte = FileUtils.readFileToByteArray(oFile);
            String encoding = Base64.getEncoder().encodeToString(fileByte);
            System.out.println(encoding);
            model.addAttribute("img", encoding);
            oFile.delete();
        }

        System.out.println("이름: " + name);
        System.out.println("나이: " + age);
        System.out.println("생일: " + birth);

        return "confirm";
    }

    @PostMapping("confirm2")
    public String confirmView2(UserForm userForm) {
        return "confirm2";
    }

    @GetMapping("function/{no}")
    public String selectFunction(@PathVariable Integer no) {
        String view = "";

        switch (no) {
            case 1:
                view = "pathvariable/function1";
                break;
            case 2:
                view = "pathvariable/function2";
                break;
            case 3:
                view = "pathvariable/function3";
                break;
            default:
                view = "pathvariable/function1";
                break;
        }

        return view;
    }

    @PostMapping(value = "send", params = "a")
    public String showAView() {
        return "submit/a";
    }

    @PostMapping(value = "send", params = "b")
    public String showBView() {
        return "submit/b";
    }

    @PostMapping(value = "send", params = "c")
    public String showCView() {
        return "submit/c";
    }


}
