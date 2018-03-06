# Blog using microservices architectures
I have chose to use nodejs for construct api to blog backend and vuejs for construct client with the interface.

For use this base, you need to follow some step
```
git clone git@github.com:ljahier/blog-node.git
cd blog-node/
```
You need install the npm packages and you need to configure your database:
```
cd ../server/
npm install
```
You have 2 choices, if you want, you can juste use a mysql.json file with the identifiants of you can use  need to be like that
```
{
    "Host":	"your host",
    "Database":	"database name",
    "User":	"user to connect to your database",
    "Port":	"port what use your database",
    "Password":	"password to connect to your database"
}
```
Or you can use the Environment variables with process.env.ENVIRONEMENT_VARIABLE, you can setup a [clever cloud](https://clever-cloud.com) database :)

And after you can deploy on [clever cloud](https://clever-cloud.com) your api ;) and she's accessible by everybody.

The URI avalaible is:

For the "Blog" part:
 - GET /
 - GET /blog
 - GET /blog/id (number)
 - POST /blog
 - PUT /blog/id (number)
 - DELETE /blog/id (number)

For the "Users" part:
 - GET /users
 - GET /users/token
 - POST /users
 - PUT /users/token
 - DELETE /users
