package com.ssafy.crafts.api.response;

import com.ssafy.crafts.db.entity.MBoardTeacher;
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
public class MBoardTeacherResponse {
    private int id;     // PK
    private MBoardTeacher.EnumYn agreeYn;   // 클래스 개설 수강생 동의 여부
    private String teacherId;      // 강사 아이디
    private int mboardId;     // 매칭보드 아이디
}
