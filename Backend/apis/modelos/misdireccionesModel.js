var misdireccionesModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var misdireccionesSchema = new Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
    codigo: String,
    departamento: String,
    municipio: String,
    codigopostal: String,
    alias: String,
    direccion: String
})

const MyModel = mongoose.model("misdirecciones", misdireccionesSchema)

misdireccionesModel.ExisteCodigo = function (data, callback) {
    MyModel.find({ codigo: data.codigo , usuarioId:data.usuarioId}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

misdireccionesModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    instancia.usuarioId = data.usuarioId
    instancia.codigo = data.codigo
    instancia.departamento = data.departamento
    instancia.municipio = data.municipio
    instancia.codigopostal = data.codigopostal
    instancia.direccion = data.direccion
    instancia.alias = data.alias
    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

misdireccionesModel.CargarTodos = function (data, callback) {
    MyModel.find({usuarioId:data.usuarioId}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

misdireccionesModel.CargarId = function (data, callback) {
    MyModel.find({ _id: data._id, usuarioId: data.usuarioId }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

misdireccionesModel.Actualizar = function (data, callback) {
    MyModel.findOneAndUpdate({ _id: data._id, usuarioId:data.usuarioId},
        {
            departamento: data.departamento,
            municipio: data.municipio,
            codigopostal: data.codigopostal,
            direccion: data.direccion,
            alias: data.alias,
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al actualizar", datos: error })
    })
}

misdireccionesModel.Eliminar = function (data, callback) {
    MyModel.findOneAndDelete({ _id: data._id, usuarioId: data.usuarioId }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

module.exports.misdireccionesModel = misdireccionesModel