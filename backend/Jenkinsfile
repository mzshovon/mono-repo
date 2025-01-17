pipeline {
    agent any

    environment {
        DEPLOY_HOST = "103.138.150.86"
        BUILD_FOR = "production"
    }

    stages {
        stage('BuildAndDeploy') {
            matrix {
                axes {
                    axis {
                        name 'SERVERS'
                        values '103.138.150.86'
                    }
                }

                stages {
                    stage('Pull Code') {
                        steps {
                            git branch: 'master',
                                credentialsId: 'git-pookie',
                                url: 'https://github.com/mzshovon/feedsense-backend.git'
                        }
                    }
                    stage('Approve Deployment') {
                        steps {
                            input "Deploy to production?"
                        }
                    }
                    stage('Removing files') {
                        steps {
                            sh "rm -r ${WORKSPACE}/.git"
                            sh "rm ${WORKSPACE}/Jenkinsfile*"
                        }
                    }
                    stage('Start Container') {
                        steps {
                            script {
                                withCredentials([usernamePassword(credentialsId: 'feedsense-portal-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                    sh """
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose up -d"
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php chmod -Rf 777 storage vendor"
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php chmod 400 .env"
                                    """
                                }
                            }
                        }
                    }

                    stage('Composer And Cache') {
                        steps {
                            script {
                                withCredentials([usernamePassword(credentialsId: 'feedsense-portal-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                    sh """
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php composer install"
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php php artisan config:clear"
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php php artisan optimize"
                                    """
                                }
                            }
                        }
                    }


                    stage('DB Migration and Seed') {
                        steps {
                            script {
                                withCredentials([usernamePassword(credentialsId: 'feedsense-portal-user', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                    sh """
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php php artisan migrate --force"
                                        sshpass -p '${PASSWORD}' ssh -o StrictHostKeyChecking=no ${USERNAME}@${SERVERS} "cd /home/pet-projects/laravel11;docker compose exec php php artisan db:seed --force"
                                    """
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
