package com.studentcompanion.repository;

import com.studentcompanion.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    List<Unit> findBySubjectId(Long subjectId);
}
