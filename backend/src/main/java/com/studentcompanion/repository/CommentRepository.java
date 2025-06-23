package com.studentcompanion.repository;
import com.studentcompanion.model.Comment;
import com.studentcompanion.model.User;
import org.springframework.data.jpa.repository.JpaRepository;   
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByContextTypeAndContextIdOrderByTimestampDesc(String contextType, Long contextId);
    List<Comment> findByUser(User user);
}
