package com.find.it.backend.repositories;

import java.util.Base64;
import java.util.UUID;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;

@Repository
public class PictureRepository {
  private Path getUsersPath() throws Exception {
    return Paths.get("data/users").toAbsolutePath();
  };

  private Path getItemsPath() throws Exception {
    return Paths.get("data/items").toAbsolutePath();
  };

  private String create(String data, String filename, String path) {
    try {
      String[] parts = data.split(",");
      String base64 = parts[1];
      String mine = "png";

      if (parts[0].contains("jpeg")) {
        mine = "jpeg";
      }

      byte[] bytes = Base64.getDecoder().decode(base64);
      ByteArrayInputStream stream = new ByteArrayInputStream(bytes);
      BufferedImage image = ImageIO.read(stream);
      File outputFile = new File(path + "/" + filename + "." + mine);
      ImageIO.write(image, "png", outputFile);
      return outputFile.getName();
    } catch (Exception e) {
      return "";
    }
  };

  public String createToUser(UUID id, String data) {
    try {
      String path = this.getUsersPath().toString();
      return this.create(data, id.toString(), path);
    } catch (Exception e) {
      return "";
    }
  };

  public String createToItem(Long id, String data) {
    try {
      String path = this.getItemsPath().toString();
      return this.create(data, id.toString(), path);
    } catch (Exception e) {
      return "";
    }
  };

  private void delete(String filename, String basePath) {
    try {
      Path path = Path.of(basePath + "/" + filename);
      Files.deleteIfExists(path);
    } catch (Exception e) {
    }
  };

  public void deleteToUser(String filename) {
    try {
      String path = this.getUsersPath().toString();
      delete(filename, path);
    } catch (Exception e) {
    }
  };

  public void deleteToItem(String filename) {
    try {
      String path = this.getItemsPath().toString();
      delete(filename, path);
    } catch (Exception e) {
    }
  };
};