package com.EventManagment.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EventManagment.model.Task;
import com.EventManagment.service.EventService;
import com.EventManagment.service.TaskService;

@CrossOrigin(origins = "http://react-event-service:30007")
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