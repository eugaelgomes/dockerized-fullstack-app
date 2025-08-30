# ===================================================================================
# ESTÁGIO 1: O "Builder" (A nossa oficina)
# ===================================================================================
# Usamos uma imagem Node.js com Alpine (uma versão super leve de Linux)
# e damos um "apelido" para este estágio: 'builder'
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência. O '*' garante que tanto o package.json
# quanto o package-lock.json (se existir) sejam copiados.
# Isso aproveita o cache do Docker: este passo só roda de novo se esses arquivos mudarem.
COPY package*.json ./

# Instala TODAS as dependências, incluindo as 'devDependencies' que precisamos para o build
RUN npm install

# Agora copia todo o resto do código-fonte para o contêiner
COPY . .

# Roda o script de build definido no seu package.json ('npm run build')
# Isso vai criar a pasta 'dist' com o JavaScript compilado
RUN npm run build

# ===================================================================================
# ESTÁGIO 2: O "Production" (O nosso carro pronto)
# ===================================================================================
# Começamos de novo, com uma imagem limpa e leve
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência novamente
COPY package*.json ./

# Instala APENAS as dependências de produção.
# Isso ignora todas as 'devDependencies' e deixa a imagem final muito menor.
RUN npm install --omit=dev

# A mágica acontece aqui! Copiamos APENAS a pasta 'dist' que foi gerada
# no estágio 'builder' para a nossa imagem final.
COPY --from=builder /app/dist ./dist

# Expõe a porta 8080. Isso é uma documentação para dizer qual porta o contêiner usa.
# A publicação da porta é feita no docker-compose.yml.
EXPOSE 8080

# O comando para iniciar a aplicação. Ele vai rodar 'npm run start',
# que por sua vez executa 'node dist/index.js'.
CMD ["npm", "start"]