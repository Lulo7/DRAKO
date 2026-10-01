module.exports = {
    solologueado: function(request, response, next){
        if(request.session.nombrerol == undefined || request.session.nombrerol == "" ){
            response.json({state:false, mensaje:"Debe Iniciar Sesion para usar esta API"})
            return false
        }
        next()
    }
}