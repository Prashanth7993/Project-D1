pipeline {
  agent any
  environment {
    FRONTEND_DIR = 'Frontend-ReactJs/event-managment-dashboard'
    BACKEND_DIR = 'Backend-Java/Event_Managment'
  }
  stages {
    stage('clone') {
      steps {
        // Get some code from a GitHub repository
        git branch: 'main', url:'https://github.com/Prashanth7993/Project-D1.git'
      }
    }
    stage('build frontend'){
      steps{
        dir("${FRONTEND_DIR}") {
          sh 'docker build -t frontend .'
          echo "Docker Frontend image build sucessfully completed."
        }
      }
    }
    stage('build backend'){
      steps{
        dir("${BACKEND_DIR}") {
          sh 'docker build -t backend .'
          echo "Docker Backend image build sucessfully completed."
        }
      }
    }
  }
}