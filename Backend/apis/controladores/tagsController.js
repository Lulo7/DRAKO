var tagsModel = require("../modelos/tagsModel.js").tagsModel
var tagsController = {}

tagsController.Guardar = function(request, response){

    var data = {
        codigo: request.body.codigo,
        nombre: request.body.nombre
    }

    if(data.codigo == undefined || data.codigo == null || data.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    if(data.nombre == undefined || data.nombre == null || data.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    
    tagsModel.ExisteCodigo(data, function(existe){
        if(existe.length == 0){
            tagsModel.Guardar(data, function(creado){
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
tagsController.CargarTodos = function(request, response){
    tagsModel.CargarTodos(null, function(data){
        response.json(data)
    })

}
tagsController.CargarId = function(request, response){
    var data = {
        _id: request.params._id
    }

    tagsModel.CargarId(data, function(data){
        response.json(data)
    })
}
tagsController.Actualizar = function(request, response){
    var data = {
        _id: request.body._id,
        nombre: request.body.nombre
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (data.nombre == undefined || data.nombre == "" || data.nombre == null) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    tagsModel.Actualizar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }   
    })

}
tagsController.Eliminar = function(request, response){
     var data = {
        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

        tagsModel.Eliminar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }
        
    })
}

module.exports.tagsController = tagsController