package com.example.SpringDataJDBCSample;

import com.example.SpringDataJDBCSample.entity.Member;
import com.example.SpringDataJDBCSample.repository.MemberCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;
import java.util.Scanner;

@SpringBootApplication
public class SpringDataJdbcSampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDataJdbcSampleApplication.class, args)
				.getBean(SpringDataJdbcSampleApplication.class).execute();
	}

    @Autowired
	MemberCrudRepository repository;

	private void execute() {
		Scanner sc = new Scanner(System.in);
		String command;

		while(true) {
			System.out.println("수행할 작업을 선택하세요. (1: 입력, 2: 리스트, 3: 삭제, 4: 업데이트, q: 종료)");
			command = sc.nextLine();
			switch (command) {
				case "1":
					executeInsert(sc);
					break;
				case "2":
					executeSelect();
					break;
				case "3":
					executeDelete(sc);
					break;
				case "4":
					executeUpdate(sc);
					break;
				case "q":
					System.out.println("프로그램이 종료되었습니다.");
					System.exit(0);
				default:
					System.out.println("잘못된 명령어입니다.");
			}
		}
	}

	private void executeInsert(Scanner sc) {
		System.out.print("등록할 이름을 입력하세요: ");
		String name = sc.nextLine();
//		if(name.equals("0")) return;
		Member member = new Member(null, name);
		repository.save(member);
		System.out.println(name + "님이 등록되었습니다.");
	}

	private void executeSelect() {
		System.out.println("---- 리스트를 표시합니다 ----");
		Iterable<Member> members = repository.findAll();
		for (Member member : members) {
			System.out.println("id = " + member.getId() + ", name = " + member.getName());
		}
	}

	private void executeDelete(Scanner sc) {
		System.out.print("삭제할 사용자의 Id를 입력하세요: ");
		Integer id = Integer.valueOf(sc.nextLine());

		if(repository.existsById(id)) {
			Optional<Member> m = repository.findById(id);
			if(m.isPresent()) {
				Member member = new Member(id, null);
				System.out.print("삭제할 사용자의 이름을 입력하세요: ");
				String uname = sc.nextLine();
				String name = m.get().getName();

				if(repository.existsById(id) && name.equals(uname)) {
					repository.delete(member);
					System.out.println(id + "번 사용자 " + name + "님의 데이터를 삭제하였습니다.");
				} else {
					System.out.println(id + "번 사용자의 이름을 잘못 입력하였습니다.");
				}
			}
		} else {
			System.out.println(id + "번 사용자의 데이터가 없습니다.");
		}
	}

	private void executeUpdate(Scanner sc) {
		System.out.print("수정할 사용자의 Id를 입력하세요: ");
		Integer id = Integer.valueOf(sc.nextLine());

		if(repository.existsById(id)) {
			Optional<Member> m = repository.findById(id);
			if(m.isPresent()) {
				System.out.print("수정할 사용자의 새로운 이름을 입력하세요: ");
				String uname = sc.nextLine();
				String name = m.get().getName();

				Member member = new Member(id, uname);
				repository.save(member);
				System.out.println(id + "번 사용자 " + name + "님의 이름이 " + uname + "(으)로 변경되었습니다.");
			} else {
				System.out.println(id + "번 사용자의 데이터가 없습니다.");
			}
		}
	}
}
