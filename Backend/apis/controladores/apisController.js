var apisController = {}
var apisModel = require("../modelos/apisModel.js").apisModel

apisController.Guardar = function (request, response) {
    var data = {
        path: request.body.path,
        metodo: request.body.metodo,
        descripcion: request.body.descripcion,
        tipo: request.body.tipo
    }

    if (data.path == undefined || data.path == "" || data.path == null) {
        response.json({ state: false, mensaje: "El campo path es obligatorio" })
        return false
    }
    if (data.metodo == undefined || data.metodo == "" || data.metodo == null) {
        response.json({ state: false, mensaje: "El campo metodo es obligatorio" })
        return false
    }

    if (data.tipo == undefined || data.tipo == "" || data.tipo == null) {
        response.json({ state: false, mensaje: "El campo tipo es obligatorio" })
        return false
    }

    if (data.descripcion == undefined) {
        data.descripcion = ""
    }

    apisModel.ExistePath(data, function (respuesta) {
        if (respuesta.length == 0) {
            apisModel.Guardar(data, function (creado) {
                response.json({ state: true, mensaje: "Elemento creado correctamente" })
            })
        }
        else {
            response.json({ state: false, mensaje: "El Path de este elemento ya esta en uso" })
        }
    })
}

apisController.CargarTodos = function (request, response) {
    apisModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

apisController.CargarId = function (request, response) {
    var data = {
        _id: request.params._id
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    apisModel.CargarId(data, function (respuesta) {
        response.json(respuesta)
    })
}

apisController.Actualizar = function (request, response) {
    var data = {
        _id: request.body._id,
        descripcion: request.body.descripcion,
        tipo: request.body.tipo
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (data.tipo == undefined || data.tipo == "" || data.tipo == null) {
        response.json({ state: false, mensaje: "El campo tipo es obligatorio" })
        return false
    }

    if (data.descripcion == undefined) {
        data.descripcion = ""
    }

    apisModel.Actualizar(data, function (act) {
        if (act == null) {
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else {
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }
    })

}

apisController.Eliminar = function (request, response) {
    var data = {
        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    apisModel.Eliminar(data, function (act) {
        if (act == null) {
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else {
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }

    })

}

module.exports.apisController = apisController