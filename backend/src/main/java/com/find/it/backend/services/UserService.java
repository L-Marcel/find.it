package com.find.it.backend.services;

import com.find.it.backend.models.User;

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
    if (repository.existsByName(newUser.getName())) {
      throw new AlreadyExists("Name already exists", "Name");
    } else if (repository.existsByEmail(newUser.getEmail())) {
      throw new AlreadyExists("Email already exists", "Email");
    } else if (repository.existsByPhone(newUser.getPhone())) {
      throw new AlreadyExists("Phone already exists", "Phone");
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
