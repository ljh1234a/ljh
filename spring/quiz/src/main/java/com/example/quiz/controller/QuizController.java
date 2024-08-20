package com.example.quiz.controller;

import com.example.quiz.entity.Quiz;
import com.example.quiz.entity.UserQuiz;
import com.example.quiz.form.QuizForm;
import com.example.quiz.service.QuizService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    QuizService quizService;

//    @ModelAttribute
//    public QuizForm setUpForm() {
//        QuizForm form = new QuizForm();
//        form.setAnswer(true);
//        return form;
//    }

    @GetMapping
    public String quizPage(Model model, HttpSession session) {
        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("userquiz");
        if (userObj == null) {
            // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
            return "redirect:/quizUsers/login";
        }

        // 사용자 역할 확인
        String userRole = ((UserQuiz) userObj).getRole();
        if ("ROLE_ADMIN".equals(userRole)) {
            // 관리자인 경우 CRUD 페이지로 이동
            QuizForm quizForm = new QuizForm();
            quizForm.setAuthor("관리자");
            model.addAttribute("quizForm", quizForm);
            model.addAttribute("list", quizService.selectAll());
            model.addAttribute("title", "퀴즈 목록");
            model.addAttribute("btn", "추가");
            return "crud";
        } else {
            // 일반 사용자인 경우 퀴즈 풀이 페이지로 이동
            model.addAttribute("quiz", quizService.getRandomQuiz());
            return "playQuiz";
        }
    }

    @PostMapping("/insert")
    public String insertQuiz(@Valid @ModelAttribute QuizForm quizForm,
                             BindingResult result,
                             Model model) {
        if(result.hasErrors()) {
            model.addAttribute("title", "새 퀴즈 추가");
            model.addAttribute("btn", "추가");
            return "crud";
        }

        Quiz quiz = new Quiz();
        quiz.setQuestion(quizForm.getQuestion());
        quiz.setAnswer(quizForm.getAnswer());
        quiz.setAuthor(quizForm.getAuthor());
        quizService.insertQuiz(quiz);
        model.addAttribute("complete", "문제가 등록되었습니다.");
        return "redirect:/quiz";
    }

    @GetMapping("/{id}")
    public String editQuiz(Model model,
                           @PathVariable Integer id) {
        Optional<Quiz> optQuiz = quizService.selectOneById(id);
        if (optQuiz.isPresent()) {
            Quiz quiz = optQuiz.get();
            QuizForm quizForm = new QuizForm();
            quizForm.setId(quiz.getId());
            quizForm.setQuestion(quiz.getQuestion());
            quizForm.setAnswer(quiz.getAnswer());
            quizForm.setAuthor(quiz.getAuthor());
            model.addAttribute("quizForm", quizForm);
            model.addAttribute("btn", "수정");
            model.addAttribute("title", "퀴즈 수정");
            return "crud";
        } else {
            model.addAttribute("message", "퀴즈를 찾을 수 없습니다.");
            return "redirect:/quiz";
        }
    }

//    private void makeUpdateModel(QuizForm quizForm, Model model) {
//        model.addAttribute("id", quizForm.getId());
//        quizForm.setNewQuiz(false);
//        model.addAttribute("quizForm", quizForm);
//        model.addAttribute("title", "<수정 폼>");
//        model.addAttribute("btn", "수정");
//    }

    @PostMapping("/update")
    public String updateQuiz(@Valid @ModelAttribute QuizForm quizForm,
                             BindingResult result,
                             Model model) {
        if(result.hasErrors()) {
            model.addAttribute("title", "퀴즈 수정");
            model.addAttribute("btn", "수정");
            return "crud";
        }

        Quiz quiz = new Quiz();
        quiz.setId(quizForm.getId());
        quiz.setQuestion(quizForm.getQuestion());
        quiz.setAnswer(quizForm.getAnswer());
        quiz.setAuthor(quizForm.getAuthor());
        quizService.updateQuiz(quiz);
        model.addAttribute("complete", "문제가 수정되었습니다.");
        return "redirect:/quiz";
    }

//    private Quiz makeQuiz(QuizForm quizForm) {
//        Quiz quiz = new Quiz();
//        quiz.setId(quizForm.getId());
//        quiz.setQuestion(quizForm.getQuestion());
//        quiz.setAnswer(quizForm.getAnswer());
//        quiz.setAuthor(quizForm.getAuthor());
//        return quiz;
//    }
//
//    private QuizForm makeQuizForm(Quiz quiz) {
//        QuizForm form = new QuizForm();
//        form.setId(quiz.getId());
//        form.setQuestion(quiz.getQuestion());
//        form.setAnswer(quiz.getAnswer());
//        form.setAuthor(quiz.getAuthor());
//        form.setNewQuiz(false);
//        return form;
//    }

    @PostMapping("/delete")
    public String deleteQuiz(@RequestParam Integer id,
                             Model model) {
        quizService.deleteQuizById(id);
        model.addAttribute("complete", "문제가 삭제되었습니다.");
        return "redirect:/quiz";
    }

//    @GetMapping("/play")
//    public String play(Model model) {
//        Optional<Quiz> quizOpt = quizService.selectOneRandomQuiz();
//        if (quizOpt.isPresent()) {
//            Quiz quiz = quizOpt.get();
//            model.addAttribute("quizForm", quiz);
//        } else {
//            model.addAttribute("msg", "등록된 퀴즈가 없습니다.");
//        }
//        return "play";
//    }
//
//    @PostMapping("/check")
//    public String checkQuiz(QuizForm quizForm, @RequestParam("answer") Boolean answer, Model model) {
//        boolean isCorrect = quizService.checkQuiz(quizForm.getId(), answer);
//        if(isCorrect) {
//            model.addAttribute("trueMsg", "정답!");
//        } else {
//            model.addAttribute("falseMsg", "오답!");
//        }
//        return "answer";
//    }

    @PostMapping("/check")
    public String checkQuiz(@RequestParam Integer id,
                            @RequestParam Boolean answer,
                            Model model) {
        Boolean isCorrect = quizService.checkQuiz(id, answer);
        model.addAttribute("isCorrect", isCorrect);
        model.addAttribute("quizId", id);
        return "quizAnswer";
    }
}
