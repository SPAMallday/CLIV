package com.ssafy.crafts.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@NoArgsConstructor
@DynamicInsert
@Table(name = "MBOARD")
public class MBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mboard_id")
    private int id;     // PK

    @Column(nullable = false, length = 50)
    private String title;   // 제목

    @Column(name = "wanted_day", nullable = false, length = 50)
    private String wantedDay;       // 원하는 수업 날짜

    @Column(name = "teacher_gender", nullable = false, length = 1)
    private String teacherGender;   // 강사 성별

    @Column(nullable = false, length = 500)
    private String content;     // 내용

    @Column(name = "regdate", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regDate;  // 작성 시간

    @Column(columnDefinition = "TINYINT", nullable = false, length = 1)
    private int matStatus;      // 매칭 완료 여부

    // 1:1 관계 : 매칭보드 - 매칭_선생님
    @OneToOne(mappedBy="mBoard")
    private MBoardTeacher mBoardTeacher;

    // 1:1 관계 : 매칭보드 - 카테고리
    @OneToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // N:1 관계 : 매칭보드 - 회원
    @ManyToOne
    @JoinColumn(name = "auth_id")
    private Member member;

    @Builder
    public MBoard(int id, String title, String wantedDay, String teacherGender, String content, Timestamp regDate, int matStatus, MBoardTeacher mBoardTeacher, Category category, Member member) {
        this.id = id;
        this.title = title;
        this.wantedDay = wantedDay;
        this.teacherGender = teacherGender;
        this.content = content;
        this.regDate = regDate;
        this.matStatus = matStatus;
        this.mBoardTeacher = mBoardTeacher;
        this.category = category;
        this.member = member;
    }

    public void updateMBoard(String title, String content, String wantedDay){
        this.title = title;
        this.content = content;
        this.wantedDay = wantedDay;
    }
}