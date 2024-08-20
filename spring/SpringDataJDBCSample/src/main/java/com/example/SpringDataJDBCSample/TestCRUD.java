package com.example.SpringDataJDBCSample;

import com.example.SpringDataJDBCSample.entity.Member;
import com.example.SpringDataJDBCSample.repository.MemberCrudRepository;
import com.example.SpringDataJDBCSample.repository.MemberPagingAndSortingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jdbc.repository.query.Query;

import java.util.Optional;
import java.util.Scanner;

@SpringBootApplication
public class TestCRUD {
    public static void main(String[] args) {
        SpringApplication.run(TestCRUD.class, args)
                .getBean(TestCRUD.class).execute();
    }

    private void execute() {
        Scanner sc = new Scanner(System.in);
        String input = "";

        OUT:
        while(true) {
            showHelp();
            System.out.print("명령어: ");
            input = sc.nextLine().toLowerCase();
            switch (input) {
                case "1":
                    executeSelect(sc);
                    break;
                case "2":
                    executeInsert(sc);
                    executeSelect(sc);
                    break;
                case "3":
                    executeDelete(sc);
                    executeSelect(sc);
                    break;
                case "4":
                    executeUpdate(sc);
                    executeSelect(sc);
                    break;
                case "5":
                    executeSort(sc);
                    break;
                case "6":
                    executeSearch(sc);
                    break;
                case "q":
                    break OUT;
            }
        }
    }

    private void showHelp() {
        System.out.println();
        System.out.println("사용 방법");
        System.out.println("=======================");
        System.out.println("# 1: 리스트");
        System.out.println("# 2: 입력");
        System.out.println("# 3: 삭제");
        System.out.println("# 4: 업데이트");
        System.out.println("# 5: 정렬");
        System.out.println("# 6: 검색");
        System.out.println("# q: 종료");
        System.out.println("=======================");
    }

    @Autowired
    MemberCrudRepository repository;

    @Autowired
    MemberPagingAndSortingRepository pagingAndSortingRepository;

    private void executeSelect(Scanner sc) {
        System.out.println("----- 리스트 표시 -----");
//        Iterable<Member> members = repository.findAll();
//        System.out.println("Id   Name");
//        for(Member member : members) {
//            System.out.printf("%d   %s\n", member.getId(), member.getName());
//        }

        // 페이징 정렬
        int start = 0;
        final int pagePerRows = 10;
        long total = repository.count();
        int lastPage = getLastPage(total, pagePerRows);

        OUT:
        while(true) {
            Page<Member> members = pagingAndSortingRepository.findAll(PageRequest.of(start, pagePerRows, Sort.by("id").ascending()));

            display(members, total, start, lastPage);

            switch (sc.nextInt()) {
                case 1:
                    start = --start > 0 ? start : 0;
                    break;
                case 2:
                    start = ++start < lastPage - 1 ? start : lastPage - 1;
                    break;
                case 3:
                    break OUT;
                default:
                    System.out.println("잘못된 명령어");
            }
        }

         sc.nextLine();
    }


    private int getLastPage(long total, int pagePerRows) {
        return (int)((total / pagePerRows) + (total % pagePerRows > 0 ? 1 : 0));
    }

    private void display(Page<Member> members, long total, int start, int lastPage) {
        System.out.println("Id   Name");
        for(Member member : members) {
            int id = member.getId();
            if(id < 10) System.out.printf("%d %8s\n", member.getId(), member.getName());
            else System.out.printf("%d %7s\n", member.getId(), member.getName());
        }

        System.out.println();
        System.out.printf("현재페이지/전체페이지: %d/%d%n", start + 1, lastPage);
        System.out.println("총 레코드 수: " + total);
        System.out.println("1. 이전\t2. 다음\t3. 종료");
        System.out.print("페이지 명령: ");
    }

    private void executeInsert(Scanner sc) {
        System.out.print("이름: ");
        String name = sc.nextLine();

        Member member = new Member(null, name);
        member = repository.save(member);

        System.out.println(member.getName() + "님이 등록되었습니다.");
    }

    private void executeDelete(Scanner sc) {
        System.out.print("삭제할 Id: ");

        try {
            int id = Integer.valueOf(sc.nextLine());
            if(repository.existsById(id)) {
                repository.deleteById(id);
                System.out.println(id + "번 사용자가 삭제되었습니다.");
            } else {
                System.out.println(id + "번 사용자가 존재하지 않습니다.");
            }
        } catch (Exception e) {
            System.out.println("숫자만 입력해주세요.");
        }
    }

    private void executeUpdate(Scanner sc) {
        System.out.print("수정할 Id: ");
        int id = sc.nextInt();
        sc.nextLine();
        if(repository.existsById(id)) {
            Optional<Member> m = repository.findById(id);
            if(m.isPresent()) {
                Member member = (Member) m.get();
                System.out.print(member.getName() + "을(를) 수정할 이름: ");
                String newName = sc.nextLine();
                Member newMember = new Member(id, newName);
                repository.save(newMember);
                System.out.println(id + "번 사용자의 이름이 " + newName + "으(로) 변경되었습니다.");
            }
        } else {
            System.out.println(id + "번 사용자가 존재하지 않습니다.");
        }
    }

    private void executeSort(Scanner sc) {
        System.out.println("정렬 방법을 선택하세요. (1: 오름차순, 2: 내림차순)");
        int sortNum = sc.nextInt();
        sc.nextLine();

        if(sortNum == 1) {
            System.out.println("-- 오름차순 정렬 --");
            System.out.println("Id   Name");

            Iterable<Member> members = repository.sortAscName();
            for(Member member : members) {
                System.out.printf("%d   %s\n", member.getId(), member.getName());
            }
        } else if(sortNum == 2) {
            System.out.println("-- 내림차순 정렬 --");
            System.out.println("Id   Name");

            Iterable<Member> members = repository.sortDescName();
            for(Member member : members) {
                System.out.printf("%d   %s\n", member.getId(), member.getName());
            }
        } else {
            System.out.println("입력 실패: 1 또는 2만 입력하세요.");
        }
    }

    private void executeSearch(Scanner sc) {
        System.out.print("검색: ");
        String strSearch = sc.nextLine();

        Iterable<Member> members = repository.searchList("%" + strSearch + "%");

        System.out.println();
        System.out.println("-- 검색된 리스트 --");
        System.out.println("Id   Name");

        for(Member member : members) {
            System.out.printf("%d   %s\n", member.getId(), member.getName());
        }


    }
}
