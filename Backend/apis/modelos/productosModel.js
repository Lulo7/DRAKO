var productosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var productosSchema = new Schema({
    codigo: String,
    marca: String,
    nombre: String,
    movimiento: String,
    calibre: String,
    material: String,
    pulso: String,
    caja: String,
    departamento: String,
    descripcion: String,
    cantidad: Number,
    precio: Number,
    descuento: Number,
    imagen: String,
    indicacion: String
})

const MyModel = mongoose.model("productos", productosSchema)

productosModel.ExisteCodigo = function (data, callback) {
    MyModel.find({ codigo: data.codigo }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

productosModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    instancia.codigo = data.codigo
    instancia.marca = data.marca
    instancia.nombre = data.nombre
    instancia.movimiento = data.movimiento
    instancia.calibre = data.calibre
    instancia.material = data.material
    instancia.pulso = data.pulso
    instancia.caja = data.caja
    instancia.departamento = data.departamento
    instancia.descripcion = data.descripcion
    instancia.cantidad = parseInt(data.cantidad)
    instancia.precio = parseInt(data.precio)
    instancia.descuento = parseInt(data.descuento)
    instancia.imagen = data.imagen
    instancia.indicacion = data.indicacion
    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

productosModel.CargarTodos = function (data, callback) {
    MyModel.find({},{}).sort({_id:-1}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

productosModel.CargarId = function (data, callback) {
    MyModel.find({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

productosModel.Actualizar = function (data, callback) {
    MyModel.findOneAndUpdate({ _id: data._id },
        {
            nombre: data.nombre,
            marca: data.marca,
            nombre: data.nombre,
            movimiento: data.movimiento,
            calibre: data.calibre,
            material: data.material,
            pulso: data.pulso,
            caja: data.caja,
            departamento: data.departamento,
            descripcion: data.descripcion,
            cantidad: parseInt(data.cantidad),
            precio: parseInt(data.precio),
            descuento: parseInt(data.descuento),
            imagen: data.imagen,
            indicacion: data.indicacion
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al actualizar", datos: error })
    })
}

productosModel.Eliminar = function (data, callback) {
    MyModel.findOneAndDelete({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

module.exports.productosModel = productosModel