<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Cineplanet API

#### Este proyecto consta de un sistema de validación de tarjeta de crédito y generación de tokens único. A continuación, se describen los componentes clave y los requisitos del sistema:

- Generación de un Token
- Consulta del comercio
- Almacenamiento seguro
- Tiempo de registro

Para todo esto hemos utilizando como Backend NestJS, base de Datos MySQL Server y para la información CACHE Redis.

## 1. Clonar proyecto

```
git clone git@github.com:MarvoloV/interviewC-API.git
```

## 2. Instalar las dependencias

```
npm install
```

## 3. Clonar el archivo `.env.template` y renombrarlo a `.env`

```
cp .env.example .env
```

## 4. Levantar la base de datos y redis

```
docker-compose up -d
```

## 6. Correr en un entorno local los azure Functions

`npm run start:azure`

## 7. Ejecutar SEED

```
http://localhost:7071/api/v2/seed
```

### Despliegue Local

```bash
npm run start:azure
```

```bash


Functions:
	main:  http://localhost:7071/api/v2/{*segments}

endpoints:
  GET  - http://localhost:7071/api/v2/seed
  POST - http://localhost:7071/api/v2/token
  GET  - http://localhost:7071/api/v2/commerce

POST:
body:{
   "card_number":"4557880675549046",
    "cvv":"123",
    "expiration_month":"1",
    "expiration_year":"2024",
    "email":"jorgead0812@gmail.com"
}
Response:
{
    "token": "EnQMFPbjDo6uqvpG"
}
----------------------------------------------
GET:
header:{
  Authorization: "EnQMFPbjDo6uqvpG",
  X-Comercio-ID: "A244F8F6-C3FC-41FF-A2F7-52E5BC75811B"
}
response:{
    "id": "A244F8F6-C3FC-41FF-A2F7-52E5BC75811B",
    "name": "Tagcat",
    "address": "99 Fulton Court"
}
```

## Testing

```bash
npm run test
```
