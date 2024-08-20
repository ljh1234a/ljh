package com.example.SpringDataJDBCSample;

import com.example.SpringDataJDBCSample.entity.User;
import com.example.SpringDataJDBCSample.repository.UserCrudRepository;
import com.example.SpringDataJDBCSample.repository.UserPagingAndSortingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
public class UserCRUD {
    public static void main(String[] args) throws ParseException {
        SpringApplication.run(UserCRUD.class, args)
                .getBean(UserCRUD.class).execute();
    }

    @Autowired
    UserCrudRepository repository;

    @Autowired
    UserPagingAndSortingRepository pagingAndSortingRepository;

    private void execute() throws ParseException {
        Scanner sc = new Scanner(System.in);
        String command = "";

        while(true) {
            System.out.println();
            System.out.println("명령어 선택 (0: 페이지 단위 리스트, 1: 리스트, 2: 입력, 3: 삭제, 4: 업데이트, 5: 정렬, 6: 검색, q: 종료)");
            command = sc.nextLine().toLowerCase();
            switch (command) {
                case "0":
                    executePageSelect(sc);
                    break;
                case "1":
                    executeSelect(sc);
                    break;
                case "2":
                    executeInsert(sc);
                    break;
                case "3":
                    executeDelete(sc);
                    break;
                case "4":
                    executeUpdate(sc);
                    break;
                case "5":
                    executeSort(sc);
                    break;
                case "6":
                    executeSearch(sc);
                    break;
                case "q":
                    System.out.println("프로그램을 종료합니다.");
                    System.exit(0);
                default:
                    System.out.println("잘못된 명령어입니다.");
            }
        }
    }

