package com.find.it.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.find.it.backend.dtos.ItemData;
import com.find.it.backend.dtos.records.ItemFormData;
import com.find.it.backend.services.ItemService;

@Validated
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/items")
public class ItemsControlers {
  @Autowired
  private ItemService service;

  @GetMapping("/{id}")
  public ResponseEntity<ItemData> getById(@PathVariable Long id) {
    ItemData data = service.getById(id);
    return ResponseEntity.ok(data);
  }

  @GetMapping("/{state}/{city}")
  public ResponseEntity<List<ItemData>> searchByTextAndLocation(
      @PathVariable String state,
      @PathVariable String city,
      @RequestParam(required = false, defaultValue = "") String query,
      @RequestParam(required = false, defaultValue = "0") Integer page) {
    List<ItemData> items = service.searchByTextAndLocation(query, city, state, page);
    return ResponseEntity.ok(items);
  }

  @PostMapping
  public ResponseEntity<String> create(@Validated @RequestBody ItemFormData item,
      @RequestHeader(value = "Authorization", required = false) String token) {
    service.create(item, token);
    return ResponseEntity.status(HttpStatus.CREATED).body("New item registered");
  }

  @PostMapping("/{id}/close")
  public ResponseEntity<String> close(@PathVariable Long id,
      @RequestHeader(value = "Authorization", required = false) String token) {
    service.close(id, token);
    return ResponseEntity.ok("Item closed!");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable Long id,
      @RequestHeader(value = "Authorization", required = false) String token) {
    service.delete(id, token);
    return ResponseEntity.ok("Item deleted!");
  }

  @PutMapping("/{id}")
  public ResponseEntity<String> update(
      @Validated @RequestBody ItemFormData user,
      @PathVariable Long id,
      @RequestHeader(value = "Authorization", required = false) String token) {
    service.update(user, id, token);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body("Item updated!");
  }
}