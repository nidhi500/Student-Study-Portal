package com.studentcompanion.repository;

import com.studentcompanion.model.Pyq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PyqRepository extends JpaRepository<Pyq, Long> {
    List<Pyq> findByUnitId(Long unitId);
}
