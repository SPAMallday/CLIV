package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Table(name = "TABLE")
@NoArgsConstructor
@DynamicInsert
@Entity
public class ClassInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private int id;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "classInfo")
    private List<QnA> qnaList = new ArrayList<>();
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "classInfo")
    private List<Tagging> tagList = new ArrayList<>();

    @OneToMany
    private Category category;
    private Auth teacher;
    private List<Member> members = new ArrayList<Member>();
    private String className;
    @Column(name = "class_datetime", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp classDatetime;
    private int durationH;
    private int headcount;
    private int price;
    private String guide;
    private String content;
    private String classImg;
    private ClassStatus classStatus;

    public void setTagList(List<Tagging> tagList) {
        this.tagList = tagList;
    }

    public void setQnaList(List<QnA> qnaList) {
        this.qnaList = qnaList;
    }

    public static enum ClassStatus {
        EXPECTED,
        LIVE,
        ENDED
    }
}