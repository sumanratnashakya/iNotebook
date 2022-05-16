const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"
const mongoURI = "mongodb+srv://Suman:Crimson%4011@inotebookcluster.vjzwj.mongodb.net/test"
const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo database');
    })
}


module.exports = connectToMongo;   