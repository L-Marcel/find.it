package com.find.it.backend.dtos;

import com.find.it.backend.models.ContactType;
import com.find.it.backend.models.User;
import java.util.UUID;

import lombok.Data;

@Data
public class UserData {
  private UUID id;
  private String name;
  private String email = null;
  private String phone = null;
  private String picture = "";
  private boolean whatsapp = false;

  private int donated = 0;
  private int recovered = 0;
  private int finds = 0;

  private String updatedAt;
  private ContactType contact = ContactType.NONE;

  public UserData(User user, boolean authenticated) {
    this.id = user.getId();
    this.name = user.getName();
    this.contact = user.getContact();
    this.picture = user.getPicture();
    this.donated = user.getDonated();
    this.recovered = user.getRecovered();
    this.finds = user.getFinds();
    this.whatsapp = user.isWhatsapp();
    this.updatedAt = user.getUpdatedAt().toString();
    if (authenticated) {
      this.email = user.getEmail();
      this.phone = user.getPhone();
    } else {
      switch (this.contact) {
        case ContactType.BOTH:
          this.email = user.getEmail();
          this.phone = user.getPhone();
          break;
        case ContactType.EMAIL:
          this.email = user.getEmail();
          break;
        case ContactType.PHONE:
          this.phone = user.getPhone();
          break;
        default:
          break;
      }
    }
    ;
  };
}
