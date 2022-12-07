
var express  = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app      = express();
var database = require('./config/database.js');
var bodyParser = require('body-parser'); 
const exphbs = require('express-handlebars');
var fs = require('fs');  
const bcrypt=require('bcrypt');
const basicAuthentication=require('./shared/basicAuthentication');
var port     = process.env.PORT || 8000;




database.initialize(database.url);
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
//app.use(bodyParser.json());                                     // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.static(path.join(__dirname, 'public')));

const HBS= exphbs.create({ extname: '.hbs',defaultLayout:"main",layoutsDir:path.join(__dirname,'views','layouts')});
app.engine('.hbs', HBS.engine);
app.set('view engine', 'hbs');
var Movie = require('./models/movie');
const { json } = require('express');
const { Console } = require('console');
const { type } = require('os');
app.all('/api/*',basicAuthentication);
function authCheck(req,res){
	const authenticatedUser = req.authenticatedUser;
	if(!authenticatedUser) {
		console.log('Sorry');
	   res.status(403).send({message:'forbidden'});
	}
	

}


//WORKING
app.get('/api/movies/getlist/view', function(req, res) {
	authCheck(req,res);
	if(res.finished){
		return;
		//res.send({message: 'Forbidden'});
	}
	else{
	
	//res.render('showdata', { obj: obj});
	let page_p = req.query.page;
    let perPage_p = req.query.perPage;
    let title_p = req.query.title;
	console.log(req.query);	

	database.getAllMovies(page_p,perPage_p,title_p).then((result) => {
		//	console.log("inside app"+result[0])
		//	console.log(typeof(result))
		//let text = result.replace("_id", "id");
		resultm=JSON.stringify(result);
		//delete resultm[0]._id;
		console.log("resultm"+typeof(resultm))
		g=JSON.parse(resultm)
		console.log("Loading")
		console.log("resultm"+typeof(g))
		//console.log(g);
		console.log(g.length)
		res.render('showdata', { obj: g  });
	})
	.catch((error) => {
		console.error("inside app"+error)
		res(error)
	});;
}
});

//WORKING
app.get('/api/Movies/:id', function(req, res) {
	authCheck(req,res);
	if(res.finished){
		return;
		//res.send({message: 'Forbidden'});
	}
	else{
	console.log("Inside app.get('/api/Movies/:id')")
	let id = req.params.id;
	console.log("Waiting for promise ");
	//var hh=database.getMovieById(id);
	database.getMovieById(id).then((result) => {
		console.log(result)
		res.send(result)
	})
	.catch((error) => {
		console.error(error)
		res(error)
	});
}
});


//WORKING
app.get('/api/viewmovies',function(req, res) {
	// const authenticatedUser = req.authenticatedUser;
	// if(!authenticatedUser) {
	//   return res.status(403).send({message: 'Forbidden'});
	// }
	authCheck(req,res);
	if(res.finished){
		return;
		//res.send({message: 'Forbidden'});
	}
	else{
	
	let page_p = req.query.page;
    let perPage_p = req.query.perPage;
    let title_p = req.query.title;
	console.log(req.query);	
	database.getAllMovies(page_p,perPage_p,title_p).then((result) => {
		console.log("inside app"+result)
		
		res.send(result)
	})
	.catch((error) => {
		console.error("inside app"+error)
		res(error)
	});;
}
	
});

//WORKING
app.post('/api/Movies/', function(req, res) {
	authCheck(req,res);
	if(res.finished){
		return;
		//res.send({message: 'Forbidden'});
	}
	else{

	console.log("q---"+req.query);
	console.log("ppp==="+req.params);
	var data={
		title:req.query.title,
		fullplot:req.query.fullplot	
	};
	console.log("check data idar "+data.title);
	var flag=database.addNewMovie(data).then((result) => {
		console.log("flag result"+result)
		if(flag){
			res.send("data inserted")
		}else{
			res.send("something went wrong");
		}
		
	})
	.catch((error) => {
		console.error("inside app"+error)
		res(error)
	});
}
});

app.put('/api/Movies/:id', function(req, res) {
	let id = req.params.id;
	var data={
		title:'updated title chaeck',
		id: '573a1390f29313caabcd4135'
	}
	console.log("Waiting for promise ");
	database.updateMovieById("573a1390f29313caabcd4135",data)
});

app.delete('/api/deletemovie/:id', function(req, res) {let id = req.params.id;
	console.log("Waiting for promise ");
	database.deleteMovieById(id).then((result) => {
		console.log(result)
		res.send(result)
	})
	.catch((error) => {
		console.error(error)
		res(error)
	});
});

app.get('*', function(req, res) {
res.render('error', { title: 'Error', message:'Wrong Route' });	
});
app.listen(port);
console.log("App listening on port : " + port);
