package com.example.board.Controller;

import com.example.board.dto.LoginDto;
import com.example.board.entity.Member;
import com.example.board.service.MemberService;
import com.example.board.service.MemberServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MemberController {


    private static final Logger log = LoggerFactory.getLogger(MemberController.class);
    private MemberServiceImpl memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = (MemberServiceImpl) memberService;
    }

    @GetMapping("/login")
    public String getLogin(HttpServletRequest request, Model model) {
        String referer = request.getHeader("Referer");
        request.getSession().setAttribute("prevPage", referer);
        log.info("uri={}",referer);
        model.addAttribute("login",new LoginDto());
        return "login";
    }

    @PostMapping("/login")
    public String postLogin(@ModelAttribute("login") LoginDto loginDto,HttpServletRequest request, HttpSession session,Model model){
        boolean login = memberService.login(loginDto);

        if (login){
            String username = loginDto.getUsername();
            Member member = memberService.findByUsername(username);
            session.setAttribute("loginMember",member);

            //저장한 이전페이지 주소를 가져온다
            String prevPage = (String) request.getSession().getAttribute("prevPage");
            //세션에 페지이 주소 삭제
            request.getSession().removeAttribute("prevPage");

            return "redirect:" + (prevPage != null ? prevPage : "/");       //이전페이지가 있다면 이전페이지로 없다면 / 페이지로

        }

        model.addAttribute("error", "비밀번호 또는 아이디가 올바르지 않습니다.");
        return "login";
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("loginMember");
        return "redirect:/";
    }

    @GetMapping("/createMember")
    public String getCreateMember(Model model) {
        model.addAttribute("member", new Member());
        return "joinMember";
    }

    @PostMapping("/createMember")
    public String postCreateMember(@ModelAttribute("member") Member member, Model model) {
        memberService.saveEntity(member);
        return "redirect:/login";
    }
}
