const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"
// const mongoURI = "mongodb+srv://Suman:helloworld%4011@inotebookcluster.vjzwj.mongodb.net/test"
//const mongoURI = "https://data.mongodb-api.com/app/data-eqghd/endpoint/data/beta"
const mongoURI = "mongodb+srv://Suman:helloworld@inotebookcluster.vjzwj.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo database');
    })
}


module.exports = connectToMongo;   
