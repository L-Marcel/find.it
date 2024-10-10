package com.find.it.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.find.it.backend.dtos.AuthData;
import com.find.it.backend.dtos.UserData;
import com.find.it.backend.dtos.records.UserCreateData;
import com.find.it.backend.dtos.records.UserLoginData;
import com.find.it.backend.services.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
  public ResponseEntity<List<UserData>> getAll(@RequestParam(required = false, defaultValue = "0") Integer page) {
    List<UserData> allUsersData = service.getAll(page);
    return ResponseEntity.ok(allUsersData);
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserData> getById(
      @PathVariable UUID id,
      @RequestHeader(value = "Authorization", required = false) String token) {
    UserData data = service.getById(id, token);
    return ResponseEntity.ok(data);
  }

  @PostMapping
  public ResponseEntity<String> register(@Validated @RequestBody UserCreateData user) {
    service.create(user);
    return ResponseEntity.status(HttpStatus.CREATED).body("New user registered");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(
      @PathVariable UUID id,
      @RequestHeader(value = "Authorization", required = false) String token) {
    service.delete(id, token);
    return ResponseEntity.status(HttpStatus.OK).body("User deleted");
  }

  @PostMapping("/login")
  public ResponseEntity<AuthData> login(@RequestBody UserLoginData user) {
    AuthData auth = service.login(user);
    return ResponseEntity.ok(auth);
  }
}