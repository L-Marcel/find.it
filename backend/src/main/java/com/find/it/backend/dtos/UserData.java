package com.find.it.backend.dtos;

import com.find.it.backend.models.ContactType;
import com.find.it.backend.models.User;
import java.util.UUID;

import lombok.Data;

@Data
public class UserData {
  protected UUID id;
  protected String name;
  protected String email = null;
  protected String phone = null;
  protected String picture;

  protected int donated = 0;
  protected int recovered = 0;
  protected int finds = 0;

  protected ContactType contact = ContactType.NONE;

  public UserData(User user, boolean authenticated) {
    this.id = user.getId();
    this.name = user.getName();
    this.contact = user.getContact();
    this.picture = user.getPicture();
    this.donated = user.getDonated();
    this.recovered = user.getRecovered();
    this.finds = user.getFinds();
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
