package com.ssafy.crafts.api.response;

import io.swagger.annotations.ApiModelProperty;
import javassist.bytecode.stackmap.TypeData;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * @FileName : ReviewResponse
 * @작성자 : 김민주
 * @Class 설명 : 리뷰 조회 API 요청에 대한 리스폰스 바디 정의
 */
@Getter
@ToString
@Builder
public class ReviewResponse {
    private int id;             // 리뷰 id
    private int score;          // 별점
    private List<Integer> prList;   // 선택한 리뷰문구Id 리스트
    private String textRv;      // 텍스트 리뷰
    private int classId;        // 수업 id
    private String className;   // 강의명
    private String teacherId;   // 강사 id
    private String nickname;    // 강사 닉네임
    private int categoryId;     // 카테고리 id
    private String category;    // 카테고리명

}
