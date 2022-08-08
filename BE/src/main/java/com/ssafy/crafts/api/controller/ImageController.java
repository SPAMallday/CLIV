package com.ssafy.crafts.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * @FileName : ImageController
 * @작성자 : 허성은
 * @Class 설명 : 수업 설명의 이미지 저장 요청를 담당하는 Controller
 */
@Api(value = "이미지 저장 관련 API", tags = {"ImageController"}, description = "이미지 저장 컨트롤러")
@RestController
@Slf4j
@RequestMapping("/api/upload/image")
@RequiredArgsConstructor
public class ImageController {

}
