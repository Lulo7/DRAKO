var carritosModel = require("../modelos/carritosModel.js").carritosModel
var carritosController = {}

carritosController.Guardar = function(request, response){

    var data = {
        idproducto: request.body.idproducto,
        cantidad: request.body.cantidad,
        idtracking: request.body.idtracking,
        idusuario:request.session._id
    }

    if(data.idproducto == undefined || data.idproducto == null || data.idproducto == ""){
        response.json({state:false, mensaje:"El campo idproducto es obligatorio"})
        return false
    }

    if(data.cantidad == undefined || data.cantidad == null || data.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if(data.idtracking == undefined || data.idtracking == null || data.idtracking == ""){
        response.json({state:false, mensaje:"El campo idtracking es obligatorio"})
        return false
    }
    
    carritosModel.ExisteProducto(data, function(existe){
        if(existe.length == 0){
            carritosModel.Guardar(data, function(creado){
                response.json({state:true, mensaje:"Elemento creado con exito"})
                return true
            })
        }
        else{
            carritosModel.Actualizar(data, function(res){
                response.json({state:true, mensaje:"Elemento actualizado con exito"})
            })
        }
    })

}
carritosController.CargarTodos = function(request, response){
    carritosModel.CargarTodos(null, function(data){
        response.json(data)
    })
}
carritosController.MiCarrito = function(request, response){
    var data = {
        idtracking: request.body.idtracking,
        idusuario: request.session._id
    }

    if (data.idtracking == undefined || data.idtracking == "" || data.idtracking == null) {
        response.json({ state: false, mensaje: "El campo idtracking es obligatorio" })
        return false
    }

    carritosModel.MiCarrito(data, function(data){
        response.json(data)
    })

}
carritosController.CargarId = function(request, response){
    var data = {
        _id: request.params._id
    }

    carritosModel.CargarId(data, function(data){
        response.json(data)
    })
}
carritosController.Actualizar = function(request, response){
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

    carritosModel.Actualizar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }   
    })

}
carritosController.Eliminar = function(request, response){
     var data = {
        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

        carritosModel.Eliminar(data, function (act) {
        if(act == null){
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else{
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }
        
    })
}

module.exports.carritosController = carritosController