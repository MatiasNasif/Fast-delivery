FROM node:latest
WORKDIR /api
COPY . .
RUN npm install
RUN npm i -g @nestjs/cli@9.0.0 \
    && npm i @nestjs/common@9.0.0 \
    && npm i @nestjs/mongoose@9.2.1 \
    && npm i @nestjs/passport@9.0.3 \
    && npm i @nestjs/jwt@10.0.2 \
    && npm i @nestjs/mapped-types@1.2.2 \
    && npm i @nestjs/core@9.0.0 \
    && npm i bcrypt@5.1.0 \
    && npm i mongoose@6.0.2 \
    && npm i passport-local@1.0.0 \
    && npm i class-validator@0.5.1
CMD ["npm", "run", "start"]
EXPOSE 5000
