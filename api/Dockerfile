FROM node:latest
WORKDIR /api
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src/ src/
RUN  ["npm", "install"]
RUN npm i -g @nestjs/cli
CMD  ["npm", "run", "start"]
EXPOSE 5000