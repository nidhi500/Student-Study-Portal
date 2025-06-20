package com.studentcompanion.service;

import com.studentcompanion.model.*;
import com.studentcompanion.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyResourceService {

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private PyqRepository pyqRepository;

    @Autowired
    private PyqCommentRepository commentRepository;

    // STUDENT: Fetch Methods

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

   public List<Subject> getSubjectsBySemesterAndBranch(int semester, String branchCode) {
        System.out.println("📩 Using JPQL fetch for " + semester + ", " + branchCode);
        return subjectRepository.getSubjectsByBranchAndSemester(branchCode, semester);
    }



    public List<Unit> getUnitsBySubject(Long subjectId) {
        return unitRepository.findBySubjectId(subjectId);
    }

    public List<Resource> getResourcesByUnit(Long unitId) {
        return resourceRepository.findByUnitId(unitId);
    }

    public List<Pyq> getPyqsByUnit(Long unitId) {
        return pyqRepository.findByUnitId(unitId);
    }

    public List<PyqComment> getCommentsByPyq(Long pyqId) {
        return commentRepository.findByPyqId(pyqId);
    }

    public PyqComment addCommentToPyq(Long pyqId, User user, String commentText) {
        Pyq pyq = pyqRepository.findById(pyqId).orElseThrow();
        PyqComment comment = new PyqComment();
        comment.setPyq(pyq);
        comment.setUser(user);
        comment.setCommentText(commentText);
        comment.setTimestamp(java.time.LocalDateTime.now());
        return commentRepository.save(comment);
    }

    // ADMIN: Create Methods

    public Semester createSemester(Semester semester) {
        return semesterRepository.save(semester);
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Unit createUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }
    
}
