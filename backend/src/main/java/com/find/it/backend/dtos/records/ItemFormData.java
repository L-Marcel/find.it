package com.find.it.backend.dtos.records;

import com.find.it.backend.models.ItemType;

import jakarta.validation.constraints.NotBlank;

public record ItemFormData(
    @NotBlank(message = "O título é obrigatório!") String title,
    @NotBlank(message = "A cidade é obrigatória!") String city,
    @NotBlank(message = "O estado é obrigatório!") String state,
    String picture,
    String description,
    String street,
    String district,
    int number,
    String complement,
    ItemType type,
    @NotBlank(message = "O responsável é obrigatório!") String owner) {
};