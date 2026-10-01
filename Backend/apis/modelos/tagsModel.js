var tagsModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var tagsSchema = new Schema({
    codigo: String,
    nombre: String
})

const MyModel = mongoose.model("tags", tagsSchema)

tagsModel.ExisteCodigo = function(data, callback){
    MyModel.find({codigo:data.codigo}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

tagsModel.Guardar = function(data, callback) {
    const instancia =  new MyModel
    instancia.codigo = data.codigo
    instancia.nombre = data.nombre
    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

tagsModel.CargarTodos = function(data, callback){
    MyModel.find({}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

tagsModel.CargarId = function(data, callback){
    MyModel.find({_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

tagsModel.Actualizar = function(data, callback){
    MyModel.findOneAndUpdate({_id:data._id},
        {
            nombre:data.nombre
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({state:false, mensaje:"error interno al actualizar", datos:error})
    })
}

tagsModel.Eliminar = function(data, callback){
    MyModel.findOneAndDelete({_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

module.exports.tagsModel = tagsModel