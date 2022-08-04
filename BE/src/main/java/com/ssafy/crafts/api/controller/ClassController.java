package com.ssafy.crafts.api.controller;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.api.service.AuthService;
import com.ssafy.crafts.api.service.ClassService;
import com.ssafy.crafts.common.util.AuthToken;
import com.ssafy.crafts.common.util.JwtHeaderUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;

/**
 * @FileName : ClassController
 * @작성자 : 허성은
 * @Class 설명 : 수업 관련 CRUD를 담당하는 Controller
 */
@Api(value = "수업 관련 API", tags = {"ClassController"}, description = "수업 관련 컨트롤러")
@RestController
@Slf4j
@RequestMapping("/class")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;
    private final AuthToken authToken;
    private final AuthService authService;

    @PostMapping(
            value="/",
            consumes = { MediaType.MULTIPART_FORM_DATA_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ApiOperation(value = "공연 정보 등록", notes = "새로운 공연 정보를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "등록 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Object> insertClassInfo(HttpServletRequest request,
                                                  @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
                                                  @RequestPart(value = "classInfoRequest") ClassInfoRequest classInfoRequest
    ) {
        /**
         * @Method Name : insertClassInfo
         * @작성자 : 허성은
         * @Method 설명 : 새로운 수업 정보를 등록한다.
         */
        String token = JwtHeaderUtil.getAccessToken(request);
        classInfoRequest.setTeacherId(authService.getAuthId(token));
        classService.insertClassInfo(classInfoRequest, thumbnail);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{classId}")
    @ApiOperation(value = "수업 정보 단일 조회", notes = "수업 id로 해당 수업을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 204, message = "조회할 데이터가 없음"),
            @ApiResponse(code = 500, message = "서버 에러 발생")
    })
    public ResponseEntity<ClassInfoResponse> findClassInfoByClassId(
            @PathVariable @ApiParam(value = "조회할 수업 정보의 id", required = true) int classId){
        /**
         * @Method Name : findClassInfoByClassId
         * @작성자 : 허성은
         * @Method 설명 : 수업 id로 수업 정보를 조회한다.
         */
        ClassInfoResponse classInfoResponse = classService.findClassInfoById(classId);
        if(classInfoResponse == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(classInfoResponse, HttpStatus.OK);
    }
}