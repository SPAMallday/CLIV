//
//package com.ssafy.crafts.api.service;
//
//import com.ssafy.crafts.api.request.MatchingRequest;
//import com.ssafy.crafts.api.response.MatchingResponse;
//import com.ssafy.crafts.db.entity.MBoard;
//import com.ssafy.crafts.db.repository.jpaRepo.MatchingRepository;
//import com.ssafy.crafts.db.repository.querydslRepo.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * @FileName : MatchingServiceImpl
// * @작성자 : 김민주
// * @Class 설명 : 매칭기능 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
// */
//@Service
//@RequiredArgsConstructor
//public class MatchingServiceImpl implements MatchingService{
//
//    private final MatchingRepository matchingRepository;
//    private final MatchingQuerydslRepository matchingQuerydslRepository;
//
//    @Override
//    public void createMBoard(MatchingRequest matchingRequest) {
//        /**
//         * @Method Name : createMBoard
//         * @작성자 : 김민주
//         * @Method 설명 : 매칭 요청글 생성
//         */
//        matchingRepository.save(matchingRequest.toEntity());
//    }
//
//    @Override
//    public List<Integer> findMBoardIdListByTeacherId(String teacherId) {
//        /**
//         * @Method Name : findMBoardIdByTeacherId
//         * @작성자 : 김민주
//         * @Method 설명 : 강사 id로 강사가 받은 매칭 요청글 id 리스트 조회
//        */
//        List<Integer> mBoardIdList = new ArrayList<>();
//
//        return mBoardIdList;
//    }
//
//    @Override
//    public void findMBoardById(int id) {
//        /**
//         * @Method Name : findMBoardById
//         * @작성자 : 김민주
//         * @Method 설명 : 매칭 요청글 id로 매칭 요청글 조회
//         */
//        MBoard mBoard = matchingRepository.findById(id);
//
//    }
//
//    @Override
//    public List<MatchingResponse> findMBoardListByAuthId(String authId) {
//        /**
//         * @Method Name : findMBoardListByAuthId
//         * @작성자 : 김민주
//         * @Method 설명 : 회원 id로 매칭 요청글 리스트 조회
//         */
//        List<Integer> mBoardList = new ArrayList<>();
//        List<MatchingResponse> list = new ArrayList<>();
//
////        for(MBoard mBoard : mBoardList){
////            list.add(MatchingResponse.builder()
////                        .id(mBoard.getId())
////                        .title(mBoard.getTitle())
////                        .wantedDay(mBoard.getWantedDay())
////                        .teacherGender(mBoard.getTeacherGender())
////                        .content(mBoard.getContent())
////                        .authId(mBoard.getMember().getId())
////                        .categoryId(mBoard.getCategory().getId())
////                        .matStatus(mBoard.getMatStatus())
////                        .build());
////        }
//        return list;
//    }
//
//}