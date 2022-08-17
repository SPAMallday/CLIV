package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.ClassInfoRequest;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.List;

/**
 * @FileName : ClassService
 * @작성자 : 허성은
 * @Class 설명 : 수업 관련 비즈니스 처리 로직을 위한 인터페이스 설정
 */
public interface ClassService {

    void insertClassInfo(ClassInfoRequest classInfoRequest, MultipartFile thumbnail) throws ParseException;

    ClassInfoResponse findClassInfoById(int id);

    void joinClassByMemberId(int id, String memberId);

    List<ClassInfoResponse> findClassListByRegdate();

}