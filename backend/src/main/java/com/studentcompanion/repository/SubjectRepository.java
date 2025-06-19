package com.studentcompanion.repository;

import com.studentcompanion.model.Semester;
import com.studentcompanion.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("SELECT s FROM Subject s WHERE s.branch.code = :code AND s.semester = :semester")
List<Subject> getSubjectsByBranchAndSemester(@Param("code") String code, @Param("semester") int semester);


}
