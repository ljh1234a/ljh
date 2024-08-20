package com.example.demo1.chapter03.used;

import org.springframework.stereotype.Component;

@Component
public class EveningGreet implements Greet {
    @Override
    public void greeting() {
        System.out.println("좋은 저녁입니다");
    }

    @Override
    public void showFace() {
        System.out.println("저녁 얼굴");
    }
}
