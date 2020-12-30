pipeline{
    agent any
    environment {
        DOCKER_TAG = getHash()
    }

    stages{
        stage('SCM'){
            steps{
                git 'https://github.com/CPeraltaa/ecommerce-SA'
            }
        }
        stage('Testing'){
            steps{
                dir('subasta'){
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('Build Docker'){
            steps{
                dir('subasta'){
                    sh 'docker build . -t cperaltaa/subasta:${DOCKER_TAG}'
                }
            }
        }
    }
}

def getHash(){
    def commitHash = sh returnStdout: true, script: 'git rev-parse --short HEAD'
    return commitHash
}