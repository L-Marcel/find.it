package com.find.it.backend.repositories;

import java.util.Base64;
import java.util.UUID;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.nio.file.Path;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;

@Repository
public class PictureRepository {
  @Autowired
  private ResourceLoader resourceLoader;

  private Path getUsersPath() throws Exception {
    return resourceLoader.getResource("classpath:static/users").getFile().toPath().toAbsolutePath();
  };

  public String createUserPicture(UUID id, String data) {
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
      System.out.println("path: " + this.getUsersPath());
      File outputFile = new File(this.getUsersPath().toString() + "/" + id.toString() + "." + mine);
      ImageIO.write(image, "png", outputFile);
      return outputFile.getName();
    } catch (Exception e) {
      return "";
    }
  };
};