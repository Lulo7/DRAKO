var esadmin = require("./middleware/esadmin.js").esadmin
var solologueado = require("./middleware/solologueado.js").solologueado

var usuariosController = require("./apis/controladores/usuariosController.js").usuariosController

router.post("/usuarios/Guardar", solologueado, esadmin, usuariosController.Guardar)
router.get("/usuarios/CargarTodos", usuariosController.CargarTodos)
router.get("/usuarios/CargarId/:_id", solologueado, esadmin, usuariosController.CargarId)
router.put("/usuarios/Actualizar", solologueado, esadmin, usuariosController.Actualizar)
router.delete("/usuarios/Eliminar", solologueado, esadmin, usuariosController.Eliminar)

router.post("/usuarios/Registrar", usuariosController.Registrar)
router.post("/usuarios/Login", usuariosController.Login)
router.get("/usuarios/Activar/:email/:codigo", usuariosController.Activar)
router.post("/usuarios/SolicitarCodigoRecuperacion", usuariosController.SolicitarCodigoRecuperacion)
router.post("/usuarios/recuperarPassword", usuariosController.recuperarPassword)
router.post("/usuarios/cambiarPassword", solologueado, usuariosController.cambiarPassword)

router.post("/usuarios/SubirAvatar", solologueado, usuariosController.SubirAvatar)
router.post("/usuarios/ActualizarMisDatos", solologueado, usuariosController.ActualizarMisDatos)
router.post("/usuarios/UploadFiles", solologueado, usuariosController.UploadFiles)
router.get("/usuarios/CargarMisArchivos", solologueado, usuariosController.CargarMisArchivos)
router.get("/usuarios/contadorsesiones", solologueado, usuariosController.contadorsesiones)


router.get("/usuarios/Estado", function(request, response){
    response.json(request.session)
})
router.post("/usuarios/Logout", function(request, response){
    request.session.destroy()
    response.json({state:false, mensaje:"Sesion Cerrada Correctamente"})
})

var rolesController = require("./apis/controladores/rolesController.js").rolesController

router.post("/roles/Guardar",solologueado, esadmin, rolesController.Guardar)
router.get("/roles/CargarTodos",solologueado, esadmin, rolesController.CargarTodos)
router.get("/roles/CargarId/:_id",solologueado, esadmin, rolesController.CargarId)
router.put("/roles/Actualizar",solologueado, esadmin, rolesController.Actualizar)
router.delete("/roles/Eliminar",solologueado, esadmin, rolesController.Eliminar)

var apisController = require("./apis/controladores/apisController.js").apisController

router.post("/apis/Guardar",solologueado, esadmin, apisController.Guardar)
router.get("/apis/CargarTodos",solologueado, esadmin, apisController.CargarTodos)
router.get("/apis/CargarId/:_id",solologueado, esadmin, apisController.CargarId)
router.put("/apis/Actualizar",solologueado, esadmin, apisController.Actualizar)
router.delete("/apis/Eliminar",solologueado, esadmin, apisController.Eliminar)

var asignacionController = require("./apis/controladores/asignacionController.js").asignacionController

router.post("/asignacion/Guardar",solologueado, esadmin, asignacionController.Guardar)
router.get("/asignacion/CargarTodos",solologueado, esadmin, asignacionController.CargarTodos)
router.get("/asignacion/CargarId/:_id",solologueado, esadmin, asignacionController.CargarId)
router.put("/asignacion/Actualizar",solologueado, esadmin, asignacionController.Actualizar)
router.delete("/asignacion/Eliminar",solologueado, esadmin, asignacionController.Eliminar)

var tagsController = require("./apis/controladores/tagsController.js").tagsController

router.post("/tags/Guardar", tagsController.Guardar)
router.get("/tags/CargarTodos", tagsController.CargarTodos)
router.get("/tags/CargarId/:_id", tagsController.CargarId)
router.put("/tags/Actualizar", tagsController.Actualizar)
router.delete("/tags/Eliminar", tagsController.Eliminar)

var productosController = require("./apis/controladores/productosController.js").productosController

router.post("/productos/Guardar",solologueado, esadmin, productosController.Guardar)
router.get("/productos/CargarTodos", productosController.CargarTodos)
router.get("/productos/CargarId/:_id", productosController.CargarId)
router.put("/productos/Actualizar",solologueado, esadmin, productosController.Actualizar)
router.delete("/productos/Eliminar",solologueado, esadmin, productosController.Eliminar)
router.post("/productos/SubirImagen/:nombre",solologueado, esadmin, productosController.SubirImagen)
router.post("/productos/AdicionarImagen/:_id",solologueado, esadmin, productosController.AdicionarImagen)
router.get("/productos/CargarImagenes/:_id", productosController.CargarImagenes)
router.delete("/productos/RemoverImagen",solologueado, esadmin, productosController.RemoverImagen)
router.get("/productos/DescargarListaProductosPdf", productosController.DescargarListaProductosPdf)
router.get("/productos/DescargarListaProductosXLS", productosController.DescargarListaProductosXLS)

var carritosController = require("./apis/controladores/carritosController.js").carritosController

router.post("/carritos/Guardar", carritosController.Guardar)
router.get("/carritos/CargarTodos", carritosController.CargarTodos)
router.get("/carritos/CargarId/:_id", carritosController.CargarId)
router.put("/carritos/Actualizar",solologueado, carritosController.Actualizar)
router.delete("/carritos/Eliminar", carritosController.Eliminar)
router.post("/carritos/MiCarrito/:_id", carritosController.MiCarrito)

var misdireccionesController = require("./apis/controladores/misdireccionesController.js").misdireccionesController

router.post("/misdirecciones/Guardar",solologueado, misdireccionesController.Guardar)
router.get("/misdirecciones/CargarTodos",solologueado, misdireccionesController.CargarTodos)
router.get("/misdirecciones/CargarId/:_id",solologueado, misdireccionesController.CargarId)
router.put("/misdirecciones/Actualizar",solologueado, misdireccionesController.Actualizar)
router.delete("/misdirecciones/Eliminar",solologueado, misdireccionesController.Eliminar)