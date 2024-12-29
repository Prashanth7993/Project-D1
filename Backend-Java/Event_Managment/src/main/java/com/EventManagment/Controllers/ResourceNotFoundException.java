package com.EventManagment.Controllers;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message); // Pass the message to the superclass constructor
    }
}
