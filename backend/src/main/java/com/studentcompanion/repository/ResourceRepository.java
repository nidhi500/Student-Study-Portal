package com.studentcompanion.repository;

import com.studentcompanion.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByUnitId(Long unitId);
}
