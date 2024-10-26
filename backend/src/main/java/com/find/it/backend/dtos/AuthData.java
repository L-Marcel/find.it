package com.find.it.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthData {
  private String token;
  private UserData user;
}
