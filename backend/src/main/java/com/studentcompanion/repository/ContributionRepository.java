package com.studentcompanion.repository;

import com.studentcompanion.model.Contribution;
import com.studentcompanion.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContributionRepository extends JpaRepository<Contribution, Long> {
List<Contribution> findByUser(User user);
}