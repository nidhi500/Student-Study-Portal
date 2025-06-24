package com.studentcompanion.repository;

import com.studentcompanion.model.CareerGoal;
import com.studentcompanion.model.CareerResource;
import com.studentcompanion.model.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerResourceRepository extends JpaRepository<CareerResource, Long> {
    List<CareerResource> findByGoalAndType(CareerGoal goal, ResourceType type);
    List<CareerResource> findByGoal(CareerGoal goal);
}
