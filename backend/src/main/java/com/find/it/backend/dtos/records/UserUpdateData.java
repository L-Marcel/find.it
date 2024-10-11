package com.find.it.backend.dtos.records;

import com.find.it.backend.models.ContactType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserUpdateData(
    @NotBlank(message = "O nome é obrigatório!") String name,
    @NotBlank(message = "O e-mail é obrigatório!") @Email(message = "Formato inválido de e-mail!") String email,
    @NotBlank(message = "O telefone é obrigatório!") String phone,
    String password,
    boolean whatsapp,
    String profile,
    String passwordConfirmation,
    boolean updatePassword,
    ContactType contact) {
};