package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.request.PrivateClassRequest;
import com.ssafy.crafts.api.service.AuthService;
import com.ssafy.crafts.api.service.MatchingService;
import com.ssafy.crafts.api.service.PrivateClassService;
import com.ssafy.crafts.common.util.JwtHeaderUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @FileName : PrivateClassController
 * @작성자 : 김민주
 * @Class 설명 : 1:1 수업 관련 CRUD를 담당하는 Controller
 */
@Api(value = "1:1수업 관련 API", tags = {"MatchingController"}, description = "매칭 관련 컨트롤러")
@RestController
@Slf4j
@RequestMapping("/api/privateclass/")
@RequiredArgsConstructor
public class PrivateClassController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MatchingService matchingService;
    private final AuthService authService;
    private final PrivateClassService privateClassService;

    @PostMapping
    @ApiOperation(value = "새로운 1:1 수업정보를 등록한다. DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "등록 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Object> createPrivateClass(HttpServletRequest request,
                                                 @RequestPart(value = "privateClassRequest") PrivateClassRequest privateClassRequest){
        /**
         * @Method Name : createPrivateClass
         * @작성자 : 김민주
         * @Method 설명 : 1:1 수업 정보를 등록한다.
         */
        String token = JwtHeaderUtil.getAccessToken(request);
        privateClassRequest.setTeacherId(authService.getAuthId(token));

        privateClassService.createPrivateClass(privateClassRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
