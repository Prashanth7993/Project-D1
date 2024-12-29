package com.EventManagment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EventManagment.Repository.EventRepository;
import com.EventManagment.Repository.TaskRepository;
import com.EventManagment.model.Event;
import com.EventManagment.model.Task;
 // Custom exception

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }
    
    
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    

    public Task findById(Long taskId) {
        return taskRepository.findById(taskId).orElse(null); // Return null if task not found
    }
    
    public Task save(Task task) {
        return taskRepository.save(task); // Save task to the database
    }
    public Task assignTaskToEvent(Long eventId, Task task) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        task.setEvent(event);
        return taskRepository.save(task);
    }
    public Task updateTaskStatus(Long taskId, String status) throws Exception {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new Exception("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        taskRepository.delete(task);
    }
    
    public Task updateTaskStatus(Long taskId, Task task) {
        Task existingTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        existingTask.setStatus(task.getStatus());
        return taskRepository.save(existingTask);
    }    
}
