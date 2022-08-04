package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.request.HashtagRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.repository.querydslRepo.CategoryQuerydslRepository;
import com.ssafy.crafts.db.repository.jpaRepo.ClassInfoRepository;
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
public class ClassServiceImpl implements ClassService{

    private final ClassInfoRepository classInfoRepository;
    private final ClassInfoQuerydslRepository classInfoQuerydslRepository;
    private final FileUploadService fileUploadService;
    private final MemberQuerydslRepository memberQuerydslRepository;
    private final CategoryQuerydslRepository categoryQuerydslRepository;
    private final HashtagQuerydslRepository hashtagQuerydslRepository;

    @Override
    public void insertClassInfo(ClassInfoRequest classInfoRequest, MultipartFile thumbnail) {
        /**
         * @Method Name : insertClassInfo
         * @작성자 : 허성은
         * @Method 설명 : 수업 생성
         */
        String thumbnailUrl = null;
        try {
            /* S3에 업로드 */
            thumbnailUrl = fileUploadService.upload(thumbnail);
        } catch(Exception e) {
            e.printStackTrace();
        }
        classInfoRequest.setClassImgUrl(thumbnailUrl);

        ClassInfo classInfo = ClassInfo.builder()
                .teacher(memberQuerydslRepository.findMemberByAuthId(classInfoRequest.getTeacherId()).get())
                .category(categoryQuerydslRepository.findCategoryById(classInfoRequest.getCategoryId()).get())
                .className(classInfoRequest.getClassName())
                .durationH(classInfoRequest.getDurationH())
                .headcount(classInfoRequest.getHeadcount())
                .price(classInfoRequest.getPrice())
                .content(classInfoRequest.getContent())
                .classImg(classInfoRequest.getClassImgUrl())
                .level(classInfoRequest.getLevel())
                .build();

        List<HashtagRequest> taggingList = classInfoRequest.getTaggingRequest();

        for(int i = 0; i < taggingList.size(); i++){
            classInfo.addTagging(hashtagQuerydslRepository.findHashtagById(taggingList.get(i).getHashtagId()).get());
        }

        classInfoRepository.save(classInfo);
    }

    @Override
    public ClassInfoResponse findClassInfoById(int id) {
        /**
         * @Method Name : findClassInfoById
         * @작성자 : 허성은
         * @Method 설명 : 수업 아이디로 수업 찾기
         */
        ClassInfo classInfo = Optional.ofNullable(classInfoQuerydslRepository.findClassInfoById(id).get())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "수업 정보가 존재하지 않습니다."));

        return ClassInfoResponse.builder()
                .classId(classInfo.getId())
                .teacherId(classInfo.getTeacher().getId())
                .className(classInfo.getClassName())
                .durationH(classInfo.getDurationH())
                .memberCnt(classInfo.getMembers().size())
                .price(classInfo.getPrice())
                .content(classInfo.getContent())
                .classImgUrl(classInfo.getClassImg())
                .level(classInfo.getLevel())
                .build();
    }
}
