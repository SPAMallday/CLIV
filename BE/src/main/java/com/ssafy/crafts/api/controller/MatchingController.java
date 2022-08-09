package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.request.MatchingRequest;
import com.ssafy.crafts.api.response.MatchingResponse;
import com.ssafy.crafts.api.service.AuthService;
import com.ssafy.crafts.api.service.MatchingService;
import com.ssafy.crafts.common.util.JwtHeaderUtil;
import com.ssafy.crafts.db.entity.MBoard;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @FileName : MatchingController
 * @작성자 : 김민주
 * @Class 설명 : 매칭 관련 CRUD를 담당하는 Controller
 */
@Api(value = "매칭 관련 API", tags = {"MatchingController"}, description = "매칭 관련 컨트롤러")
@RestController
@Slf4j
@RequestMapping("/api/matching")
@RequiredArgsConstructor
public class MatchingController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MatchingService matchingService;
    private final AuthService authService;

    @PostMapping
    @ApiOperation(value = "새로운 매칭 요청 정보를 등록한다. DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "등록 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Object> createMatching(HttpServletRequest request,
                                                 @RequestPart(value = "matchingRequest") MatchingRequest matchingRequest){
        /**
         * @Method Name : createMatching
         * @작성자 : 김민주
         * @Method 설명 : 새로운 매칭 요청글 정보를 등록한다.
         */
        String token = JwtHeaderUtil.getAccessToken(request);
        matchingRequest.setAuthId(authService.getAuthId(token));

        matchingService.createMBoard(matchingRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/list/{teacherId}")
    @ApiOperation(value = "강사 id로 강사가 받은 매칭글 조회")
    public ResponseEntity<?> getMBoardListByTeacherId(@PathVariable String teacherId){
        /**
         * @Method Name : getMBoardListByTeacherId
         * @작성자 : 김민주
         * @Method 설명 : 강사 id로 매칭 요청글 리스트를 조회한다.
         */
        List<Integer> mboardIdList = matchingService.findMBoardIdListByTeacherId(teacherId);

        List<MatchingResponse> list = new ArrayList<>();

        for(Integer mboardId : mboardIdList){
            list.add(matchingService.findMBoardById(mboardId));
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/board/list/{authId}")
    @ApiOperation(value = "회원 id로 회원이 작성한 매칭글 조회")
    public  ResponseEntity<?> getMBoardListByAuthId(@PathVariable String authId){
        /**
         * @Method Name : getMBoardListByAuthId
         * @작성자 : 김민주
         * @Method 설명 : 회원 id로 매칭 요청글 리스트를 조회한다.
         */
        List<MatchingResponse> mBoardList = matchingService.findMBoardListByAuthId(authId);
        return new ResponseEntity<>(mBoardList, HttpStatus.OK);
    }

    @PostMapping("/agree/{mtId}")
    public ResponseEntity<String> agreeMatching(@PathVariable int mtId){
        /**
         * @Method Name : agreeMatching
         * @작성자 : 김민주
         * @Method 설명 : 수강생이 클래스 개설을 동의한다.
         */
        if(matchingService.getMBoardTeacherById(mtId) != null){
            matchingService.updateAgreeYnById(mtId);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

}
