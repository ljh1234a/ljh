package com.example.Shop.service;

import com.example.Shop.entity.User;
import com.example.Shop.dto.UserFormDTO;
import com.example.Shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Long join(UserFormDTO userFormDTO) {
//        String encodedPassword = passwordEncoder.encode(userFormDTO.getPassword());

        User user = User.builder()
                .userId(userFormDTO.getUserId())
                .userName(userFormDTO.getUserName())
                .password(userFormDTO.getPassword())
                .build();

        return userRepository.save(user).getId();
    }

    @Override
    public boolean authenticate(String userId, String password) {
        Optional<User> user = userRepository.findByUserId(userId);

        if (user.isEmpty()) {
            return false; // 사용자가 존재하지 않는 경우
        }

        // 비밀번호 비교
//        return passwordEncoder.matches(password, user.get().getPassword());
        return password.equals(user.get().getPassword());
    }

    public UserFormDTO login(UserFormDTO userFormDTO){
        Optional<User> byUserId = userRepository.findByUserId(userFormDTO.getUserId());


        if(byUserId.isPresent()){
            User user = byUserId.get();
            if(user.getPassword().equals(userFormDTO.getPassword())) {
//                UserFormDTO dto = UserFormDTO.toUserDTO(user);
//                return dto;
                return UserFormDTO.toUserDTO(user);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public String getUsernameById(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        return user.map(User::getUserName).orElse(null);
    }

    public List<UserFormDTO> findAll() {
        List<User> userList = userRepository.findAll();

        List<UserFormDTO> userFormDTOList = new ArrayList<>();
        for (User user : userList) {
            userFormDTOList.add(UserFormDTO.toUserDTO(user));
        }
        return userFormDTOList;
    }
}
