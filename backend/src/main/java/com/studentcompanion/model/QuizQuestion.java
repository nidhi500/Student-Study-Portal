package com.studentcompanion.model;

import jakarta.persistence.*;
import java.util.List;
import com.studentcompanion.model.CareerGoal;

@Entity
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CareerGoal goal;


    private String question;

    @ElementCollection
    private List<String> options;

    private String correctAnswer;
    
    public QuizQuestion(String question, List<String> options, String correctAnswer, CareerGoal goal){
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.goal = goal;
    }
    public QuizQuestion() {}



    // --- Getters and Setters ---
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public CareerGoal getCareerGoal() { return goal; }
    public void setCareerGoal(CareerGoal goal) { this.goal = goal; }

    public String getQuestion() { return question; }

    public void setQuestion(String question) { this.question = question; }

    public List<String> getOptions() { return options; }

    public void setOptions(List<String> options) { this.options = options; }

    public String getCorrectAnswer() { return correctAnswer; }

    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
}
