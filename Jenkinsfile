pipeline {
    agent any

    tools {
        nodejs 'Nodejs'
    }

    environment {
        IMAGE = 'sunny5577/node-app:latest'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Kranthi9955/node-devops-app-.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'Docker-pass', url: 'https://index.docker.io/v1/') {
                        sh "docker build -t $IMAGE ."
                        sh "docker push $IMAGE"
                    }
                }
            }
        }
        stage('Run Container (Demo Only)') {
            steps {
             sh "docker rm -f node-app || true"
             sh "docker run -d -p 3004:3000 --name node-app $IMAGE"
    }
}
    }
}
