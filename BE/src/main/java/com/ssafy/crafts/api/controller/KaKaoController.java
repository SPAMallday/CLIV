package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.response.LoginResponse;
import com.ssafy.crafts.api.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value = "/oauth/*")
public class KaKaoController {

    private final KakaoService kakaoService;

    /*
    * 카카오 로그인 시 인증 코드를 넘겨 받은 후 첫 로그인 시 회원가입
    */
    @GetMapping("/callback/kakao/{provider}")
    public ResponseEntity<LoginResponse> login(@PathVariable String provider, @RequestParam String code) {
        LoginResponse loginResponse = kakaoService.login(provider, code);
        return ResponseEntity.ok().body(loginResponse);
    }

}


