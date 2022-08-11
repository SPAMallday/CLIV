package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.querydslRepo.CategoryQuerydslRepository;
import com.ssafy.crafts.db.repository.jpaRepo.ClassInfoRepository;
import com.ssafy.crafts.db.repository.querydslRepo.ClassInfoQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.HashtagQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.MemberQuerydslRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

/**
 * @FileName : ClassServiceImpl
 * @작성자 : 허성은
 * @Class 설명 : 수업 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService{
    static SimpleDateFormat timeStampFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    static SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy. MM. dd. a hh:mm:ss", Locale.KOREA);

    private final ClassInfoRepository classInfoRepository;
    private final ClassInfoQuerydslRepository classInfoQuerydslRepository;
    private final FileUploadService fileUploadService;
    private final MemberQuerydslRepository memberQuerydslRepository;
    private final CategoryQuerydslRepository categoryQuerydslRepository;
    private final HashtagQuerydslRepository hashtagQuerydslRepository;

    @Override
    public void insertClassInfo(ClassInfoRequest classInfoRequest, MultipartFile thumbnail) throws ParseException {
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
        log.info("수업 생성 서비스");
        // String -> Date
        Date classDate = inputFormat.parse(classInfoRequest.getClassDatetime());
        classInfoRequest.setClassImgUrl(thumbnailUrl);

        ClassInfo classInfo = ClassInfo.builder()
                .teacher(memberQuerydslRepository.findMemberByAuthId(classInfoRequest.getTeacherId()).get())
                .category(categoryQuerydslRepository.findCategoryById(classInfoRequest.getCategoryId()))
                .classDatetime(Timestamp.valueOf(timeStampFormat.format(classDate)))
                .className(classInfoRequest.getClassName())
                .headcount(classInfoRequest.getHeadcount())
                .price(classInfoRequest.getPrice())
                .content(classInfoRequest.getContent())
                .classImg(classInfoRequest.getClassImgUrl())
                .level(classInfoRequest.getLevel())
                .classStatus(ClassInfo.ClassStatus.EXPECTED)
                .build();

//        List<HashtagRequest> taggingList = classInfoRequest.getTaggingRequest();
//
//        for(int i = 0; i < taggingList.size(); i++){
//            classInfo.addTagging(hashtagQuerydslRepository.findHashtagById(taggingList.get(i).getHashtagId()).get());
//        }

        classInfoRepository.save(classInfo);
    }

    @Override
    public ClassInfoResponse findClassInfoById(int id) {
        /**
         * @Method Name : findClassInfoById
         * @작성자 : 허성은
         * @Method 설명 : 수업 아이디로 수업 찾기
         */
        ClassInfo classInfo = Optional.ofNullable(classInfoQuerydslRepository.findClassInfoById(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "수업 정보가 존재하지 않습니다."));

        return ClassInfoResponse.builder()
                .classId(classInfo.getId())
                .teacherId(classInfo.getTeacher().getId())
                .members(classInfo.getMembers())
                .categoryId(classInfo.getCategory().getId())
                .className(classInfo.getClassName())
                .price(classInfo.getPrice())
                .headcount(classInfo.getHeadcount())
                .classDatetime(classInfo.getClassDatetime())
                .content(classInfo.getContent())
                .classImg(classInfo.getClassImg())
                .classStatus(classInfo.getClassStatus().toString())
                .level(classInfo.getLevel())
                .regdate(classInfo.getRegdate())
                .build();
    }

    @Override
    public void joinClassByMemberId(int id, String memberId) {
        /**
         * @Method Name : joinClassByMemberId
         * @작성자 : 허성은
         * @Method 설명 : 수업 참여하기
         */
        ClassInfo classInfo = Optional.ofNullable(classInfoQuerydslRepository.findClassInfoById(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "수업 정보가 존재하지 않습니다."));
        Optional<Member> member = memberQuerydslRepository.findMemberByAuthId(memberId);
        if(!member.isPresent())
            new ResponseStatusException(HttpStatus.NOT_FOUND, "회원 정보가 존재하지 않습니다.");
        // 인원수 다 찼으면 거절
        if(classInfo.getHeadcount() <= classInfo.getMembers().size())
            new ResponseStatusException(HttpStatus.FORBIDDEN, "해당 수업은 신청 인원이 마감되었습니다.");
        // 선생님과 동일한 아이디면 거절
        if(classInfo.getTeacher().getId() == memberId)
            new ResponseStatusException(HttpStatus.FORBIDDEN, "본인이 개설한 수업을 신청할 수 없습니다.");

        classInfo.addMember(member.get());
    }
}
