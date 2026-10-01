var anexosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var anexosSchema = new Schema({
    producto_id: String,
    nombre: String
})

const MyModel = mongoose.model("anexos", anexosSchema)

anexosModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    instancia.producto_id = data._id
    instancia.nombre = data.nombre

    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

anexosModel.CargarImagenes = function (data, callback) {
    MyModel.find({producto_id:data._id}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}

anexosModel.RemoverImagen = function (data, callback) {
    MyModel.findOneAndDelete({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}

module.exports.anexosModel = anexosModel