package com.find.it.backend.dtos;

import java.util.UUID;
import com.find.it.backend.models.ContactType;
import com.find.it.backend.models.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  public interface Create {
  };

  private UUID id;

  @NotBlank(message = "O nome é obrigatório!", groups = Create.class)
  private String name;

  @NotBlank(message = "O e-mail é obrigatório!", groups = Create.class)
  @Email(message = "Formato inválido de e-mail!", groups = Create.class)
  private String email;

  @NotBlank(message = "O telefone é obrigatório!", groups = Create.class)
  private String phone;

  @NotBlank(message = "A senha é obrigatória!", groups = Create.class)
  private String password;

  private ContactType contact = ContactType.NONE;

  private String token;

  public UserDTO(String token, User user) {
    this.token = token;
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.phone = user.getPhone();
    this.contact = user.getContact();
  };
}
