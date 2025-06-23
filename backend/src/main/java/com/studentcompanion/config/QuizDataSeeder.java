package com.studentcompanion.config;

import com.studentcompanion.model.CareerGoal;
import com.studentcompanion.model.QuizQuestion;
import com.studentcompanion.repository.QuizQuestionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuizDataSeeder {

    @Autowired
    private QuizQuestionRepository quizRepo;

    @PostConstruct
    public void seedData() {
        if (quizRepo.count() > 0) return; // Avoid duplicate seeding on restart

        // Example GATE Question
        quizRepo.save(new QuizQuestion(
                "Which data structure is used in a recursive algorithm call stack?",
                List.of("Queue", "Array", "Stack", "LinkedList"),
                "Stack",
                CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "In a connected graph with no cycles, how many edges are there in terms of vertices V?",
            List.of("V", "V-1", "V+1", "2V-1"),
            "V-1",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "What is the worst-case time complexity of QuickSort?",
            List.of("O(n)", "O(n log n)", "O(n^2)", "O(log n)"),
            "O(n^2)",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following is a context-free language not regular?",
            List.of("a^n b^n", "a*b*", "(a|b)*", "ab*"),
            "a^n b^n",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which traversal of a binary search tree results in sorted order?",
            List.of("Preorder", "Postorder", "Inorder", "Level-order"),
            "Inorder",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "The minimum number of gates required to implement a full adder is?",
            List.of("4", "5", "6", "7"),
            "5",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following is not a stable sorting algorithm?",
            List.of("Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"),
            "Selection Sort",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "In which layer of the OSI model does the TCP protocol operate?",
            List.of("Application", "Transport", "Network", "Data Link"),
            "Transport",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following is used to prevent deadlock in operating systems?",
            List.of("Mutex", "Banker's Algorithm", "Paging", "Segmentation"),
            "Banker's Algorithm",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following data structures is used in Breadth First Search?",
            List.of("Stack", "Queue", "Priority Queue", "HashMap"),
            "Queue",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "What is the output of the expression 4 & 1 in C?",
            List.of("0", "1", "2", "4"),
            "0",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following is a page replacement algorithm?",
            List.of("FIFO", "LRU", "Optimal", "All of the above"),
            "All of the above",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which addressing mode is used in the instruction 'MOV AL, [BX]'?",
            List.of("Immediate", "Direct", "Register Indirect", "Indexed"),
            "Register Indirect",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following is not an NP-complete problem?",
            List.of("Traveling Salesman", "3-SAT", "Hamiltonian Path", "Binary Search"),
            "Binary Search",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which protocol is used to assign IP addresses dynamically?",
            List.of("DNS", "DHCP", "FTP", "HTTP"),
            "DHCP",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "What is the size of an IPv6 address?",
            List.of("32 bits", "64 bits", "128 bits", "256 bits"),
            "128 bits",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which one of the following is used to measure cache performance?",
            List.of("Hit ratio", "Miss penalty", "Latency", "Page fault rate"),
            "Hit ratio",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which grammar is used to describe the syntax of programming languages?",
            List.of("Phrase Structure Grammar", "Context-Free Grammar", "Regular Grammar", "Unrestricted Grammar"),
            "Context-Free Grammar",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which among the following is an undecidable problem?",
            List.of("Tower of Hanoi", "Matrix Multiplication", "Halting Problem", "Binary Search"),
            "Halting Problem",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which memory is used to speed up access to frequently used data?",
            List.of("RAM", "ROM", "Cache", "Hard Disk"),
            "Cache",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which traversal of a binary tree uses recursion naturally?",
            List.of("Inorder", "Preorder", "Postorder", "All of the above"),
            "All of the above",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "What is the maximum number of nodes in a binary tree of height h?",
            List.of("2^h - 1", "2h", "h^2", "2h - 1"),
            "2^h - 1",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of the following is a hashing collision resolution technique?",
            List.of("Linear Probing", "Binary Search", "AVL Rotation", "Depth First Search"),
            "Linear Probing",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "What is the worst-case time complexity of inserting in a binary search tree?",
            List.of("O(1)", "O(log n)", "O(n)", "O(n log n)"),
            "O(n)",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "Which of these is a greedy algorithm technique?",
            List.of("Prim’s Algorithm", "Floyd-Warshall", "Bellman-Ford", "Dijkstra with Negative Weights"),
            "Prim’s Algorithm",
            CareerGoal.GATE
        ));

        quizRepo.save(new QuizQuestion(
            "In a relational database, which operation is not part of relational algebra?",
            List.of("Union", "Intersection", "Division", "Update"),
            "Update",
            CareerGoal.GATE
        ));


        // Example CAT Question
        quizRepo.save(new QuizQuestion(
                "If the average of 5 numbers is 20, what is their total sum?",
                List.of("20", "100", "25", "200"),
                "100",
                CareerGoal.CAT
        ));

        // Example UPSC Question
        quizRepo.save(new QuizQuestion(
                "Who was the first Governor-General of India?",
                List.of("Lord Canning", "Warren Hastings", "Lord Mountbatten", "Lord Curzon"),
                "Warren Hastings",
                CareerGoal.UPSC
        ));

        // Example Placement Logical Reasoning Question
        quizRepo.save(new QuizQuestion(
                "Find the next number in the series: 2, 6, 12, 20, ?",
                List.of("30", "28", "32", "24"),
                "30",
                CareerGoal.PLACEMENT
        ));

        System.out.println("✅ Quiz questions seeded!");
    }
}
