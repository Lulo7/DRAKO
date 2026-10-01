var productosModel = require("../modelos/productosModel.js").productosModel
var anexos = require("../../utils/anexos.js").anexos
var anexosModel = require("../modelos/anexosModel.js").anexosModel
var productosController = {}

const PDFDoc = require("pdfkit")
const fs = require("fs")

productosController.Guardar = function (request, response) {

    var data = {
        codigo: request.body.codigo,
        marca: request.body.marca,
        nombre: request.body.nombre,
        movimiento: request.body.movimiento,
        calibre: request.body.calibre,
        material: request.body.material,
        pulso: request.body.pulso,
        caja: request.body.caja,
        departamento: request.body.departamento,
        descripcion: request.body.descripcion,
        cantidad: request.body.cantidad,
        precio: request.body.precio,
        descuento: request.body.descuento,
        imagen: request.body.imagen,
        indicacion: request.body.indicacion
    }

    if (data.codigo == undefined || data.codigo == null || data.codigo == "") {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (data.marca == undefined || data.marca == null || data.marca == "") {
        response.json({ state: false, mensaje: "El campo marca es obligatorio" })
        return false
    }

    if (data.nombre == undefined || data.nombre == null || data.nombre == "") {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.movimiento == undefined || data.movimiento == null || data.movimiento == "") {
        response.json({ state: false, mensaje: "El campo movimiento es obligatorio" })
        return false
    }

    if (data.calibre == undefined || data.calibre == null || data.calibre == "") {
        response.json({ state: false, mensaje: "El campo calibre es obligatorio" })
        return false
    }

    if (data.material == undefined || data.material == null || data.material == "") {
        response.json({ state: false, mensaje: "El campo material es obligatorio" })
        return false
    }

    if (data.pulso == undefined || data.pulso == null || data.pulso == "") {
        response.json({ state: false, mensaje: "El campo pulso es obligatorio" })
        return false
    }

    if (data.caja == undefined || data.caja == null || data.caja == "") {
        response.json({ state: false, mensaje: "El campo caja es obligatorio" })
        return false
    }

    if (data.departamento == undefined || data.departamento == null || data.departamento == "") {
        response.json({ state: false, mensaje: "El campo departamento es obligatorio" })
        return false
    }

    if (data.cantidad == undefined || data.cantidad == null || data.cantidad == "") {
        response.json({ state: false, mensaje: "El campo cantidad es obligatorio" })
        return false
    }

    if (data.precio == undefined || data.precio == null || data.precio == "") {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }

    if (data.descuento == undefined || data.descuento == null) {
        response.json({ state: false, mensaje: "El campo descuento es obligatorio" })
        return false
    }

    if (data.imagen == undefined || data.imagen == null) {
        response.json({ state: false, mensaje: "El campo imagen es obligatorio" })
        return false
    }

    if (data.indicacion == undefined || data.indicacion == null || data.indicacion == "") {
        response.json({ state: false, mensaje: "El campo indicacion es obligatorio" })
        return false
    }

    if (data.descripcion == undefined || data.descripcion == null) {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    productosModel.ExisteCodigo(data, function (existe) {
        if (existe.length == 0) {
            productosModel.Guardar(data, function (creado) {
                response.json({ state: true, mensaje: "Elemento creado con exito" })
                return true
            })
        }
        else {
            response.json({ state: false, mensaje: "El codigo de este elemento ya existe, intente con otro" })
            return false
        }
    })

}
productosController.CargarTodos = function (request, response) {
    productosModel.CargarTodos(null, function (data) {
        response.json(data)
    })
}
productosController.CargarId = function (request, response) {
    var data = {
        _id: request.params._id
    }

    productosModel.CargarId(data, function (data) {
        response.json(data)
    })
}
productosController.Actualizar = function (request, response) {
    var data = {
        _id: request.body._id,
        marca: request.body.marca,
        nombre: request.body.nombre,
        movimiento: request.body.movimiento,
        calibre: request.body.calibre,
        material: request.body.material,
        pulso: request.body.pulso,
        caja: request.body.caja,
        departamento: request.body.departamento,
        descripcion: request.body.descripcion,
        cantidad: request.body.cantidad,
        precio: request.body.precio,
        descuento: request.body.descuento,
        imagen: request.body.imagen,
        indicacion: request.body.indicacion
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (data.marca == undefined || data.marca == null || data.marca == "") {
        response.json({ state: false, mensaje: "El campo marca es obligatorio" })
        return false
    }

    if (data.nombre == undefined || data.nombre == null || data.nombre == "") {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.movimiento == undefined || data.movimiento == null || data.movimiento == "") {
        response.json({ state: false, mensaje: "El campo movimiento es obligatorio" })
        return false
    }

    if (data.calibre == undefined || data.calibre == null || data.calibre == "") {
        response.json({ state: false, mensaje: "El campo calibre es obligatorio" })
        return false
    }

    if (data.material == undefined || data.material == null || data.material == "") {
        response.json({ state: false, mensaje: "El campo material es obligatorio" })
        return false
    }

    if (data.pulso == undefined || data.pulso == null || data.pulso == "") {
        response.json({ state: false, mensaje: "El campo pulso es obligatorio" })
        return false
    }

    if (data.caja == undefined || data.caja == null || data.caja == "") {
        response.json({ state: false, mensaje: "El campo caja es obligatorio" })
        return false
    }

    if (data.departamento == undefined || data.departamento == null || data.departamento == "") {
        response.json({ state: false, mensaje: "El campo departamento es obligatorio" })
        return false
    }

    if (data.cantidad == undefined || data.cantidad == null || data.cantidad == "") {
        response.json({ state: false, mensaje: "El campo cantidad es obligatorio" })
        return false
    }

    if (data.precio == undefined || data.precio == null || data.precio == "") {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }

    if (data.descuento == undefined || data.descuento == null || data.descuento == "") {
        response.json({ state: false, mensaje: "El campo descuento es obligatorio" })
        return false
    }

    if (data.imagen == undefined || data.imagen == null) {
        response.json({ state: false, mensaje: "El campo imagen es obligatorio" })
        return false
    }

    if (data.indicacion == undefined || data.indicacion == null || data.indicacion == "") {
        response.json({ state: false, mensaje: "El campo indicacion es obligatorio" })
        return false
    }

    if (data.descripcion == undefined || data.descripcion == null) {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    productosModel.Actualizar(data, function (act) {
        if (act == null) {
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else {
            response.json({ state: true, mensaje: "Elemento actualizado correctamente" })
        }
    })

}
productosController.Eliminar = function (request, response) {
    var data = {
        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    productosModel.Eliminar(data, function (act) {
        if (act == null) {
            response.json({ state: false, mensaje: "El Id de este elemento no existe en la BD" })
        }
        else {
            response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
        }

    })
}

productosController.SubirImagen = function (request, response) {
    var data = {
        carpeta: "/Productos",
        nombre: request.params.nombre,
        extension: "png",
        size: 2 * 1024 * 1024,
        extensiones: [".png", ".jpeg", ".tif", ".jpg", ".jfif"],
        single: "file"
    }

    anexos.subirArchivos(request, response, data, function (respuesta) {
        response.json(respuesta)
    })
}
productosController.AdicionarImagen = function (request, response) {
    var post = {
        _id: request.params._id,
        nombre: crypto.randomUUID()
    }

    anexosModel.Guardar(post, function (res) {
        var data = {
            carpeta: "/Relojes",
            nombre: post.nombre,
            extension: "png",
            size: 2 * 1024 * 1024,
            extensiones: [".png", ".jpeg", ".tif", ".jpg", ".jfif"],
            single: "file"
        }

        anexos.subirArchivos(request, response, data, function (res) {
            response.json(res)
        })
    })

}
productosController.CargarImagenes = function (request, response) {
    var data = {
        _id: request.params._id
    }

    anexosModel.CargarImagenes(data, function (res) {
        response.json(res)
    })
}
productosController.RemoverImagen = function (request, response) {
    var data = {
        _id: request.body._id
    }

    if (data._id == undefined || data._id == null || data._id == "") {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    anexosModel.RemoverImagen(data, function (res) {
        fs.unlink(appRoot + '/Relojes/' + res.nombre + '.png', (error) => {
            if (error) {
                console.log(error)
                response.json(error)
            }
            else {
                response.json({ state: true, mensaje: "Elemento eliminado correctamente" })
            }
        })
    })
}
productosController.DescargarListaProductosPdf = function (request, response) {

    const doc = new PDFDoc({
        layout: 'portrait',
        size: 'A4'
    })

    const nombrearchivo = crypto.randomUUID() + "_productos.pdf"
    const escritura = fs.createWriteStream(nombrearchivo)

    const filasPorPagina = 28
    const inicio = 120
    const separacion = 20
    const titulo = "Lista Productos"
    let pagina = 1
    let fila = 0

    const encabezado = function () {
        doc.fontSize(20).text(titulo, 250, 50, { lineBreak: false })
        doc.fontSize(20).text("Codigo", 50, 100, { lineBreak: false })
        doc.fontSize(20).text("Nombre", 300, 100, { lineBreak: false })
        doc.fontSize(10).text("Pagina: " + pagina, 500, 20, { lineBreak: false })
        doc.fontSize(10).text("www.drako.com", 250, 700, { lineBreak: false })
        doc.fontSize(10).text(String(new Date().toLocaleString()), 220, 715, { lineBreak: false })
    }

    escritura.on("finish", function () {
        response.download(nombrearchivo, function (error) {
            if (error) {
                console.log(error)
            }
            fs.unlink(nombrearchivo, function () { })
        })
    })

    escritura.on("error", function (error) {
        console.log(error)
        if (!response.headersSent) {
            response.json({ state: false, mensaje: "No se pudo generar el archivo PDF" })
        }
    })

    doc.pipe(escritura)

    productosModel.CargarTodos(null, function (data) {
        const registros = Array.isArray(data) ? data : []

        encabezado()

        registros.forEach(function (item) {
            if (fila >= filasPorPagina) {
                pagina++
                fila = 0
                doc.addPage()
                encabezado()
            }

            const posicion = inicio + (fila * separacion)
            const codigo = item != null && item.codigo != undefined ? String(item.codigo) : ""
            const nombre = item != null && item.nombre != undefined ? String(item.nombre) : ""

            doc.fontSize(10).text(codigo, 50, posicion, { lineBreak: false })
            doc.fontSize(10).text(nombre, 300, posicion, { lineBreak: false })
            fila++
        })

        doc.end()
    })
}
productosController.DescargarListaProductosXLS = function(request, response){

    var nombrearchivo = crypto.randomUUID() + "_productos.xlsx"

    productosModel.CargarTodos(null,function(data){
        var json =  data.map(({_doc}) => {
            const {__v, ...rest} = _doc
            return rest
        })

        var xls = json2xls(json)

        fs.writeFileSync(nombrearchivo,xls, "binary")
        response.download(nombrearchivo, function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log("Archivo Descargado")
                fs.unlinkSync(nombrearchivo)
            }
        })
    })
}

module.exports.productosController = productosController