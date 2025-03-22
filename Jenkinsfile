pipeline {
  agent any
  environment {
    FRONTEND_DIR = 'Frontend-ReactJs/event-management-dashboard'
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
        stage('frontend image push to hub.docker.com'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'Docker_Hub_Credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'docker tag frontend $DOCKER_USER/frontend:v1'
                    sh 'docker push $DOCKER_USER/frontend:v1'
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
        stage('frontend image push to hub.docker.com'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'Docker_Hub_Credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'docker tag backend $DOCKER_USER/backend:v1'
                    sh 'docker push $DOCKER_USER/backend:v1'
                }
            }
        }
             
    }
}