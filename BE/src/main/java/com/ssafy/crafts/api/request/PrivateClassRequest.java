package com.ssafy.crafts.api.request;

import com.ssafy.crafts.db.entity.PrivateClass;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @FileName : PrivateClassRequest
 * @작성자 : 김민주
 * @Class 설명 : 1:1수업 관련 API 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("PrivateClassRequest")
@Builder
public class PrivateClassRequest {
    @ApiModelProperty(name = "teacherId", hidden = true)
    String teacherId;       // 매칭강사 id
    @ApiModelProperty(name = "className", example = "수업 제목")
    String className;       // 수업명
    @ApiModelProperty(name = "classDatetime", example = "수업 날짜")
    String classDatetime;    // 수업일
    @ApiModelProperty(name = "tuition_fee", example = "수강료")
    int tuitionFee;         // 수강료

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public PrivateClass toEntity(){
        return PrivateClass.builder()
                .className(className)
                .classDatetime(classDatetime)
                .tuitionFee(tuitionFee)
                .build();
    }
}
