pipeline {

    agent any

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages{
        stage('Init'){
           steps {
            echo "Init"
            // Send build started notifications
             slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' branch:(${env.GIT_BRANCH}) - url:(${env.BUILD_URL})")
           }
        }

        // Init SonarQube analysis
        stage('SonarQube analysis') {
            steps {
               echo 'SonarQube analysis'
               // requires SonarQube Scanner 2.8+
               script { 
                 if (env.GIT_BRANCH == 'origin/test') {
                    // withSonarQubeEnv('Sonar') {
                    //         sh '/var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarScanner/bin/sonar-scanner'
                    //     }
                 }
               }
            }
        }
        // End SonarQube analysis

        // Build Start
        stage ('Build Docker'){
          steps {
           echo "Build"
           script {  
              echo "${env.GIT_BRANCH}"
              if (env.GIT_BRANCH == 'origin/master') {
               // env.COMMAND = 'docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build'
               env.COMMAND = 'docker-compose up -d --build'
              } 
              else if (env.GIT_BRANCH == 'origin/test') {
                env.COMMAND = 'docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d --build'
              }
              else if (env.GIT_BRANCH == 'origin/develop') {
                env.COMMAND = "docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build"
              } 
              else {
                env.COMMAND = 'docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build'
              } 
           }
           echo "-----"
           echo "${env.COMMAND}"
           echo "-----"
           sh "${env.COMMAND}"
           echo "Fin Build"
          }
          post{
           success{
             echo "Exito Build"
            // Send build end build notifications
             slackSend (color: '#FFFF00', message: "DONE SUCCESS:  Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' branch:(${env.GIT_BRANCH}) - url:(${env.BUILD_URL})" )
           }
           always {
               echo "Exito always" 
           }
           failure {
              echo "Fail" 
           // mail to:"me@example.com", subject:"FAILURE: ${currentBuild.fullDisplayName}", body: "Boo, we failed."
              // Send failure notification
              slackSend (color: '#FFFF00', message: "FAIL:  Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' branch:(${env.GIT_BRANCH}) - url:(${env.BUILD_URL})" )
           }
          }
        }
        // End Build Start
    }
}