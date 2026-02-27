# GOS

# Tecnologías utilizadas

* Node.js
* Fastify
* MongoDB
* Mongoose 
* JSON Web Token
* Swagger   

# Instalaciones necesarias
- pnpm add fastify mongoose bcrypt jsonwebtoken dotenv
- pnpm add -D nodemon

# Funcionamiento del código 

## Login
Tenemos de primero el Auth, este hcae que se pueda registrar el usuario al sistema.
Después tendriamos lo que es el login, este hace que cuando el usuario inicia sesión lo diferencia con su propio toker, mostrandolo con el JSON.

Esto funciona con jwt.

## Posts / Publicaciones

Pasariamos a la parte de post/publicaciones, para esto nos sirvió el token del usuario, para poder diferenciarlo y diferenciar los posts.
Tenemos que autorizar la creación de los post con el Bearer token que nos dió el login para que se le asigne al usuario el post.

Cuando creamos los posts nos devuelve un id unico para cada uno que nos servirá para los comentarios.

Podemos agregar, editar y eliminar posts.

## Comments

En este apartado ya con el id del post lo ponemos en donde nos pide el id de la publicación y de igual forma autorizar con el bearer token del usuario para que sea el que este comentando.


