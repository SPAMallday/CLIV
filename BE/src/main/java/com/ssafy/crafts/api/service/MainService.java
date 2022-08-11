package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.controller.ClassController;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.api.response.MainResponse;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.querydslRepo.ClassInfoQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.MemberQuerydslRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * @FileName : MainService
 * @작성자 : 허성은
 * @Class 설명 : 수업 리스트 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MainService {

    private final ClassInfoQuerydslRepository classInfoQuerydslRepository;
    private final MemberQuerydslRepository memberQuerydslRepository;

    public MainResponse findAllClassList(String authId) {
        /**
         * @Method Name : findAllClassList
         * @작성자 : 허성은
         * @Method 설명 : 메인 화면 진입시 모든 수업 리스트를 보여줌
         */
        List<ClassInfoResponse> madeCL = findMadeClassList(authId);
        List<ClassInfoResponse> appliedCL = findAppliedClassList(authId);
//        List<ClassInfoResponse> categoryCL = findClassListByCategory(categoryId);
        List<ClassInfoResponse> classTimeCL = findClassListByClassTime();
        List<ClassInfoResponse> headcountCL = findClassListByHeadcount();
        List<ClassInfoResponse> allCL = findClassListAll();
        return MainResponse.builder()
                .madeCL(madeCL != null ? madeCL : Collections.emptyList())
                .appliedCL(appliedCL != null ? appliedCL : Collections.emptyList())
//                .categoryCL(categoryCL != null ? categoryCL : Collections.emptyList())
                .classTimeCL(classTimeCL != null ? classTimeCL : Collections.emptyList())
                .headcountCL(headcountCL != null ? headcountCL : Collections.emptyList())
                .all(allCL != null ? allCL : Collections.emptyList())
                .build();
    }

    public List<ClassInfoResponse> findClassListAll() {
        return classInfoQuerydslRepository.findClassInfoAll();
    }
    public List<ClassInfoResponse> findMadeClassList(String authId) {
        return classInfoQuerydslRepository.findClassInfoByTeacherId(authId);
    }

    public List<ClassInfoResponse> findAppliedClassList(String authId) {
        return classInfoQuerydslRepository.findClassInfoByMemberId(authId);
    }

    public List<ClassInfoResponse> findClassListByCategory(int categoryId) {
        return classInfoQuerydslRepository.findClassInfoByCategory(categoryId);
    }

    public List<ClassInfoResponse> findClassListByClassTime() {
        return classInfoQuerydslRepository.findClassInfoByClassTime();
    }

    public List<ClassInfoResponse> findClassListByHeadcount() {
        return classInfoQuerydslRepository.findClassInfoByHeadcount();
    }
}
