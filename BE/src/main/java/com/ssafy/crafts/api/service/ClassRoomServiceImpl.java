package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.response.ClassRoomResponse;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.querydslRepo.ClassInfoQuerydslRepository;
import com.ssafy.crafts.db.repository.querydslRepo.MemberQuerydslRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @FileName : ClassRoomServiceImpl
 * @작성자 : 허성은
 * @Class 설명 : 화상 관련 비즈니스 처리 로직을 위한 서비스 구현 정의
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ClassRoomServiceImpl implements ClassRoomService{
    private final MemberQuerydslRepository memberQuerydslRepository;
    private final ClassInfoQuerydslRepository classInfoQuerydslRepository;
    @Value("${openvidu.url}")
    private String OPENVIDU_URL;
    @Value("${openvidu.secret}")
    private String SECRET;

    @Override
    public boolean checkValidation(String authId, int classId) {
        /**
         * @Method Name : checkValidation
         * @작성자 : 허성은
         * @Method 설명 : 수업 접근 권한을 확인한다.
         */
        ClassInfo classInfo = classInfoQuerydslRepository.findClassInfoById(classId);
        Member member = memberQuerydslRepository.findMemberByAuthId(authId).get();
        List<Member> members = classInfoQuerydslRepository.findClassMemberId(classId);
        if ((members != null && members.contains(member)) || classInfo.getTeacher().getId() == authId) {
            return true;
        }
        return false;
    }

    @Override
    public ClassRoomResponse createClassRoom(String authId, int classId) {
        /**
         * @Method Name : createClassRoom
         * @작성자 : 허성은
         * @Method 설명 : 수업 세션 생성을 위한 요청을 처리한다.
         */
        Member member = memberQuerydslRepository.findMemberByAuthId(authId).get();
        String sessionId = classInfoQuerydslRepository.findClassInfoById(classId).getSessionId();
        // 처음 세션 요청이 들어온거면 세션 생성
        if(sessionId == null){
            // session 생성 후 id 받기
            sessionId = createSession();
            // 생성한 sessionId class 정보에 추가하기
            classInfoQuerydslRepository.insertSessionId(sessionId, classId);
        }
        // 토큰 생성
        ClassRoomResponse classRoomResponse = getToken(sessionId,
                classInfoQuerydslRepository.findClassInfoById(classId).getTeacher().getId());
        return classRoomResponse;
    }

    @Override
    public String createSession() {
        /**
         * @Method Name : createSession
         * @작성자 : 허성은
         * @Method 설명 : 세션을 생성하고, 해당 세션 ID를 반환한다.
         */
        String targetUrl = OPENVIDU_URL + "/openvidu/api/sessions";
        String sessionId = makeSessionId();

        Map<String, String> httpBody = new HashMap<>();
        httpBody.put("customSessionId", sessionId);
        httpBody.put("recordingMode", "MANUAL");

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/json");
        httpHeaders.add("Authorization", "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU");

        HttpEntity<Map<String, String>> openviduSessionReq = new HttpEntity<>(httpBody, httpHeaders);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<HashMap> result = restTemplate.exchange(targetUrl, HttpMethod.POST, openviduSessionReq, HashMap.class);

        return result.getBody().get("customSessionId").toString();
    }

    @Override
    public ClassRoomResponse getToken(String sessionId, String teacherId) {
        /**
         * @Method Name : getToken
         * @작성자 : 허성은
         * @Method 설명 : openvidu 서버에 토큰을 요청해서 받아온다.
         */
        String targetUrl = OPENVIDU_URL + "/openvidu/api/sessions/" + sessionId + "/connection";

        Map<String, String> httpBody = new HashMap<>();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/json");
        httpHeaders.add("Authorization", "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU");

        HttpEntity<Map<String, String>> openviduTokenReq = new HttpEntity<>(httpBody, httpHeaders);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<HashMap> result = restTemplate.exchange(targetUrl, HttpMethod.POST, openviduTokenReq, HashMap.class);

        return ClassRoomResponse.builder()
                .token(result.getBody().get("token").toString())
                .hostId(teacherId)
                .build();
    }

    private String makeSessionId() {
        /**
         * @Method Name : makeSessionId
         * @작성자 : 허성은
         * @Method 설명 : 커스텀 session id 생성
         */
        String sessionId = "id";
        for(int i = 0; i < 8; i++) sessionId = sessionId + String.valueOf(new Random().nextInt(9) + 1);
        return sessionId;
    }
}