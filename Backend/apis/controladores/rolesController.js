var rolesController = {}
var rolesModel = require("../modelos/rolesModel.js").rolesModel

rolesController.Guardar = function (request, response) {
    var data = {
        code: request.body.code,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (data.code == undefined || data.code == "" || data.code == null) {
        response.json({ state: false, mensaje: "El campo code es obligatorio" })
        return false
    }
    if (data.nombre == undefined || data.nombre == "" || data.nombre == null) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.estado == undefined || data.estado == "" || data.estado == null) {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    rolesModel.ExisteCode(data, function (respuesta) {
        if (respuesta.length == 0) {
            rolesModel.Guardar(data, function (creado) {
                response.json({ state: true, mensaje: "Elemento creado correctamente" })
            })
        }
        else {
            response.json({ state: false, mensaje: "El codigo de este elemento ya esta en uso" })
        }
    })
}

rolesController.CargarTodos = function (request, response) {
    rolesModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

rolesController.CargarId = function (request, response) {
    var data = {
        _id: request.params._id
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    rolesModel.CargarId(data, function (respuesta) {
        response.json(respuesta)
    })
}

rolesController.Actualizar = function (request, response) {
    var data = {
        _id: request.body._id,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (data.nombre == undefined || data.nombre == "" || data.nombre == null) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.estado == undefined || data.estado == "" || data.estado == null) {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    rolesModel.Actualizar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }   
    })

}

rolesController.Eliminar = function (request, response) {
     var data = {
        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

        rolesModel.Eliminar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }
        
    })

}

module.exports.rolesController = rolesController