package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.request.MatchingRequest;
import com.ssafy.crafts.api.request.ReviewRequest;
import com.ssafy.crafts.api.response.MBoardTeacherResponse;
import com.ssafy.crafts.api.response.MatchingResponse;
import com.ssafy.crafts.api.service.AuthService;
import com.ssafy.crafts.api.service.MatchingService;
import com.ssafy.crafts.api.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @FileName : ReviewController
 * @작성자 : 김민주
 * @Class 설명 : 리뷰 관련 CRUD를 담당하는 Controller
 */
@Api(value = "리뷰 관련 API", tags = {"ReviewController"}, description = "리뷰 관련 컨트롤러")
@RestController
@Slf4j
@Transactional
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MatchingService matchingService;
    private final AuthService authService;
    private final ReviewService reviewService;

    @PostMapping
    @ApiOperation(value = "새로운 리뷰 정보를 등록한다.", response = String.class)
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "등록 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Object> createReview(HttpServletRequest request,
                                                 @RequestBody ReviewRequest reviewRequest){
        /**
         * @Method Name : createReview
         * @작성자 : 김민주
         * @Method 설명 : 새로운 리뷰 정보를 등록한다.
         */
        log.info("리뷰 정보 등록 시작");
        log.info("토큰 얻어오기");
        //String token = JwtHeaderUtil.getAccessToken(request);
        log.info("토큰에서 아이디 정보 얻어 회원 아이디로 할당");
        //atchingRequest.setAuthId(authService.getAuthId(token));
        reviewRequest.setAuthId("1");     // test용

        log.info("수업에 대해 작성한 리뷰가 있는지 판단");
        if(reviewService.findByAuthIdAndClassId(reviewRequest.getAuthId(), reviewRequest.getClassId()) == null){

            log.info("리뷰 정보 등록");
            reviewService.createReview(reviewRequest);

            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);

    }

}
