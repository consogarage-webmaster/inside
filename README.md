# inside
## Installation


1. Installer Docker
2. Installer Docker Compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```
sudo chmod +x /usr/local/bin/docker-compose
```

3. Installer npm
```
apt install npm
```
4. Install Postgres
```
sudo apt install postgresql postgresql-contrib
```














Commencez par installer les dépendances :
```
npm i
```
docker compose up --build

Admin User
web@consogarage.com
12345678

<!-- Entrer dans la console du container -->
docker exec -it inside-db-1 bash

## Si besoin de reinitialiser les container
```
npm run rm:container
npm run compose:dev
```
## Executer le seeding sur le container
```
docker-compose exec app npm run createTables
docker-compose exec app npm run seedTables

```
## start from scratch
```
docker compose down -v
docker volume prune
docker system prune -a --volumes
npm run compose:dev
```


