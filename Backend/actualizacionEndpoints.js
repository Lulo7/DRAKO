var MyModel = require("./apis/modelos/apisModel.js").MyModel

var misendpoints = listendpoints(router)
misendpoints.forEach(item => {
    var path = item.path.toLowerCase()
    var metodo = item.methods[0].toLowerCase()

    MyModel.find({path:path, metodo:metodo}).countDocuments().then((doc) =>{
        if(doc == 0){
            const instancia = new MyModel
            instancia.path = path
            instancia.metodo = metodo
            instancia.descripcion = path
            instancia.tipo = "Privado"
            instancia.save().then((doc) => {
                console.log("Se agrego una Api nueva")
            })
        }
    })
});