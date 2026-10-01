var rolesModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var rolesSchema = new Schema({
    code: String,
    nombre: String,
    estado: String,
})

const MyModel = mongoose.model("roles", rolesSchema)

rolesModel.ExisteCode = function(data, callback){
    MyModel.find({code:data.code}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

rolesModel.Guardar = function(data, callback) {
    const instancia =  new MyModel
    instancia.code = data.code
    instancia.nombre = data.nombre
    instancia.estado = data.estado
    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

rolesModel.CargarTodos = function(data, callback){
    MyModel.find({}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

rolesModel.CargarId = function(data, callback){
    MyModel.find({_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

rolesModel.Actualizar = function(data, callback){
    MyModel.findOneAndUpdate({_id:data._id},{nombre:data.nombre, estado:data.estado}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({state:false, mensaje:"error interno al actualizar", datos:error})
    })
}

rolesModel.Eliminar = function(data, callback){
    MyModel.findOneAndDelete({_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

module.exports.rolesModel = rolesModel