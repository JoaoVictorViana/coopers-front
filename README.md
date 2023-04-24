# Desafio Coopers Full Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

## Desafio

Link do desafio completo clique [aqui](https://github.com/CoopersDigitalProduction/full-stack-test/)

Link do Projeto: [Coopers Challange](http://3.95.27.90)

Para desenvolver este desafio utilizei as seguintes ferramentas:

- ReactJS
- NextJS
- NestJs
- Mysql
- React Context
- Core/Feature (organização dos Components)
- Docker
- AWS

### Requerimentos

- Nodejs: 18.12.0 ou superior
- Docker (opcional)

### Board

Para fins de organização, construi esta [board](https://github.com/users/JoaoVictorViana/projects/1) para listar todas as demandas necessárias para a construção do projeto. 

### Deploy

O projeto foi hospedado na AWS para facilitar a visualização:

[Coopers](http://3.95.27.90)

Foi utilizado os seguintes serviços da AWS:

- ECR (Amazon Elastic Container Registry)
- ECS (Amazon EC2 Container Service)

## Instalação

Primeiro será necessário clonar essa aplicação com os seguintes comandos

```bash
git clone https://github.com/JoaoVictorViana/coopers-front.git
cd coopers-front
```

Em seguida instale todas as dependências do projeto

```bash
yarn install
```

Em seguinda será necessário criar o arquivo .env que contém a variável da url da api

```bash
#criar .env e colocar a seguinte váriavel

NEXT_PUBLIC_API_URL=http://50.19.173.216:3000
```

Por fim rode os seguintes comandos para rodar a aplicação, e logo após acesse http://localhost:3000

```bash
yarn build && yarn start
```

### Docker

O projeto inclui uma imagem Dockerfile, portanto caso queira rodar toda aplicação em um container execute os seguintes comandos:

```bash
docker build -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker
```
