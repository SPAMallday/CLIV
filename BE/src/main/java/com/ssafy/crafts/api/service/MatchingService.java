package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.request.MatchingRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import org.springframework.web.multipart.MultipartFile;

/**
 * @FileName : MatchingService
 * @작성자 : 김민주
 * @Class 설명 : 매칭기능 관련 비즈니스 처리 로직을 위한 인터페이스 설정
 */
public interface MatchingService {

    void createMBoard(MatchingRequest matchingRequest);

}
