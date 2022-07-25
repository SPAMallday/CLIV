package com.ssafy.crafts.kakaoLogin.controller;

import com.ssafy.crafts.kakaoLogin.entity.Member;
import com.ssafy.crafts.kakaoLogin.service.KakaoAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@Controller
@RequestMapping(value = "/oauth/*")
public class MemberController {

    @Autowired
    private KakaoAPI kakao;

    @RequestMapping(value = "/callback/kakao")
    public String kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session) {
        System.out.println("###code#### : " + code);

        String accessToken = kakao.getAccessToken(code);
        Member userInfo = kakao.getUserInfo(accessToken);
        System.out.println("###access_Token#### : " + accessToken);
        System.out.println("login Controller : " + userInfo);
        System.out.println("###nickname#### : " + userInfo.getNickname());
        System.out.println("###email#### : " + userInfo.getEmail());

        // 클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        // 일단 간단하게 session에 등록 -> 추후 변경
        if (userInfo.getEmail() != null) {
            session.setAttribute("userId", userInfo.getEmail());
            session.setAttribute("access_Token", accessToken);
        }

        return "index";     // 아무 페이지로 대체해도 무방. 중요한건 인증코드가 잘 출력 되는지 확인하는 것.
    }

    @RequestMapping(value="/logout")
    public String kakaoLogout(HttpSession session) {
        kakao.kakaoLogout((String)session.getAttribute("access_Token"));
        session.removeAttribute("access_Token");
        session.removeAttribute("userId");
        return "index";
    }

}


