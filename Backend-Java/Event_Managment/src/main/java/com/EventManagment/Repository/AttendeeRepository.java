package com.EventManagment.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.EventManagment.model.Attendee;

@Repository
public interface AttendeeRepository extends JpaRepository<Attendee, Long>{

}
