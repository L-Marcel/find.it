package com.find.it.backend.dtos.records;

import com.find.it.backend.models.ContactType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserCreateData(
    @NotBlank(message = "O nome é obrigatório!") String name,
    @NotBlank(message = "O e-mail é obrigatório!") @Email(message = "Formato inválido de e-mail!") String email,
    @NotBlank(message = "O telefone é obrigatório!") String phone,
    @NotBlank(message = "A senha é obrigatória!") String password,
    String profile,
    String passwordConfirmation,
    ContactType contact) {
};