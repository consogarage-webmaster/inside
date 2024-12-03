# Procédure de Déploiement - Inside
Ce guide décrit les étapes nécessaires pour déployer le projet Inside, en utilisant **Docker** et **docker-compose** pour orchestrer l'application et sa base de données PostgreSQL.
## Prérequis
Avant de commencer, assurez-vous d’avoir :

- Docker installé (version 20.x ou supérieure).
- Docker Compose installé (version 3.8 ou supérieure).
## Étapes de Déploiement
### Cloner le dépôt
Clonez le dépôt du projet depuis Github :
```
git clone git@github.com:consogarage-webmaster/inside.git
cd inside
```
### Créez votre fichier .env configuré avec les variables suivantes :
```
DB_HOST=db
DB_PORT=5432
DB_USER=XXXX
DB_PASSWORD=XXXX
DB_NAME=XXXX

APIKEY=XXXX
JWT_SECRET=XXXX
```
### Lancez les conteneurs
Utilisez Docker Compose pour construire les images et lancer les services :
```
docker-compose up --build -d
```
- `--build` : Recrée les images Docker si nécessaire.
- `-d` : Exécute les conteneurs en arrière-plan.

### Accédez à l'application
Ouvrez votre navigateur et accédez à l’application via l’adresse suivante :

```
http://localhost:3000
```