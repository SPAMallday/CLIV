package com.ssafy.crafts.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAuth is a Querydsl query type for Auth
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAuth extends EntityPathBase<Auth> {

    private static final long serialVersionUID = 235790775L;

    public static final QAuth auth = new QAuth("auth");

    public final StringPath authId = createString("authId");

    public final StringPath email = createString("email");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final DateTimePath<java.sql.Timestamp> regDate = createDateTime("regDate", java.sql.Timestamp.class);

    public QAuth(String variable) {
        super(Auth.class, forVariable(variable));
    }

    public QAuth(Path<? extends Auth> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAuth(PathMetadata metadata) {
        super(Auth.class, metadata);
    }

}

