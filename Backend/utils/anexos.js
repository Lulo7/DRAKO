var filesModel = require("../apis/modelos/filesModel.js").filesModel
var anexos = {}

anexos.subirArchivos = function(request, response, data, callback){

    if(data.carpeta == undefined || data.carpeta == null || data.carpeta == ""){
        return callback({state:false, mensaje:"el campo carpeta es obligatorio"})
    }

    if(data.nombre == undefined || data.nombre == null || data.nombre == ""){
        return callback({state:false, mensaje:"el campo nombre es obligatorio"})
    }

    if(data.extension == undefined || data.extension == null || data.extension == ""){
        return callback({state:false, mensaje:"el campo extension es obligatorio"})
    }

    if(data.size == undefined || data.size == null || data.size == ""){
        return callback({state:false, mensaje:"el campo size es obligatorio"})
    }

    if(data.extensiones == undefined || data.extensiones == null || data.extensiones == ""){
        return callback({state:false, mensaje:"el campo extensiones es obligatorio"})
    }

    if(data.single == undefined || data.single == null || data.single == ""){
        return callback({state:false, mensaje:"el campo single es obligatorio"})
    }
    
    var upload = multer({
        storage:multer.diskStorage({
            destination:(request, file, cb) => {
                cb(null, appRoot + data.carpeta)
            },
            filename:(request, file, cb) => {
                cb(null, data.nombre + "." + data.extension)
            }
        }),
        limits:{ fileSize: data.size}, //2Mb
        fileFilter:(request, file, cb) => {
            var ext = path.extname(file.originalname)
            var extensiones = data.extensiones
            if(extensiones.indexOf(ext) == -1){
                cb("Solo aceptamos los siguientes formatos" + "(" + extensiones.join("),(") + ")", null)
            }
            else{
                cb(null, true)
            }            
        }

    }).single(data.single)

    upload(request, response, function(err){
        if(err){
            console.log(err)
            return callback({state:false, error:err})
        }
        else{
            return callback({state:true, mensaje:"Archivo Cargado"})
        }
    })
}

anexos.uploadFiles = function(request, response, data, callback){

    if(data.carpeta == undefined || data.carpeta == null || data.carpeta == ""){
        return callback({state:false, mensaje:"el campo carpeta es obligatorio"})
    }

    if(data.nombre == undefined || data.nombre == null || data.nombre == ""){
        return callback({state:false, mensaje:"el campo nombre es obligatorio"})
    }

    if(data.size == undefined || data.size == null || data.size == ""){
        return callback({state:false, mensaje:"el campo size es obligatorio"})
    }

    if(data.extensiones == undefined || data.extensiones == null || data.extensiones == ""){
        return callback({state:false, mensaje:"el campo extensiones es obligatorio"})
    }

    if(data.single == undefined || data.single == null || data.single == ""){
        return callback({state:false, mensaje:"el campo single es obligatorio"})
    }
    
    var upload = multer({
        storage:multer.diskStorage({
            destination:(request, file, cb) => {
                cb(null, appRoot + data.carpeta)
            },
            filename:(request, file, cb) => {
                var ext = path.extname(file.originalname)
                var nombreCompleto = data.nombre + ext

                var midata = {
                    nombreOriginal: file.originalname,
                    nombre: nombreCompleto,
                    carpeta: data.carpeta,
                    usuario_id: request.session._id
                }
                filesModel.Guardar(midata, function(resModel){
                    cb(null, nombreCompleto)
                })
            }
        }),
        limits:{ fileSize: data.size}, //2Mb
        fileFilter:(request, file, cb) => {
            var ext = path.extname(file.originalname)
            var extensiones = data.extensiones
            if(extensiones.indexOf(ext) == -1){
                cb("Solo aceptamos los siguientes formatos" + "(" + extensiones.join("),(") + ")", null)
            }
            else{
                cb(null, true)
            }            
        }

    }).single(data.single)

    upload(request, response, function(err){
        if(err){
            console.log(err)
            return callback({state:false, error:err})
        }
        else{
            return callback({state:true, mensaje:"Archivo Cargado"})
        }
    })
}

module.exports.anexos = anexos

