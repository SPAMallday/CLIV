package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.MatchingRequest;
import com.ssafy.crafts.api.request.ReviewRequest;
import com.ssafy.crafts.api.response.MBoardTeacherResponse;
import com.ssafy.crafts.api.response.MatchingResponse;
import com.ssafy.crafts.api.response.ReviewResponse;
import com.ssafy.crafts.db.entity.MBoard;
import com.ssafy.crafts.db.entity.MBoardTeacher;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.entity.Review;
import com.ssafy.crafts.db.repository.jpaRepo.*;
import com.ssafy.crafts.db.repository.querydslRepo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @FileName : ReviewServiceImpl
 * @작성자 : 김민주
 * @Class 설명 : 리뷰기능 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final MatchingRepository matchingRepository;
    private final MemberRepository memberRepository;
    private final MBoardRepository mBoardRepository;
    private final ReviewRepository reviewRepository;
    private final MatchingQuerydslRepository matchingQuerydslRepository;
    private final MBoardTeacherQuerydslRepository mBoardTeacherQuerydslRepository;
    private final MBoardTeacherRepository mBoardTeacherRepository;
    private final MemberQuerydslRepository memberQuerydslRepository;
    private final CategoryQuerydslRepository categoryQuerydslRepository;
    private final ClassInfoRepository classInfoRepository;
    private final ReviewResponse reviewResponse;
    private final ReviewQuerydslRepository reviewQuerydslRepository;


    @Override
    public void createReview(ReviewRequest reviewRequest) {
        /**
         * @Method Name : createReview
         * @작성자 : 김민주
         * @Method 설명 : 리뷰 생성
         */

        Review review = Review.builder()
                .score(reviewRequest.getScore())
                .textRv(reviewRequest.getTextRv())
                .prList(reviewRequest.getPrList())
                .classInfo(classInfoRepository.findById(reviewRequest.getClassId()).get())
                .member(memberQuerydslRepository.findMemberByAuthId(reviewRequest.getAuthId()).get())
                .build();

        reviewRepository.save(review);
    }

    @Override
    public Review findByAuthIdAndClassId(String authId, int classId) {
        return reviewQuerydslRepository.findByAuthIdAndClassId(authId, classId);
    }

}
