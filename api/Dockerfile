FROM node:latest 
WORKDIR /api
COPY package.json ./
COPY tsconfig.json ./
COPY src/ src/
RUN  ["npm", "install"]
CMD  ["npm", "run", "start"]
EXPOSE 5000