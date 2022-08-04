package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name = "QnA")
public class QnA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private int id;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(name = "regdate",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regdate;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassInfo classInfo;

    public ClassInfo getClassInfo() {
        return classInfo;
    }

    public void setClassInfo(ClassInfo classInfo) {
        this.classInfo = classInfo;
    }
}