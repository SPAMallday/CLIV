package com.ssafy.crafts.api.response;

import com.ssafy.crafts.db.entity.MBoard;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * @FileName : MatchingInfoResponse
 * @작성자 : 김민주
 * @Class 설명 : 매칭 정보 조회 API 요청에 대한 리스폰스 바디 정의
 */
@Getter
@ToString
@Builder
public class MatchingResponse {
    @ApiModelProperty(name = "categoryId", hidden = true)
    private int id;     // PK

    @ApiModelProperty(name = "title", example = "제목")
    private String title;   // 제목
    @ApiModelProperty(name = "wantedDay", example = "원하는 수업날짜")
    private String wantedDay;   // 원하는 수업 날짜
    @ApiModelProperty(name = "teacherGender", example = "원하는 강사성별")
    private String teacherGender;   // 강사성별
    @ApiModelProperty(name = "content", example = "내용")
    private String content;     // 내용
    @ApiModelProperty(name = "authId", example = "작성자 아이디")
    private String authId;      // 작성자 아이디
    @ApiModelProperty(name = "category", example = "카테고리")
    private String category;     // 카데고리 아이디
    @ApiModelProperty(name = "matStatus", example = "매칭 완료 여부")
    private boolean matStatus;     // 매칭 완료 여부

}
