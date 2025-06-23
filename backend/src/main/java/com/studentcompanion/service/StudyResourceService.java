package com.studentcompanion.service;

import com.studentcompanion.model.*;
import com.studentcompanion.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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


    // ====================== STUDENT: Fetch Methods ======================

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


    // ✅ Fixed: Comment Saving Logic for Pyq
    

    // ====================== ADMIN: Create Methods ======================

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
