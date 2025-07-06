# Étape 1 : Choisir une image de base avec Node.js
FROM node:18

# Étape 2 : Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers de ton projet dans le conteneur
COPY . .

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Installer un serveur local pour servir l'application (http-server)
RUN npm install -g http-server

# Étape 6 : Lancer le serveur sur le port 8080
CMD ["http-server", ".", "-p", "8080"]

# Étape 7 : Exposer le port 8080
EXPOSE 8080
