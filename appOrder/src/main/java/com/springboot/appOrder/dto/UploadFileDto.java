package com.springboot.appOrder.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UploadFileDto {
  private MultipartFile file;
}
