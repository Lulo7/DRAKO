var apisModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var apisSchema = new Schema({
    path: String,
    metodo: String,
    descripcion: String,
    tipo: String
})

const MyModel = mongoose.model("apis", apisSchema)

apisModel.ExistePath = function (data, callback) {
    MyModel.find({ path: data.path }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar path", datos: error })
    })
}

apisModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    instancia.path = data.path
    instancia.metodo = data.metodo
    instancia.descripcion = data.descripcion
    instancia.tipo = data.tipo
    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

apisModel.CargarTodos = function (data, callback) {
    MyModel.find({}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar apis", datos: error })
    })
}

apisModel.CargarId = function (data, callback) {
    MyModel.find({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar api por id", datos: error })
    })
}

apisModel.Actualizar = function (data, callback) {
    MyModel.findOneAndUpdate({ _id: data._id }, { descripcion: data.descripcion, tipo: data.tipo }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al actualizar", datos: error })
    })
}

apisModel.Eliminar = function (data, callback) {
    MyModel.findOneAndDelete({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

module.exports.apisModel = apisModel
module.exports.MyModel = MyModel
