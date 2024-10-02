package com.find.it.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.find.it.backend.errors.AlreadyExists;
import com.find.it.backend.errors.NotFound;

@RestControllerAdvice
public class ApplicationControllerAdvice {
  @ExceptionHandler(NotFound.class)
  public ResponseEntity<Map<String, Object>> handleNotFoundException(NotFound ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("status", HttpStatus.NOT_FOUND.value());
    response.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  @ExceptionHandler(AlreadyExists.class)
  public ResponseEntity<Map<String, Object>> handleAlreadyExistsException(AlreadyExists ex) {
    Map<String, Object> response = new HashMap<>();

    response.put("status", HttpStatus.CONFLICT.value());
    response.put("fields", ex.getErrors());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, Object> response = new HashMap<>();
    Map<String, Object> fields = new HashMap<>();

    ex.getBindingResult().getAllErrors().forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      fields.put(fieldName, errorMessage);
    });

    response.put("status", HttpStatus.BAD_REQUEST.value());
    response.put("fields", fields);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }
}