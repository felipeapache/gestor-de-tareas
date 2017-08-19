
var express = require("express");
var bodyParser = require("body-parser");
var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//http://localhost:3000/login?param=12
server.get("/login", function(req, res){
	var parametro2 = parseInt(req.query.param2);
	var parametro = parseInt(req.query.param);
	//parseInt convierte de string a numero
	//req.query devuelve los parametros
	var hola = sumatoria(parametro);
	res.json(parametro2 + hola);
});

server.listen(3000, function(){
	console.log("servidor corriendo")
});

/*function jaja(parametro,holaa){
	for (var i = 5; i >= 0; i--) {
		console.log(parametro+holaa)
	}
}*/

//jaja("holaa","como estas");

/*function suma(suma,resta) {
	var total = 0;
	for (var i = 1; i <= 3; i++) {
		if(i <= 2){
			total = i + suma + resta;
			console.log(total);
		}	
	}
}*/
//suma(5,12)

function sumatoria(valor){
    if (valor<=5 ){
    	var total = 0; 
		for (var i = 0; i < 3; i++) {
			total += valor;
		}	
		return total;
	}else{
		return valor;
	}
		
}
