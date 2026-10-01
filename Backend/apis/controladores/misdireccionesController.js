var misdireccionesModel = require("../modelos/misdireccionesModel.js").misdireccionesModel
var misdireccionesController = {}

misdireccionesController.Guardar = function(request, response){

    var data = {
        usuarioId: request.session._id,
        codigo: request.body.codigo,
        departamento: request.body.departamento,
        municipio: request.body.municipio,
        codigopostal: request.body.codigopostal,
        alias: request.body.alias,
        direccion: request.body.direccion
    }
    
    if(data.codigo == undefined || data.codigo == null || data.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }
    
    if(data.departamento == undefined || data.departamento == null || data.departamento == ""){
        response.json({state:false, mensaje:"El campo departamento es obligatorio"})
        return false
    }
    
    if(data.municipio == undefined || data.municipio == null || data.municipio == ""){
        response.json({state:false, mensaje:"El campo municipio es obligatorio"})
        return false
    }

    if(data.codigopostal == undefined || data.codigopostal == null || data.codigopostal == ""){
        response.json({state:false, mensaje:"El campo codigopostal es obligatorio"})
        return false
    }

    if(data.direccion == undefined || data.direccion == null || data.direccion == ""){
        response.json({state:false, mensaje:"El campo direccion es obligatorio"})
        return false
    }

    if(data.alias == undefined || data.alias == null || data.alias == ""){
        response.json({state:false, mensaje:"El campo alias es obligatorio"})
        return false
    }
    
    misdireccionesModel.ExisteCodigo(data, function(existe){
        if(existe.length == 0){
            misdireccionesModel.Guardar(data, function(creado){
                response.json({state:true, mensaje:"Elemento creado con exito"})
                return true
            })
        }
        else{
            response.json({state:false, mensaje:"El codigo de este elemento ya existe, intente con otro"})
            return false
        }
    })

}

misdireccionesController.CargarTodos = function(request, response){
    var datos = {
        usuarioId:request.session._id
    }
    misdireccionesModel.CargarTodos(datos, function(data){
        response.json(data)
    })

}

misdireccionesController.CargarId = function(request, response){
    var data = {
        _id: request.params._id,
        usuarioId: request.session._id
    }

    misdireccionesModel.CargarId(data, function(data){
        response.json(data)
    })
}

misdireccionesController.Actualizar = function(request, response){

    var data = {
        _id: request.body._id,
        usuarioId: request.session._id,
        departamento: request.body.departamento,
        municipio: request.body.municipio,
        codigopostal: request.body.codigopostal,
        alias: request.body.alias,
        direccion: request.body.direccion
    }
    
    if(data.departamento == undefined || data.departamento == null || data.departamento == ""){
        response.json({state:false, mensaje:"El campo departamento es obligatorio"})
        return false
    }
    
    if(data.municipio == undefined || data.municipio == null || data.municipio == ""){
        response.json({state:false, mensaje:"El campo municipio es obligatorio"})
        return false
    }

    if(data.codigopostal == undefined || data.codigopostal == null || data.codigopostal == ""){
        response.json({state:false, mensaje:"El campo codigopostal es obligatorio"})
        return false
    }

    if(data.direccion == undefined || data.direccion == null || data.direccion == ""){
        response.json({state:false, mensaje:"El campo direccion es obligatorio"})
        return false
    }

    if(data.alias == undefined || data.alias == null || data.alias == ""){
        response.json({state:false, mensaje:"El campo alias es obligatorio"})
        return false
    }

    misdireccionesModel.Actualizar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }   
    })

}

misdireccionesController.Eliminar = function(request, response){
     var data = {
        _id: request.body._id,
        usuarioId: request.session._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

        misdireccionesModel.Eliminar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }
        
    })
}

module.exports.misdireccionesController = misdireccionesController