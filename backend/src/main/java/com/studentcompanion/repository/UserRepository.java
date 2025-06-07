package com.studentcompanion.repository;

import com.studentcompanion.model.User; // Make sure this matches folder structure
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}