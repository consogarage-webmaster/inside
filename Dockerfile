# Dockerfile qui sert à lancer l'environnement
# Node.js pour le développement de façon à ce
# toute l'équipe utilise le même environnement

# Depuis l'image Node de dockerhub version 20
FROM node:20

RUN apt-get update -y
RUN apt-get install -y rsync
RUN apt-get install -y postgresql-client

WORKDIR /usr/src/cache

# Recuperer le package.json et package-lock.json pour la commande 'npm install'
COPY ./package.json ./
COPY ./package-lock.json ./

# Installer les dépendances avec npm
RUN npm install

# Definir le repertoire de travail
WORKDIR /usr/src/app

# Copier le contenu du repertoire racine local dans le répertoire racine du container
COPY ./ ./

# Copier les modules Node.js du répertoire de cache au répertoire de l'application
RUN rsync -arv /usr/src/cache/node_modules/. /usr/src/app/node_modules

# Exécutez la commande de réinitialisation de la base de données, si nécessaire
# RUN npm run db:resetR

# Exposer le port pour pouvoir accéder au container depuis l'explorateur
EXPOSE 3000

# Commande à effectuer pour initialiser le container (Ici : 'npm run dev')
CMD [ "npm", "run", "start" ]
