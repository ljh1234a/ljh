//package com.example.Shoppingmall.dto;
//
//import com.example.Shoppingmall.entity.User;
//import jakarta.persistence.Id;
//import jakarta.validation.constraints.NotEmpty;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class UserFormDTO {
//    @Id
//    private Long id;
//
//    @NotEmpty(message = "이름을 입력해주세요.")
//    private String userName;
//
//    @NotEmpty(message = "아이디를 입력해주세요.")
//    private String userId;
//
//    @NotEmpty(message = "비밀번호를 입력해주세요.")
//    private String password;
//
//    public static UserFormDTO toUserDTO(User user) {
//        UserFormDTO userFormDTO = new UserFormDTO();
//        userFormDTO.setUserId(user.getUserId());
//        userFormDTO.setUserName(user.getUserName());
//        userFormDTO.setPassword(user.getPassword());
//
//        return userFormDTO;
//    }
//}
