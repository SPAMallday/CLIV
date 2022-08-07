package com.ssafy.crafts.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

/**
 * @FileName : MatchingInfoRequest
 * @작성자 : 김민주
 * @Class 설명 : 매칭기능 관련 API 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("MatchingInfoRequest")
@Builder
public class MatchingInfoRequest {

}
