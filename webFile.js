var express = require("express");
var app = express();

app.use('/', express.static("public"));
// app.use('/packages', express.static("public"));

app.listen(8100, function(){
	console.log("***************** connect *********************")
})
