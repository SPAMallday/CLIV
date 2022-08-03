package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name = "REVIEW")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int id;

    @Column(nullable = false)
    private int score;

    @Column(name = "text_review", length = 500)
    private String textRv;

    @Column(name = "regdate",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regdate;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassInfo classInfo;

    @ManyToOne
    @JoinColumn(name = "auth_id")
    private Member member;

    @ManyToMany
    @JoinTable(name = "SELECTED_PHRASE",
            joinColumns = @JoinColumn(name = "review_id"),
            inverseJoinColumns = @JoinColumn(name = "pr_id"))
    private List<PhraseReview> prList = new ArrayList<>();

    public ClassInfo getClassInfo() {
        return classInfo;
    }

    public void setClassInfo(ClassInfo classInfo) {
        this.classInfo = classInfo;
    }
}