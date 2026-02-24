package com.example.carrental.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrental.entity.User;
import com.example.carrental.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }


@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User request) {

    Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

    if (userOptional.isEmpty()) {
        return ResponseEntity.status(401).body("User not found");
    }

    User user = userOptional.get();

    if (!user.getPassword().equals(request.getPassword())) {
        return ResponseEntity.status(401).body("Invalid password");
    }

    return ResponseEntity.ok(user);
}
}