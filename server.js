var express = require("express");
var bodyParser = require("body-parser");
var server = express();

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

server.post("/login", function(req, res){
	var parametros = req.body;
	var user = validPassword(parametros.password);
	if(validUser(parametros.user) && user){
		res.json(user);
	} else {
		res.json({ state: "ERROR", description: "El usuario no existe" });	
	}	
});

function validPassword(password){
	for (var i = 0; i < db.length; i++) {
		if(db[i].password == password){
			return db[i];
		}
	}
	return false;
}


function validUser(user){
	for (var i = 0; i < db.length; i++) {
		if(db[i].user == user){
			return true;
		}
	}
	return false;
}

var db = [
	{ id: 1, name: "Apache", user: "a.pache", password: 123 },
	{ id: 2, name: "Yeison", user: "y.eison", password: 1234 }
];

server.listen(3000, function(){
	console.log("servidor corriendo")
});