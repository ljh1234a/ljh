package com.example.Shop.service;

import com.example.Shop.dto.UserFormDTO;

import java.util.List;

public interface UserService {
    Long join(UserFormDTO memberFormDTO);
    boolean authenticate(String userId, String password);
    String getUsernameById(String userId);
    List<UserFormDTO> findAll();
}

