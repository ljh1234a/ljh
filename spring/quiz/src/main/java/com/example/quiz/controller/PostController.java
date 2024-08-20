package com.example.quiz.controller;

import com.example.quiz.entity.Post;
import com.example.quiz.entity.User;
import com.example.quiz.form.PostForm;
import com.example.quiz.repository.PostRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
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
import java.time.LocalDateTime;

@Controller
@RequestMapping("/posts")
public class PostController {
    @Autowired
    PostRepository postRepository;

    // 자유 게시판
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

    // 공지사항 게시판
    @GetMapping("/notice")
    public String noticePost() {
        return "/post/notice";
    }

    // QNA 게시판
    @GetMapping("/qna")
    public String freePost() {
        return "/post/qna";
    }

    @GetMapping("/new")
    public String createPost(Model model, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/users/login";
        }
        model.addAttribute("postForm", new PostForm());
        return "post_form";
    }

    @PostMapping("/save")
    public String savePost(@Validated @ModelAttribute PostForm postForm,
                           BindingResult result,
                           HttpSession session) {
        if (result.hasErrors()) {
            return "post_form";
        }

        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/users/login";
        }

        Post post = new Post();
        post.setTitle(postForm.getTitle());
        post.setContent(postForm.getContent());
        post.setUsername(user.getUsername());
        post.setCreatedDate(LocalDateTime.now());
        postRepository.save(post);

        return "redirect:/posts";
    }

    @GetMapping("/edit/{id}")
    public String showEditPost(@PathVariable("id") Integer id,
                                   HttpSession session,
                                   Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
           return "redirect:/users/login";
        }

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post Id:" + id));
        if (!post.getUsername().equals(user.getUsername())) {
            return "redirect:/posts";
        }

        PostForm postForm = new PostForm();
        postForm.setId(post.getId());
        postForm.setTitle(post.getTitle());
        postForm.setContent(post.getContent());

        model.addAttribute("postForm", postForm);
        return "post_form";
    }

    @PostMapping("/edit/{id}")
    public String editPost(@PathVariable("id") Integer id,
                           @Valid @ModelAttribute PostForm postForm,
                           BindingResult result,
                           HttpSession session) {
        if (result.hasErrors()) {
            postForm.setId(id);
            return "post_form";
        }

        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/users/login";
        }

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post Id:" + id));
        if (!post.getUsername().equals(user.getUsername())) {
            return "redirect:/posts";
        }

        post.setTitle(postForm.getTitle());
        post.setContent(postForm.getContent());
        postRepository.save(post);

        return "redirect:/posts";
    }

    @PostMapping("/delete")
    public String deletePost(@RequestParam("id") Integer id,
                             HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/users/login";
        }

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post Id:" + id));
        if (post.getUsername().equals(user.getUsername())) {
            postRepository.delete(post);
        }

        return "redirect:/posts";
    }

    @GetMapping("/content/{id}")
    public String showContent(@PathVariable("id") Integer id,
                              Model model) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post Id: " + id));
        post.setViews(post.getViews() + 1);
        postRepository.save(post);
        model.addAttribute("post", post);
        return "post_content";
    }
}
