package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name = "PHRASE_REVIEW")
public class PhraseReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pr_id")
    private int id;

    @Column(nullable = false, length = 20)
    private String content;
}
