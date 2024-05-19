# Use uma imagem base Node.js
FROM node:14

# Defina o diretório de trabalho na imagem
WORKDIR /app

# Copie o arquivo package.json e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante do código fonte
COPY . .

# Exponha a porta em que o servidor Node.js está ouvindo
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["node", "server.js"]
