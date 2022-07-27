package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.request.AuthRequest;
import com.ssafy.crafts.api.response.AuthResponse;
import com.ssafy.crafts.api.service.KakaoAuthService;
import com.ssafy.crafts.common.model.ApiResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*
* 카카오 로그인 요청 API
*/
@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final KakaoAuthService kakaoService;
    @ApiOperation(value = "카카오 로그인", notes = "카카오 엑세스 토큰을 이용하여 사용자 정보 받아 저장하고 앱의 토큰 전환")
    @PostMapping(value = "/kakao-login")
    public ResponseEntity<AuthResponse> kakaoAuthRequest(@RequestBody AuthRequest authRequest) {
        log.info("로그인 요청");
        return ApiResponse.success(kakaoService.login(authRequest));
    }
}
