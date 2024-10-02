package com.find.it.backend.errors;

import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

import java.util.Map;

import org.springframework.http.HttpStatus;

@Getter
@ResponseStatus(HttpStatus.CONFLICT)
public class AlreadyExists extends RuntimeException {
  private String field;
  private Map<String, String> errors;

  public AlreadyExists(String message) {
    super(message);
  };

  public AlreadyExists(String message, String field) {
    super(message);
    this.field = field;
  }

  public AlreadyExists(Map<String, String> errors) {
    this.errors = errors;
  }
};