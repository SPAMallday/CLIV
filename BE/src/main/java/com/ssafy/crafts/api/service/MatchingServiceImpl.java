package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.MatchingRequest;
import com.ssafy.crafts.api.response.MatchingResponse;
import com.ssafy.crafts.db.entity.MBoard;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.jpaRepo.MatchingRepository;
import com.ssafy.crafts.db.repository.querydslRepo.CategoryQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.ClassInfoQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.HashtagQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.MemberQuerydslRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

/**
 * @FileName : MatchingServiceImpl
 * @작성자 : 김민주
 * @Class 설명 : 매칭기능 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService{

    private  final MatchingRepository matchingRepository;

    @Override
    public void createMBoard(MatchingRequest matchingRequest) {
        /**
         * @Method Name : createMBoard
         * @작성자 : 김민주
         * @Method 설명 : 매칭 요청글 생성
         */
        matchingRepository.save(matchingRequest.toEntity());
    }
}
