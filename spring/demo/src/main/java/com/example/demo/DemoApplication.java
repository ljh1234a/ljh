package com.example.demo;

import com.example.demo.chapter03.used.Greet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

class Member {
	String name;
	int age;

	Member(String name, int age) {
		this.name = name;
		this.age = age;
	}

	Member() {
		this("홍길동", 20);
	}

	@Override
	public String toString() {
		return name + ", " + age;
	}
}

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args)
				.getBean(DemoApplication.class).execute();

		List<Member> names = new ArrayList<>();

		names.add(new Member());
		names.add(new Member("김길동", 25));
		names.add(new Member("James", 30));

		for(Member name : names) {
			System.out.println(name);
		}
	}

	@Autowired
	Greet greet;

	private void execute() {
		greet.greeting();
	}
}
