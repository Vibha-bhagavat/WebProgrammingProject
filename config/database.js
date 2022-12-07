//const { response } = require('express');
var { response } = require('express');
var mongoose = require('mongoose');
var port     = process.env.PORT || 8000;
var Movie = require('../models/movie');
require ("dotenv").config();
let url= process.env.url; //accessing teh url parameter from the .env file
module.exports = {
   url
};
module.exports.initialize = (connectionString) => {
    //console.log(connectionStirng);
    //console.log(__dirname);
    mongoose.connect(connectionString)
    .then( () => {
        console.log('Connected to the database ')
		//console.log( mongoose);
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
        process.exit(1);
		//app.off()
    })
}
module.exports.getMovieById = (id) => {
    const get_data = new Promise(function(resolve, reject) {
        Movie.findById(id, function(err, movie) {
            if (err){
                response=err
                reject(err);
            }
            console.log("line 32"+movie)
            response= movie;
            resolve(movie)
        });
      });
      //return promise 
      console.log(get_data)
      return get_data;
}
module.exports.addNewMovie=(data)=>{
   
    const get_data = new Promise(function(resolve, reject) {
        
            var d=Movie.create(data,function(err, movie) {
                if(err){
                    console.log("err check kar le"+err)
                    resolve(false)
                }else{
                    resolve(true)
                }
            });
            //resolve(true)
        
      });
      //return promise 
      console.log(get_data)
      return get_data;
    

}

module.exports.getAllMovies=(page_p, perPage_p, title_p)=>{
    var findBy; 
    var token= new RegExp(title_p,'i')
    console.log(token);
    console.log(page_p)
    console.log(perPage_p)
    //console.log("check find by"+findBy.title_p);
    const get_data = new Promise(function(resolve, reject) {
        Movie.find({title:token},function(err, movieh) {
            if (err){
                response=err
                console.log(response);
                reject(err);
            }
            console.log("err"+err)
           // console.log("line getAllMovies"+movieh)
            response= movieh;
            resolve(movieh)
       }).skip(page_p * +perPage_p).limit(perPage_p)
    });
    //console.log(get_data);
    return get_data;
    
}

module.exports.updateMovieById=(data,id)=>{

  /*  const get_data = new Promise(function(resolve, reject) {
        Movie.findByIdAndUpdate({id:data},function(err, movie) {
            if (err){
                console.log("checj idar"+err)
                response=err
                reject(err);
            }
            console.log("line deleteMovieById")
            response= movie;
            resolve("Record deleted")
    });

//console.log(get_data);
return get_data;
});    */
Movie.findByIdAndUpdate(id,data,function(err, movie) {
    if (err){
        console.log("checj idar"+err)
        //response=err
      //  reject(err);
    }
    console.log("line deleteMovieById")
    response= movie;
    //resolve("Record deleted")
});
}

module.exports.deleteMovieById=(data)=>{
    const get_data = new Promise(function(resolve, reject) {
        Movie.findOneAndDelete({_id:data},function(err, movie) {
            if (err){
                response=err
                console.log(err);
                reject(err);
                
            }
            console.log("line deleteMovieById")
            response= movie;
            console.log(response);
            resolve("Record deleted")
    });

//console.log(get_data);
return get_data;
});    
}
