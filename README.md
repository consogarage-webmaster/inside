# inside
## Installation
Commencez par instaler les dépendances :
```
npm i
```
docker compose up --build

<!-- Entrer dans la console du container -->
docker exec -it inside-db-1 bash

## Si besoin de reinitialiser les container
```
npm run rm:container
npm run compose:dev
```

## start from scratch
```
docker compose down -v
docker volume prune
docker system prune -a --volumes
npm run compose:dev
```
