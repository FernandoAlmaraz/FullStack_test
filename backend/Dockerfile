# Usa una imagen base de Node.js
FROM node:20

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usará la aplicación
EXPOSE 5100

# Comando para iniciar la aplicación
CMD ["npm", "start"]
