package com.ssafy.crafts.api.response;

import com.ssafy.crafts.db.entity.Member;
import lombok.*;

import java.util.List;

/**
 * @FileName : ClassInfoResponse
 * @작성자 : 허성은
 * @Class 설명 : 수업 정보 조회 API 요청에 대한 리스폰스 바디 정의
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassInfoResponse {
    int classId;
    String teacherId;
    List<Member> members;
    int categoryId;
    String className;
    int price;
    int headcount;
    String classDatetime;
    String content;
    String classImg;
    String classStatus;
    int level;
}
