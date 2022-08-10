package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.api.service.AuthService;
import com.ssafy.crafts.api.service.ClassService;
import com.ssafy.crafts.common.util.JwtHeaderUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * @FileName : ChatRoomController
 * @작성자 : 김민주
 * @Class 설명 : 채팅 관련 CRUD를 담당하는 Controller
 */
@Api(value = "채팅 관련 API", tags = {"ChatRoomController"}, description = "채팅 관련 컨트롤러")
@RestController
@Slf4j
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

}
