const express = require("express")
global.app = express()
const bodyParser = require("body-parser")
global.config = require("./config.js").config
const mongoose = require("mongoose")
global.SHA256 = require("sha256")
global.nodemailer = require("nodemailer")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo").MongoStore
global.router = express.Router()
global.listendpoints = require("express-list-endpoints")
global.multer = require("multer")
global.path = require("path")
global.appRoot = path.resolve(__dirname)
global.crypto = require("crypto")
global.fs = require("fs")
global.axios = require("axios")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(function(request, response, next){
    if(request.body == undefined){
        request.body = {}
    }
    next()
})


const url = "mongodb://"+config.bd.ip+":"+ config.bd.puerto+"/"+config.bd.nombre

mongoose.connect(url).then((respuesta) => {
    console.log("Conectado a la base de datos Mongo")
}).catch((error) => {
    console.log(error)
})

app.use(session({
    secret:config.secret,
    resave:true,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:url,
        dbName:config.bd.nombre,
        collectionName:"sessions",
        ttl:config.expiracion
    }),
    cookie:{
        maxAge:config.expiracion,httpOnly:true
    },
    name:"Cookieapp",
    rolling:true
}))

app.use(cors(
    {
        origin:function(origin, callback){
            console.log("Peticion desde: " + origin)
            if(!origin) return callback(null, true)
                if(config.whitelist.indexOf(origin) === -1){
                    return callback("error de cors No conozco este origen", false)
                }
                else{
                    return callback(null, true)
                }
        }, credentials:true
    }
))

app.use("/api", router)
require("./routes.js")
require("./actualizacionEndpoints.js")


app.use("/Avatares", express.static(__dirname + "/Avatares"))
app.use("/Productos", express.static(__dirname + "/Productos"))
app.use("/Relojes", express.static(__dirname + "/Relojes"))
app.use("/Documentos", express.static(__dirname + "/Documentos"))

app.use("/", express.static(__dirname + "/Frontend"))

app.listen(config.puerto, function(){
    console.log("Servidor Funcionando por el puerto " + config.puerto)
})