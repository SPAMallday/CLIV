package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.request.HashtagRequest;
import com.ssafy.crafts.api.request.PrivateClassRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.entity.PrivateClass;
import com.ssafy.crafts.db.repository.jpaRepo.ClassInfoRepository;
import com.ssafy.crafts.db.repository.jpaRepo.MBoardTeacherRepository;
import com.ssafy.crafts.db.repository.jpaRepo.PrivateClassRepository;
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
 * @FileName : ClassServiceImpl
 * @작성자 : 허성은
 * @Class 설명 : 수업 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@RequiredArgsConstructor
public class PrivateClassServiceImpl implements PrivateClassService{

    private final PrivateClassRepository privateClassRepository;
    private final MBoardTeacherRepository mBoardTeacherRepository;

    @Override
    public void createPrivateClass(PrivateClassRequest privateClassRequest, int mtId) {
        /**
         * @Method Name : createPrivateClass
         * @작성자 : 김민주
         * @Method 설명 : 1:1 수업 생성
         * */

        PrivateClass privateClass = PrivateClass.builder()
                        .className(privateClassRequest.getClassName())
                        .classDatetime(privateClassRequest.getClassDatetime())
                        .tuitionFee(privateClassRequest.getTuitionFee())
                        .mBoardTeacher(mBoardTeacherRepository.findById(mtId).get())
                        .build();
//        privateClassRepository.save(privateClassRequest.toEntity());
        privateClassRepository.save(privateClass);
    }
}
