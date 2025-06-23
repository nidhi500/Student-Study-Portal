package com.studentcompanion.repository;

import com.studentcompanion.model.StriverTopic;
import com.studentcompanion.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StriverTopicRepository extends JpaRepository<StriverTopic, Long> {
    List<StriverTopic> findByUser(User user);
    Optional<StriverTopic> findByUserAndTopic(User user, String topic);
}
