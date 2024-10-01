package com.find.it.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.find.it.backend.dtos.UserDTO;
import com.find.it.backend.errors.NotFound;
import com.find.it.backend.models.User;
import com.find.it.backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;
import java.util.UUID;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UsersController {
  @Autowired
  private UserRepository repository;

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
      List<User> allUsers = repository.findAll();
      return ResponseEntity.ok(allUsers);
  }
  

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable UUID id) {
    Optional<User> user = repository.findById(id);
    if(user.isPresent()){
      return ResponseEntity.ok(user.get());
    }
    throw new NotFound("User not found");
  }

  @PostMapping
  public ResponseEntity<String> registerUser(@RequestBody UserDTO user) {
    User newUser = new User(user);
    repository.save(newUser);
    return ResponseEntity.ok("New user registered");
  }
  
}