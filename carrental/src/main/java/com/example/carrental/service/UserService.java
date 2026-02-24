package com.example.carrental.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.carrental.entity.User;
import com.example.carrental.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
    public User login(String email, String password) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.getPassword().equals(password)) {
        throw new RuntimeException("Invalid credentials");
    }

    return user;
}
}