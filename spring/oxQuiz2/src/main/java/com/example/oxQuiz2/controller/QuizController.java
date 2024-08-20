package com.example.oxQuiz2.controller;

import com.example.oxQuiz2.entity.Quiz;
import com.example.oxQuiz2.form.QuizForm;
import com.example.oxQuiz2.service.QuizService;
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
    QuizService service;

    @ModelAttribute
    public QuizForm setUpForm() {
        QuizForm form = new QuizForm();
        form.setAnswer(true);
        return form;
    }

    @GetMapping
    public String showList(QuizForm quizForm, Model model) {
        quizForm.setNewQuiz(true);

        Iterable<Quiz> list = service.selectAll();

        model.addAttribute("list", list);
        model.addAttribute("title", "<등록 폼>");
        model.addAttribute("btn", "등록");

        return "crud";
    }

    @PostMapping("/insert")
    public String insert(@Validated QuizForm quizForm, BindingResult bindingResult,
                         Model model, RedirectAttributes redirectAttributes) {
        Quiz quiz = new Quiz();
        quiz.setQuestion(quizForm.getQuestion());
        quiz.setAnswer(quizForm.getAnswer());
        quiz.setAuthor(quizForm.getAuthor());

        if(!bindingResult.hasErrors()) {
            service.insertQuiz(quiz);
            redirectAttributes.addFlashAttribute("complete", "등록을 완료하였습니다");
            return "redirect:/quiz";
        } else {
            return showList(quizForm, model);
        }
    }

    @GetMapping("/{id}")
    public String showUpdate(QuizForm quizForm, @PathVariable("id") Integer id, Model model) {
        Optional<Quiz> quizOpt = service.selectOneById(id);
        Optional<QuizForm> quizFormOpt = quizOpt.map(t -> makeQuizForm(t));
        if(quizFormOpt.isPresent()) {
            quizForm = quizFormOpt.get();
        }

        makeUpdateModel(quizForm, model);
        return "crud";
    }

    private void makeUpdateModel(QuizForm quizForm, Model model) {
        model.addAttribute("id", quizForm.getId());
        quizForm.setNewQuiz(false);
        model.addAttribute("quizForm", quizForm);
        model.addAttribute("title", "<수정 폼>");
        model.addAttribute("btn", "수정");
    }

    @PostMapping("/update")
    public String update(
            @Validated QuizForm quizForm,
            BindingResult result,
            Model model,
            RedirectAttributes redirectAttributes) {
        Quiz quiz = makeQuiz(quizForm);
        if(!result.hasErrors()) {
            service.updateQuiz(quiz);
            redirectAttributes.addFlashAttribute("complete", "수정을 완료하였습니다");
            return "redirect:/quiz/" + quiz.getId();
        } else {
            makeUpdateModel(quizForm, model);
            return "crud";
        }
    }

    private Quiz makeQuiz(QuizForm quizForm) {
        Quiz quiz = new Quiz();
        quiz.setId(quizForm.getId());
        quiz.setQuestion(quizForm.getQuestion());
        quiz.setAnswer(quizForm.getAnswer());
        quiz.setAuthor(quizForm.getAuthor());
        return quiz;
    }

    private QuizForm makeQuizForm(Quiz quiz) {
        QuizForm form = new QuizForm();
        form.setId(quiz.getId());
        form.setQuestion(quiz.getQuestion());
        form.setAnswer(quiz.getAnswer());
        form.setAuthor(quiz.getAuthor());
        form.setNewQuiz(false);
        return form;
    }

    @PostMapping("/delete")
    public String delete(
            @RequestParam("id") String id,
            Model model,
            RedirectAttributes redirectAttributes) {
        service.deleteQuizById(Integer.parseInt(id));
        redirectAttributes.addFlashAttribute("delcomplete", "삭제를 완료하였습니다");
        return "redirect:/quiz";
    }

    @GetMapping("/play")
    public String showQuiz(QuizForm quizForm, Model model) {
        Optional<Quiz> quizOpt = service.selectOneRandomQuiz();

        if(quizOpt.isPresent()) {
            Optional<QuizForm> quizFormOpt = quizOpt.map(t -> makeQuizForm(t));
            quizForm = quizFormOpt.get();
        } else {
            model.addAttribute("msg", "등록된 퀴즈가 없습니다");
            return "play";
        }

        model.addAttribute("quizForm", quizForm);
        return "play";
    }

    @PostMapping("/check")
    public String checkQuiz(QuizForm quizForm, @RequestParam("answer") Boolean answer, Model model) {
        if(service.checkQuiz(quizForm.getId(), answer)) {
            model.addAttribute("trueMsg", "정답!");
        } else {
            model.addAttribute("falseMsg", "오답!");
        }
        return "answer";
    }
}
