package com.ssafy.crafts.main;

import com.ssafy.crafts.db.entity.Member;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class KakaoMain {

    public static void main(String[] args) {
        // 엔티티 매니저 팩토리 생성
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.ssafy");
        // 엔티티 매니저 생성
        EntityManager em = emf.createEntityManager();
        // 트랜잭션 - 획득
        EntityTransaction tx = em.getTransaction();

        try {
            tx.begin(); // 트랜잭션 시작
            logic(em); // 비즈니스 로직 실행
            tx.commit(); // 트랜잭션 커밋
        } catch(Exception e){
            tx.rollback(); // 트랜잭션 롤백
        } finally {
            em.close(); // 엔티티 매니저 종료
        }
        emf.close(); // 엔티티 매니저 팩토리 종료
    }

    private static void logic(EntityManager em) {
        Member member = new Member();
//        member.setId(1L);
        member.setNickname("성은");
        member.setEmail("aysel0230@gmail.com");
        member.setProfileImage("이미지");
        em.persist(member);
    }
}
