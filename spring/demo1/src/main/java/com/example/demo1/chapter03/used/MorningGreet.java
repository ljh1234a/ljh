package com.example.demo1.chapter03.used;

import org.springframework.stereotype.Component;

//@Component
public class MorningGreet implements Greet {
    @Override
    public void greeting() {
        System.out.println("좋은 아침입니다");
    }

    @Override
    public void showFace() {
        System.out.println("아침 얼굴");
    }
}
