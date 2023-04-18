FROM node:18.13.0-alpine as development

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project

EXPOSE 3000