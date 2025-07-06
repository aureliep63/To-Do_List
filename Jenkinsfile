pipeline {
  agent {
    docker {
      image 'node:18'
      args '-p 8080:8080'
    }
  }

  environment {
    APP_NAME = "todo-list-app"
    PORT = "8080"
  }

  stages {
    stage('Installer les dépendances') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lancer les tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Construire l’image Docker') {
      steps {
        sh 'docker build -t $APP_NAME .'
      }
    }

    stage('Lancer le conteneur Docker') {
      steps {
        sh 'docker run -d -p $PORT:$PORT --name $APP_NAME $APP_NAME || true'
      }
    }

    stage('Nettoyage (optionnel)') {
      steps {
        sh 'docker ps -a'
      }
    }
  }
}
