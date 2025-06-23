package com.studentcompanion.repository;

import com.studentcompanion.model.CareerGoal;
import com.studentcompanion.model.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    @Query("SELECT q FROM QuizQuestion q WHERE q.goal = :goal ORDER BY function('RANDOM')")
    List<QuizQuestion> findRandomQuestionsByGoal(@Param("goal") CareerGoal goal);
}
