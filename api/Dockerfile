FROM node:16.13.1
WORKDIR /api
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src/ src/
RUN  ["npm", "install"]
CMD  ["npm", "run", "start"]
EXPOSE 5000