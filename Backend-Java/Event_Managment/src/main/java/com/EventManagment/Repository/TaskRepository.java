package com.EventManagment.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.EventManagment.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	
}
