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
import com.find.it.backend.errors.Unauthorized;
import com.find.it.backend.repositories.UserRepository;
import com.find.it.backend.security.Auth;

@Service
public class UserService {
  @Autowired
  private UserRepository repository;

  public void create(UserDTO newUser) {
    Map<String, String> errors = new HashMap<>();

    if (repository.existsByName(newUser.getName())) {
      errors.put("name", "Esse nome já está em uso!");
    }
    if (repository.existsByEmail(newUser.getEmail())) {
      errors.put("email", "Esse e-mail já está em uso!");
    }
    if (repository.existsByPhone(newUser.getPhone())) {
      errors.put("phone", "Esse telefone já está em uso!");
    }

    if (!errors.isEmpty()) {
      throw new AlreadyExists(errors);
    }

    User user = new User(newUser);
    repository.save(user);
  }

  public User findById(UUID id) {
    Optional<User> user = repository.findById(id);
    if (!user.isPresent()) {
      throw new NotFound("Usuário não encontrado!");
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

  public UserDTO login(UserDTO user) {
    Optional<User> currentUser = repository.findByEmailAndPassword(user.getEmail(), user.getPassword());

    if (!currentUser.isPresent()) {
      throw new Unauthorized("Permissão negada!");
    }

    String token = Auth.encrypt(currentUser.get().getId());

    return new UserDTO(token, currentUser.get());
  };
}
