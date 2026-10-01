var MyModel = require("../apis/modelos/asignacionModel.js").MyModel
module.exports = {
    esadmin: function(request, response, next){  
        
        
        const rol = request.session.nombrerol
        const path = request.route.path.toLocaleLowerCase()

        MyModel.find({nombrerol:rol, path:path}).then((doc) => {
            if(doc.length == 0){
                response.json({state:false, mensaje:"No tienes acceso a esta API" + path})
                return false
            }
            else{
                if(doc[0].permiso == "No"){
                    response.json({state:false, mensaje:"No tienes acceso a esta API" + path})
                return false
                }
                else{
                    next()
                }
            }
        })        
    }
}