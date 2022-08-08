package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.Category;
import com.ssafy.crafts.db.entity.QCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CategoryQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QCategory qCategory = QCategory.category;

    public Optional<Category> findCategoryById(int id) {
        Category category = jpaQueryFactory.select(qCategory).from(qCategory)
                .where(qCategory.id.eq(id)).fetchOne();
        return Optional.ofNullable(category);
    }
}
