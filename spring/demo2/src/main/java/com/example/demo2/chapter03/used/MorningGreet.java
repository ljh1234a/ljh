package com.example.demo2.chapter03.used;

//@Component
public class MorningGreet implements Greet {
    @Override
    public void greeting() {
        System.out.println("좋은 아침입니다");
    }
}
