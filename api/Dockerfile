FROM node:latest 
WORKDIR /api
COPY package.json ./
COPY tsconfig.json ./
COPY src/ src/
RUN  ["npm", "install"]
RUN npm install -g @nestjs/cli
CMD  ["npm", "run", "start"]
EXPOSE 5000