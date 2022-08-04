package com.ssafy.crafts.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * @FileName : ClassInfoResponse
 * @작성자 : 허성은
 * @Class 설명 : 수업 정보 조회 API 요청에 대한 리스폰스 바디 정의
 */
@Getter
@ToString
@Builder
public class ClassInfoResponse {
    int classId;
    String teacherId;
    String className;
    int durationH;
    int memberCnt;
    int price;
    String content;
    String classImgUrl;
    int level;
}
