package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.Id;

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

    @Column(name = "auth_id", nullable = false, length = 13)
    private String authId;

    @OneToOne(mappedBy="MBoard")
    @PrimaryKeyJoinColumn
    private MBoardTeacher mBoardTeacher;

    @OneToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "auth_id")
    private Member member;

}