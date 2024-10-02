package com.find.it.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.find.it.backend.dtos.UserDTO;
import com.find.it.backend.models.User;
import com.find.it.backend.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;
import java.util.List;

@Validated
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/users")
public class UsersController {
  @Autowired
  private UserService service;

  @GetMapping
  public ResponseEntity<List<User>> getAll() {
    List<User> allUsers = service.findAll();
    return ResponseEntity.ok(allUsers);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getById(@PathVariable UUID id) {
    User user = service.findById(id);
    return ResponseEntity.ok(user);
  }

  @PostMapping
  public ResponseEntity<String> register(@Validated(UserDTO.Create.class) @RequestBody UserDTO newUser) {
    service.create(newUser);
    return ResponseEntity.status(HttpStatus.CREATED).body("New user registered");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(@PathVariable UUID id) {
    service.deleteUser(id);
    return ResponseEntity.status(HttpStatus.OK).body("User deleted");
  }

  @PostMapping("/login")
  public ResponseEntity<UserDTO> login(@RequestBody UserDTO user) {
    UserDTO currentUser = service.login(user);
    return ResponseEntity.ok(currentUser);
  }
}