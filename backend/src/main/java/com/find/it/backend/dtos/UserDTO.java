package com.find.it.backend.dtos;

import java.util.UUID;
import com.find.it.backend.models.ContactType;

public record UserDTO(UUID id, String name, String email, String phone, String password, ContactType contact) {}
