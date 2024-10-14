package com.find.it.backend.errors;

import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

import java.util.Map;

import org.springframework.http.HttpStatus;

@Getter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidField extends RuntimeException {
  protected String field;
  protected Map<String, String> errors;

  public InvalidField(String message) {
    super(message);
  };

  public InvalidField(String message, String field) {
    super(message);
    this.field = field;
  }

  public InvalidField(Map<String, String> errors) {
    this.errors = errors;
  }
};