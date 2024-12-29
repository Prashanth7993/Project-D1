package com.EventManagment.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.EventManagment.model.Task;
import com.EventManagment.service.EventService;
import com.EventManagment.service.TaskService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private EventService eventService;

    
    
    @GetMapping  // This will handle the GET request for /api/events
    public List<Task> getAllTasks() {
        return taskService.getTasks();  
    }
    

    @PostMapping("/assign/{eventId}")
    public ResponseEntity<Task> createTask(@PathVariable("eventId") Long eventId, @RequestBody Task task) {
        Task savedTask = taskService.assignTaskToEvent(eventId, task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long id) {
         taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully!");
    }
    @PutMapping("/{taskId}")
    public Task updateTaskStatus(@PathVariable("taskId") Long taskId, @RequestBody Task task) {
        return taskService.updateTaskStatus(taskId, task);
    }
 
}