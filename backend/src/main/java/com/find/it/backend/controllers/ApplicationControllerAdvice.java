package com.find.it.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.find.it.backend.errors.AlreadyExists;
import com.find.it.backend.errors.NotFound;

@RestControllerAdvice
public class ApplicationControllerAdvice {

  @ExceptionHandler(NotFound.class)
  public ResponseEntity<Map<String,Object>> handleNotFoundException(NotFound ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("status", HttpStatus.NOT_FOUND.value());
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  @ExceptionHandler(AlreadyExists.class)
  public ResponseEntity<Map<String, Object>> handleAlreadyExistsException(AlreadyExists ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("status", HttpStatus.CONFLICT.value());
    response.put("message", ex.getMessage());
    response.put("field", ex.getField());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
  }
}