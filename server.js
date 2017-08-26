var express = require("express");
var bodyParser = require("body-parser");
//MYSQL
var connection = require("express-myconnection");
var mysql = require("mysql");
var config = require("./config");

var server = express();

server.use(connection(mysql, config.db, 'request'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//http://localhost:3000/login?param=12
server.get("/login-get", function(req, res){
	var parametros = req.query;
	if(req.query.param != undefined){
		var user = parametros.user;
		var password = parametros.password;
		res.json(parametros);
	} else {
		res.json("paseme el param");	
	}	
});

server.post("/signup", function(req, res){
	var user = req.body;
	user.fecha = new Date();
	req.getConnection(function(error, connection){
		var query = connection.query("INSERT INTO user set ?", user, function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				//Terminar registro y validar
				//1. Que el usuario no exista
				res.json(data);
			}
		});
	});
});

server.post("/login", function(req, res){
	req.getConnection(function(error, connection){
		var query = connection.query("SELECT * FROM user", function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				//Terminar login y validar
				//1. El usuario no existe
				//2. Contraseña invalida
				res.json(data);
			}
		});
	});
});

/*
	entidad: user
	id
	user
	name
	lastname
	fecha,

	entidad: tareas
	id
	name
	description
	fecha
	state
*/

server.listen(config.server.port, function(){
	console.log("servidor corriendo")
});