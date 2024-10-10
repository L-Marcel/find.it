package com.find.it.backend.services;

import com.find.it.backend.models.User;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.find.it.backend.dtos.AuthData;
import com.find.it.backend.dtos.UserData;
import com.find.it.backend.dtos.records.UserCreateData;
import com.find.it.backend.dtos.records.UserLoginData;
import com.find.it.backend.errors.AlreadyExists;
import com.find.it.backend.errors.NotFound;
import com.find.it.backend.errors.Unauthorized;
import com.find.it.backend.repositories.UserRepository;
import com.find.it.backend.repositories.PictureRepository;
import com.find.it.backend.security.Auth;

@Service
public class UserService {
  @Autowired
  private UserRepository repository;

  @Autowired
  private PictureRepository pictures;

  public void create(UserCreateData newUser) {
    Map<String, String> errors = new HashMap<>();

    if (repository.existsByName(newUser.name())) {
      errors.put("name", "Esse nome já está em uso!");
    }
    if (repository.existsByEmail(newUser.email())) {
      errors.put("email", "Esse e-mail já está em uso!");
    }
    if (repository.existsByPhone(newUser.phone())) {
      errors.put("phone", "Esse telefone já está em uso!");
    }
    if (!newUser.password().equals(newUser.passwordConfirmation())) {
      errors.put("password", "Senhas não coincidem!");
    }

    if (!errors.isEmpty()) {
      throw new AlreadyExists(errors);
    }

    User user = new User(newUser);
    user = repository.save(user);
    user.setPicture(pictures.createUserPicture(user.getId(), newUser.profile()));
    repository.save(user);
  }

  public User findById(UUID id) {
    Optional<User> user = repository.findById(id);
    if (!user.isPresent()) {
      throw new NotFound("Usuário não encontrado!");
    }
    return user.get();
  }

  public List<User> findAll(int pageNumber) {
    Pageable page = PageRequest.of(pageNumber, 10);
    Page<User> allUsers = repository.findAll(page);
    return allUsers.toList();
  }

  public UserData getDataById(UUID id, String token) {
    User user = this.findById(id);
    if (token == null)
      return new UserData(user, false);
    else {
      Auth.validate(user.getId(), token);
      return new UserData(user, true);
    }
  };

  public List<UserData> getAllUsersData(int pageNumber) {
    return this.findAll(pageNumber).stream()
        .map(user -> new UserData(user, false))
        .collect(Collectors.toList());
  };

  public void deleteUser(UUID id, String token) {
    User user = this.findById(id);
    Auth.validate(user.getId(), token);
    repository.delete(user);
  };

  public AuthData login(UserLoginData user) {
    Optional<User> currentUser = repository.findByEmailAndPassword(user.email(), user.password());

    if (!currentUser.isPresent()) {
      throw new Unauthorized("Permissão negada!");
    }

    String token = Auth.encrypt(currentUser.get().getId());

    return new AuthData(token, new UserData(currentUser.get(), true));
  };
}
