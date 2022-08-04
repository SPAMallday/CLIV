package com.ssafy.crafts.api.request;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

/**
 * @FileName : ClassInfoRequest
 * @작성자 : 허성은
 * @Class 설명 : 수업 관련 API 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ClassInfoRequest {

    String teacherId;
    int categoryId;
    List<HashtagRequest> taggingRequest;
    String className;
    int durationH;
    int headcount;
    int price;
    String content;
    String classImgUrl;
    int level;
    Timestamp classDatetime;

    public void setClassImgUrl(String classImgUrl) {
        this.classImgUrl = classImgUrl;
    }
}
