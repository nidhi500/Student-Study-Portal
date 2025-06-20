package com.studentcompanion.repository;

import com.studentcompanion.model.PyqComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PyqCommentRepository extends JpaRepository<PyqComment, Long> {
    List<PyqComment> findByPyqId(Long pyqId);
}
