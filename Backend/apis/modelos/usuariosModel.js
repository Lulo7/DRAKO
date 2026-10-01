var usuariosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
    email: String,
    nombre: String,
    password: String,
    nombrerol: String,
    activa: String,
    codigoact: String,
    codigorec: String,
    fechacodigorec: Date,
    ultimocambiopass: Date,
    contador: Number
})

const MyModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.BuscarEmail = function (data, callback) {
    MyModel.find({ email: data.email }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar", datos: error })
    })
}

usuariosModel.Guardar = function (data, callback) {
    const instancia = new MyModel
    instancia.nombre = data.nombre
    instancia.email = data.email
    instancia.password = data.password
    instancia.nombrerol = data.nombrerol
    instancia.activa = data.activa
    instancia.codigoact = data.codigo

    instancia.save().then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

usuariosModel.CargarTodos = function (data, callback) {
    MyModel.find({}, { password: 0, __v: 0 }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al cargar", datos: error })
    })
}

usuariosModel.CargarId = function (data, callback) {
    MyModel.find({ _id: data._id }, { nombre: 1, email: 1, activa: 1, nombrerol: 1 }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar por id", datos: error })
    })
}

usuariosModel.Login = function (data, callback) {

    MyModel.findOneAndUpdate(
        {
            email: data.email,
            password: data.password
        },
        {
            $inc: {
                contador: 1
            }
        }
    ).then((doc) => {
        MyModel.find({ email: data.email, password: data.password }, { nombre: 1, email: 1, nombrerol: 1, activa: 1 }).then((doc) => {
            return callback(doc)
        }).catch((error) => {
            return callback({ state: false, mensaje: "error interno al iniciar sesion", datos: error })
        })
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al iniciar sesion", datos: error })
    })


}

usuariosModel.ExisteId = function (data, callback) {
    MyModel.find({ _id: data._id }, { password: 0, __v: 0 }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al buscar id", datos: error })
    })
}

usuariosModel.Actualizar = function (data, callback) {
    MyModel.findOneAndUpdate({ _id: data._id },
        {
            nombre: data.nombre,
            nombrerol: data.nombrerol,
            activa: data.activa
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al actualizar", datos: error })
    })
}

usuariosModel.Eliminar = function (data, callback) {
    MyModel.findOneAndDelete({ _id: data._id }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al eliminar", datos: error })
    })
}

usuariosModel.Activar = function (data, callback) {
    MyModel.findOneAndUpdate({ email: data.email, codigoact: data.codigo }, { activa: "Si" }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al activar", datos: error })
    })
}

usuariosModel.GuardarCodigoRec = function (data, callback) {
    MyModel.findOneAndUpdate({ email: data.email },
        {
            codigorec: data.codigorec,
            fechacodigorec: new Date()
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al guardar", datos: error })
    })
}

usuariosModel.recuperarPassword = function (data, callback) {
    MyModel.findOneAndUpdate({ email: data.email, codigorec: data.codigo },
        {
            password: data.password,
            codigorec: "*****x"
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}

usuariosModel.traerFechaRec = function (data, callback) {
    MyModel.find({ email: data.email, codigorec: data.codigo }, { fechacodigorec: 1, _id: 0 }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}

usuariosModel.ultimaSolicitud = function (data, callback) {
    MyModel.find({ email: data.email }, { fechacodigorec: 1, _id: 0 }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}

usuariosModel.contadorsesiones = function (data, callback) {
    MyModel.find({}, { email: 1, contador: 1 }).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al contar sesiones", datos: error })
    })
}

usuariosModel.ActualizarMisDatos = function (data, callback) {
    MyModel.findOneAndUpdate({ _id: data._id },
        {
            nombre: data.nombre
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno al actualizar", datos: error })
    })
}

usuariosModel.cambiarPassword = function (data, callback) {
    MyModel.updateOne({ _id: data._id, password: data.passactual },
        {
            password: data.password,
            ultimocambiopass: new Date()
        }
    ).then((doc) => {
        return callback(doc)
    }).catch((error) => {
        return callback({ state: false, mensaje: "error interno", datos: error })
    })
}

module.exports.usuariosModel = usuariosModel