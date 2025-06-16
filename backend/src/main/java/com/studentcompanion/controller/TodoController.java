package com.studentcompanion.controller;

import com.studentcompanion.model.Todo;
import com.studentcompanion.repository.TodoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoRepository todoRepo;

    // GET: All todos for a user
    @GetMapping("/{userId}")
    public List<Todo> getTodosByUser(@PathVariable Long userId) {
        return todoRepo.findByUserId(userId);
    }

    
    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepo.save(todo);
    }


    // DELETE: Remove todo
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepo.deleteById(id);
    }

    // PUT: Update todo status or text
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updated) {
        Todo todo = todoRepo.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        todo.setText(updated.getText());
        todo.setDone(updated.isDone());
        return todoRepo.save(todo);
    }
}
