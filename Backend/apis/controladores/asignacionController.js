var asignacionController = {}
var asignacionModel = require("../modelos/asignacionModel.js").asignacionModel

asignacionController.Guardar = function (request, response) {
    var data = {
        permiso: request.body.permiso,
        nombrerol: request.body.nombrerol,
        path: request.body.path
    }

    if (data.permiso == undefined || data.permiso == "" || data.permiso == null) {
        response.json({ state: false, mensaje: "El campo permiso es obligatorio" })
        return false
    }
    if (data.nombrerol == undefined || data.nombrerol == "" || data.nombrerol == null) {
        response.json({ state: false, mensaje: "El campo nombrerol es obligatorio" })
        return false
    }

    if (data.path == undefined || data.path == "" || data.path == null) {
        response.json({ state: false, mensaje: "El campo path es obligatorio" })
        return false
    }

    asignacionModel.ExisteRolyPath(data, function (respuesta) {
        if (respuesta.length == 0) {
            asignacionModel.Guardar(data, function (creado) {
                response.json({ state: true, mensaje: "Elemento creado correctamente" })
            })
        }
        else {
            response.json({ state: false, mensaje: "El path ya existe para este rol" })
        }
    })
}

asignacionController.CargarTodos = function (request, response) {
    asignacionModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

asignacionController.CargarId = function (request, response) {
    var data = {
        _id: request.params._id
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    asignacionModel.CargarId(data, function (respuesta) {
        response.json(respuesta)
    })
}

asignacionController.Actualizar = function (request, response) {
    var data = {
        _id: request.body._id,
        permiso: request.body.permiso
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (data.permiso == undefined || data.permiso == "" || data.permiso == null) {
        response.json({ state: false, mensaje: "El campo permiso es obligatorio" })
        return false
    }

    asignacionModel.Actualizar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }   
    })

}

asignacionController.Eliminar = function (request, response) {
     var data = {
        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

        asignacionModel.Eliminar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }
        
    })

}

module.exports.asignacionController = asignacionController