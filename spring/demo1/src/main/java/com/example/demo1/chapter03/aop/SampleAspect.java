package com.example.demo1.chapter03.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Aspect
@Component
public class SampleAspect {

    // Target 지정
    // 패키지 안의 Greet 클래스에 있는 모든 메소드가 실행되기 이전에 아래 내용이 실행됨
    @Before("execution(* com.example.demo1.chapter03.used.Greet.*(..))")
    public void beforeAdvice(JoinPoint joinPoint) {
        System.out.println("============ Before Advice ============");
        System.out.println(new SimpleDateFormat("yyyy/MM/dd").format(new Date()));
        System.out.println(String.format("메서드: %s", joinPoint.getSignature().getName()));
    }

    // 패키지 안의 Greet 클래스에 있는 모든 메소드가 실행되기 이후에 아래 내용이 실행됨
    @After("execution(* com.example.demo1.chapter03.used.Greet.*(..))")
    public void afterAdvice(JoinPoint joinPoint) {
        System.out.println("============ After Advice ============");
        System.out.println(new SimpleDateFormat("yyyy/MM/dd").format(new Date()));
        System.out.println(String.format("메서드: %s", joinPoint.getSignature().getName()));
    }

    // before + after 합쳐둔 것, 메소드 실행 전후에 둘다 실행
    @Around("execution(* com.example.demo1.chapter03.used.Greet.*(..))")
    public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {

        System.out.println("===== Around Advice =====");
        System.out.println("처리 전");
        Object result = joinPoint.proceed(); // 실제 내용 처리
        System.out.println("처리 후");

        return result;
    }
}
