var asignacionModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var asignacionSchema = new Schema({
    permiso: String,
    nombrerol: String,
    path: String,
})

const MyModel = mongoose.model("asignacion", asignacionSchema)

asignacionModel.ExisteRolyPath = function(data, callback){
    MyModel.find({path:data.path, nombrerol:data.nombrerol}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

asignacionModel.Guardar = function(data, callback) {
    const instancia =  new MyModel
    instancia.permiso = data.permiso
    instancia.nombrerol = data.nombrerol
    instancia.path = data.path
    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

asignacionModel.CargarTodos = function(data, callback){
    MyModel.find({}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

asignacionModel.CargarId = function(data, callback){
    MyModel.find({_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

asignacionModel.Actualizar = function(data, callback){
    MyModel.findOneAndUpdate({_id:data._id},
        {
            permiso:data.permiso
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({state:false, mensaje:"error interno al actualizar", datos:error})
    })
}

asignacionModel.Eliminar = function(data, callback){
    MyModel.findOneAndDelete({_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

module.exports.MyModel = MyModel
module.exports.asignacionModel = asignacionModel