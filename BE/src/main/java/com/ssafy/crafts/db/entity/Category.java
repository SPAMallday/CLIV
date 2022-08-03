package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Table(name = "TABLE")
@NoArgsConstructor
@DynamicInsert
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "category")
    private List<ClassInfo> classes = new ArrayList<>();

    public void addClass(ClassInfo classInfo) {
        this.classes.add(classInfo);
        if (classInfo.getCategory() != this) {
            classInfo.setCategory(this);
        }
    }
}
