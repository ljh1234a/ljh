package com.example.demo.chapter03.used;

import org.springframework.stereotype.Component;

@Component
public class MorningGreet implements Greet {
    @Override
    public void greeting() {
        System.out.println("좋은 아침입니다");
    }
}
