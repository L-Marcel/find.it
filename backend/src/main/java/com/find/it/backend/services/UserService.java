package com.find.it.backend.services;

import com.find.it.backend.models.User;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.find.it.backend.dtos.UserDTO;
import com.find.it.backend.errors.AlreadyExists;
import com.find.it.backend.errors.NotFound;
import com.find.it.backend.repositories.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository repository;

  public void validateAndCreateUser(UserDTO newUser) {
    Map<String,String> errors = new HashMap<>();

    if (repository.existsByName(newUser.getName())) {
      errors.put("Name", "Name already exists");
    }
    if (repository.existsByEmail(newUser.getEmail())) {
      errors.put("Email", "Email already exists");
    }
    if (repository.existsByPhone(newUser.getPhone())) {
      errors.put("Phone", "Phone already exists");
    }

    if(!errors.isEmpty()){
      throw new AlreadyExists(errors);
    }

    User user = new User(newUser);
    repository.save(user);
  }

  public User findById(UUID id) {
    Optional<User> user = repository.findById(id);
    if (!user.isPresent()) {
      throw new NotFound("User not found");
    }
    return user.get();
  }

  public List<User> findAll() {
    List<User> allUsers = repository.findAll();
    return allUsers;
  }

  public void deleteUser(UUID id) {
    User user = this.findById(id);
    repository.delete(user);
  };
}