    // 0: 페이지 단위 리스트
    private void executePageSelect(Scanner sc) {
        int start = 0;
        final int pagePerRows = 10;
        long total = repository.count();
        int lastPage = getLastPage(total, pagePerRows);

        OUT:
        while(true) {
            Page<User> users = pagingAndSortingRepository.findAll(PageRequest.of(start, pagePerRows, Sort.by("user_id").ascending()));

            display(users, total, start, lastPage);

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
                    System.out.println("잘못된 명령어입니다.");
            }
        }
        sc.nextLine();
    }

    private int getLastPage(long total, int pagePerRows) {
        return (int)((total / pagePerRows) + (total % pagePerRows > 0 ? 1 : 0));
    }

    private void display(Page<User> users, long total, int start, int lastPage) {
        System.out.println("          ▶ 페이지 단위 유저 리스트 ◀");
        System.out.printf("Id\tName\tAge\t\tAddress\t\tBirth\n");
        for(User user : users) {
            int id = user.getUser_id();
            if(user.getUser_address().length() == 2) {
                System.out.printf("%d\t%s\t%d\t\t%s\t\t\t%s\n", user.getUser_id(), user.getUser_name(), user.getUser_age(), user.getUser_address(), user.getUser_birth());
            } else if (user.getUser_address().length() == 3) {
                System.out.printf("%d\t%s\t%d\t\t%s\t\t%s\n", user.getUser_id(), user.getUser_name(), user.getUser_age(), user.getUser_address(), user.getUser_birth());
            } else {
                System.out.printf("%d\t%s\t%d\t\t%s\t%s\n", user.getUser_id(), user.getUser_name(), user.getUser_age(), user.getUser_address(), user.getUser_birth());
            }
        }

        System.out.printf("                   %d / %d%n", start + 1, lastPage);
        System.out.println("              총 레코드 수: " + total);
        System.out.println();
        System.out.println("1. 이전\t2. 다음\t3. 종료");
        System.out.print("페이지 명령: ");
    }

    private void showColumns() {
        System.out.printf("Id\tName\tAge\t\tAddress\t\tBirth\n");
    }

    private void showUsers(User user) {
        if(user.getUser_address().length() == 2) {
            System.out.printf("%d\t%s\t%d\t\t%s\t\t\t%s\n", user.getUser_id(), user.getUser_name(), user.getUser_age(), user.getUser_address(), user.getUser_birth());
        } else if (user.getUser_address().length() == 3) {
            System.out.printf("%d\t%s\t%d\t\t%s\t\t%s\n", user.getUser_id(), user.getUser_name(), user.getUser_age(), user.getUser_address(), user.getUser_birth());
        } else {
            System.out.printf("%d\t%s\t%d\t\t%s\t%s\n", user.getUser_id(), user.getUser_name(), user.getUser_age(), user.getUser_address(), user.getUser_birth());
        }
    }

    // 1: 리스트
    private void executeSelect(Scanner sc) {
        System.out.println("              ▶ 유저 리스트 ◀");

        Iterable<User> users = repository.findAll();

        showColumns();
        for(User user : users) {
            showUsers(user);
        }
    }

    // 2: 입력
    private void executeInsert(Scanner sc) throws ParseException {
        System.out.println("0: 취소");
        System.out.print("이름: ");
        String name = sc.nextLine();

        if(name.equals("0")) {
            return;
        }

        while(name.trim().isEmpty()) {
            System.out.println("이름을 입력하지 않았습니다.");
            System.out.print("이름: ");
            name = sc.nextLine();
        }

        System.out.print("나이: ");
        String strAge = sc.nextLine();

        if(strAge.equals("0")) {
            return;
        }

        while(strAge.trim().isEmpty()) {
            System.out.println("나이를 입력하지 않았습니다.");
            System.out.print("나이: ");

            strAge = sc.nextLine();
        }

        boolean ageIsDigit = false;

        while(!ageIsDigit) {
            for(char ch : strAge.toCharArray()) {
                if(!Character.isDigit(ch)) {
                    System.out.println("나이는 양수만 입력해야 합니다.");
                    System.out.print("나이: ");

                    strAge = sc.nextLine();
                } else {
                    ageIsDigit = true;
                }
            }
        }

        int age = Integer.parseInt(strAge);

        System.out.print("주소: ");
        String address = sc.nextLine();

        if(address.equals("0")) {
            return;
        }

        while(address.trim().isEmpty()) {
            System.out.println("주소를 입력하지 않았습니다.");
            System.out.print("주소: ");
            address = sc.nextLine();
        }

        System.out.print("생년월일 ex) 19981218) : ");
        String strBirth = sc.nextLine();

        if(strBirth.equals("0")) {
            return;
        }

        while(strBirth.trim().isEmpty()) {
            System.out.println("생년월일을 입력하지 않았습니다.");
            System.out.print("생년월일: ");
            strBirth = sc.nextLine();
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date birth = sdf.parse(strBirth);

        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd");
        birth = sdf2.parse(strBirth);

        User user = new User(null, name, age, address, birth);
        user = repository.save(user);
        System.out.println(user.getUser_name() + "님이 리스트에 등록되었습니다.");
        executeSelect(sc);
    }

    // 3: 삭제
    private void executeDelete(Scanner sc) {
        executeSelect(sc);
        System.out.println();
        System.out.println("0: 취소");

        int id = -1;

        while (true) {
            try {
                System.out.print("삭제할 Id: ");
                String strId = sc.nextLine();

                if (strId.equals("0")) {
                    return;
                }

                id = Integer.parseInt(strId);

                if (id < 0) {
                    System.out.println("Id는 양수만 입력해야 합니다.");
                    continue;
                }

                if (!repository.existsById(id)) {
                    System.out.println(id + "번 사용자의 데이터가 없습니다.");
                    continue;
                }
                break;
            } catch (NumberFormatException e) {
                System.out.println("Id는 양수만 입력해야 합니다.");
            }
        }

        System.out.println();
        System.out.println("정말로 " + id + "번 사용자의 데이터를 삭제하시겠습니까? (y: 삭제, n: 취소)");
        String isDel = sc.nextLine();

        if(isDel.equals("y")) {
            repository.deleteById(id);
            System.out.println();
            System.out.println(id + "번 사용자의 데이터를 삭제했습니다.");
            executeSelect(sc);
        } else if(isDel.equals("n")) {
            System.out.println();
            System.out.println("삭제를 취소하였습니다.");
        } else {
            System.out.println();
            System.out.println("잘못된 명령어입니다.");
        }
    }

    // 4: 업데이트
    private void executeUpdate(Scanner sc) {
        executeSelect(sc);
        System.out.println();
        System.out.println("0: 취소");

        int id = -1;

        while(true) {
            try {
                System.out.print("수정할 Id: ");

                String strId = sc.nextLine();

                if (strId.equals("0")) {
                    return;
                }

                id = Integer.parseInt(strId);

                if(repository.existsById(id)) {
                    Optional<User> u = repository.findById(id);
                    String newName;
                    Integer newAge;
                    String newAddress;
                    Date newBirth;
                    String chanceInfo = "";
                    if(u.isPresent()) {
                        User user = (User) u.get();
                        System.out.println("※ 해당 정보를 수정하고 싶지 않다면 입력하지 않고 Enter를 누르세요. (Id는 필수)");
                        System.out.println("0: 취소");
                        System.out.print(user.getUser_name() + " => ");
                        newName = sc.nextLine();
                        if(newName.isEmpty()) {
                            newName = user.getUser_name();
                        } else {
                            chanceInfo += "이름 ";
                        }

                        System.out.print(user.getUser_age() + " => ");
                        String strAge = sc.nextLine();

                        boolean ageIsDigit = false;

                        while(!ageIsDigit) {
                            for(char ch : strAge.toCharArray()) {
                                if(!Character.isDigit(ch)) {
                                    System.out.println("나이는 양수만 입력해야 합니다.");
                                    System.out.print("나이: ");

                                    strAge = sc.nextLine();
                                } else {
                                    ageIsDigit = true;
                                }
                            }
                        }

                        if(strAge.isEmpty()) {
                            newAge = user.getUser_age();
                        } else {
                            newAge = Integer.parseInt(strAge);
                            chanceInfo += "나이 ";
                        }

                        System.out.print(user.getUser_address() + " => ");
                        newAddress = sc.nextLine();
                        if(newAddress.isEmpty()) {
                            newAddress = user.getUser_address();
                        } else {
                            chanceInfo += "주소 ";
                        }

                        System.out.print(user.getUser_birth() + " => ");
                        String strNewBirth = sc.nextLine();
                        if(strNewBirth.isEmpty()) {
                            newBirth = user.getUser_birth();
                        } else {
                            chanceInfo += "생년월일 ";
                            SimpleDateFormat sdf3 = new SimpleDateFormat("yyyyMMdd");
                            newBirth = sdf3.parse(strNewBirth);
                        }
                        User newUser = new User(id, newName, newAge, newAddress, newBirth);
                        repository.save(newUser);

                        System.out.println();
                        System.out.println(id + "번 사용자의 정보가 수정되었습니다. 수정된 정보: " + chanceInfo);
                        executeSelect(sc);
                        break;
                    }
                } else if (id < 0) {
                    System.out.println("Id는 양수만 입력해야 합니다.");
                }
                else {
                    System.out.println(id + "번 사용자의 데이터가 없습니다");
                }
            } catch (NumberFormatException e) {
                System.out.println("Id는 양수만 입력해야 합니다.");
            } catch (ParseException e) {}
        }
    }

    // 5. 정렬
    private void executeSort(Scanner sc) {
        System.out.println("정렬 방법을 선택하세요. (0: 취소, 1: 이름 오름차순, 2. 이름 내림차순, 3. 생년월일 오름차순, 4. 생년월일 내림차순)");
        String sortNum = sc.nextLine();
        
        switch (sortNum) {
            case "0":
                return;
            case "1":
                Iterable<User> user1 = repository.sortAscName();
                System.out.println("           ▶ 이름 오름차순 정렬 ◀");
                showColumns();
                for(User user : user1) {
                    showUsers(user);
                }
                break;
            case "2":
                Iterable<User> user2 = repository.sortDescName();
                System.out.println("           ▶ 이름 내림차순 정렬 ◀");
                showColumns();
                for(User user : user2) {
                    showUsers(user);
                }
                break;
            case "3":
                Iterable<User> user3 = repository.sortAscBirth();
                System.out.println("          ▶ 생년월일 오름차순 정렬 ◀");
                showColumns();
                for(User user : user3) {
                    showUsers(user);
                }
                break;
            case "4":
                Iterable<User> user4 = repository.sortDescBirth();
                System.out.println("          ▶ 생년월일 내림차순 정렬 ◀");
                showColumns();
                for(User user : user4) {
                    showUsers(user);
                }
                break;
            default:
                System.out.println("잘못된 명령어입니다.");
        }

    }

    private void executeSearch(Scanner sc) {
        System.out.println("0: 취소");
        System.out.print("검색할 이름: ");
        String srcName = sc.nextLine();

        if(srcName.equals("0")) {
            return;
        }

        Iterable<User> users = repository.searchName("%" + srcName + "%");

        System.out.println();
        System.out.println("   ▶ 이름에 '"+ srcName + "'이(가) 포함된 유저 리스트 ◀");
        showColumns();

        for(User user : users) {
            showUsers(user);
        }
    }
}
