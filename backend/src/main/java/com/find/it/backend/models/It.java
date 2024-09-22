package com.find.it.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

enum ItType {
  DONATION,
  LOST,
  FIND
};

@Entity
@Table(name = "Its")
public class It {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Getter
  @Setter
  private long id;

  @Enumerated(EnumType.ORDINAL)
  @Getter
  @Setter
  private ItType type;

  @Getter
  @Setter
  private String title;

  @Getter
  @Setter
  private String picture = "";

  @Getter
  @Setter
  private String description = "";

  @Getter
  @Setter
  private String city;

  @Getter
  @Setter
  private String state;

  @Getter
  @Setter
  private String street = "";

  @Getter
  @Setter
  private String district = "";

  @Getter
  @Setter
  private String number = "";

  @Getter
  @Setter
  private String complement = "";
};
