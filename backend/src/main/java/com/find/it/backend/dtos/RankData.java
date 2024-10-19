package com.find.it.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankData {
  List<UserData> byFinds;
  List<UserData> byRecovereds;
  List<UserData> byDonateds;
}
