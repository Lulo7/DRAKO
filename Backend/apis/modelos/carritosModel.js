var carritosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

var carritosSchema = new Schema({
    idproducto: { type: mongoose.Schema.Types.ObjectId, ref: "productos" },
    idusuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
    cantidad: Number,
    idtracking: String
})

const MyModel = mongoose.model("carritos", carritosSchema)

carritosModel.ExisteProducto = function (data, callback) {
    MyModel.find({ idproducto: data.idproducto, idtracking: data.idtracking }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

carritosModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    if (data.idusuario != undefined) {
        instancia.idusuario = data.idusuario
    }
    instancia.idproducto = data.idproducto
    instancia.cantidad = data.cantidad
    instancia.idtracking = data.idtracking

    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

carritosModel.MiCarrito = function (data, callback) {
    MyModel.aggregate([
        {
            $match: {
                $or: [
                    { idtracking:data.idtracking },
                    { idusuario:new ObjectId(data.idusuario) }
                ]
            }
        },
        {
            $lookup: {
                from: "productos",
                localField: "idproducto",
                foreignField: "_id",
                as: "productos"
            }
        },
        { $unwind: "$productos" },
        {
            $project: {
                _id: 1,
                cantidad: 1,
                idproducto:1,
                codigo: "$productos.codigo",
                marca: "$productos.marca",
                nombre: "$productos.nombre",
                precio: "$productos.precio",
                descuento: "$productos.descuento"
            }
        }

    ]).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar el carrito", datos: error })
    })
}

carritosModel.CargarTodos = function (data, callback) {
    MyModel.find({}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

carritosModel.CargarId = function (data, callback) {
    MyModel.find({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

carritosModel.Actualizar = function (data, callback) {
    MyModel.findOneAndUpdate({ idproducto: data.idproducto, idtracking: data.idtracking },
        {
            cantidad: data.cantidad
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al actualizar", datos: error })
    })
}

carritosModel.Eliminar = function (data, callback) {
    MyModel.findOneAndDelete({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

carritosModel.asociaMailalTracking = function (data, callback){
    MyModel.updateMany({idtracking:data.idtracking}, {idusuario:data.idusuario}).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}


module.exports.carritosModel = carritosModel