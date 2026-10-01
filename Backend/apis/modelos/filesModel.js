var filesModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var filesSchema = new Schema({
    usuario_id: String,
    nombre: String,
    carpeta: String,
    nombreOriginal: String
})

const MyModel = mongoose.model("files", filesSchema)

filesModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    instancia.usuario_id = data.usuario_id
    instancia.nombre = data.nombre
    instancia.carpeta = data.carpeta
    instancia.nombreOriginal = data.nombreOriginal

    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

filesModel.CargarMisArchivos = function(data, callback){
    MyModel.find({usuario_id:data.usuario_id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}
module.exports.filesModel = filesModel