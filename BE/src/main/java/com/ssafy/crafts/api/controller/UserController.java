package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.service.AuthService;
import com.ssafy.crafts.api.service.UserService;
import com.ssafy.crafts.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @FileName : UserController
 * @작성자 : 허성은
 * @Class 설명 : 마이페이지 관련 기능을 담당하는 Controller
 */
@RestController
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    private final UserService userService;

    @PatchMapping("/change/role")
    public ResponseEntity<Object> changeRoleToTeacher(HttpServletRequest request) {
        /**
         * @Method Name : changeRoleToTeacher
         * @작성자 : 허성은
         * @Method 설명 : 선생님으로 RoleType을 변경한다.
         */
        Member member = authService.getMember();
        userService.changeRoleType(member.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
