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
@Table(name = "MBoard")
public class MBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mboard_id")
    private int id;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(name = "wanted_day", nullable = false, length = 50)
    private String wantedDay;

    @Column(name = "teacher_gender", nullable = false, length = 1)
    private String teacherGender;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(name = "regdate", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regDate;

    @Column(columnDefinition = "TINYINT", nullable = false, length = 1)
    private int matStatus;      // 매칭 완료 여부

//    @Column(name = "auth_id", nullable = false, length = 13)
//    private String authId;

    @OneToOne(mappedBy="MBoard")
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
}