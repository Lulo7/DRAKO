var usuariosController = {}
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var carritosModel = require("../modelos/carritosModel.js").carritosModel
var filesModel = require("../modelos/filesModel.js").filesModel
var turnstile = require("../../utils/turnsTile.js").turnstile

var anexos = require("../../utils/anexos.js").anexos

usuariosController.Guardar = function (request, response) {
    var data = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
        nombrerol: request.body.nombrerol,
        activa: "Si",
        codigo: ""
    }

    if (data.nombre == undefined || data.nombre == "" || data.nombre == null) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.email == undefined || data.email == "" || data.email == null) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (data.password == undefined || data.password == "" || data.password == null) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (data.nombrerol == undefined || data.nombrerol == "" || data.nombrerol == null) {
        response.json({ state: false, mensaje: "El campo nombrerol es obligatorio" })
        return false
    }

    data.password = SHA256(data.password + config.secret)

    usuariosModel.BuscarEmail(data, function (doc) {

        if (doc.length == 0) {
            usuariosModel.Guardar(data, function (respuesta) {
                response.json({ state: true, mensaje: "Usuario guardado correctamente" })
            })
        }
        else {
            response.json({ state: false, mensaje: "El correo ya existe" })
        }

    })
}

usuariosController.CargarTodos = function (request, response) {

    usuariosModel.CargarTodos(null, function (usuarios) {
        response.json(usuarios)
    })
}

usuariosController.CargarId = function (request, response) {

    var data = {
        _id: request.params._id
    }

    usuariosModel.CargarId(data, function (data) {
        response.json(data)
    })
}

usuariosController.Actualizar = function (request, response) {
    var data = {
        _id: request.body._id,
        nombre: request.body.nombre,
        nombrerol: request.body.nombrerol,
        activa: request.body.activa
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (data.nombre == undefined || data.nombre == "" || data.nombre == null) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.nombrerol == undefined || data.nombrerol == "" || data.nombrerol == null) {
        response.json({ state: false, mensaje: "El campo nombrerol es obligatorio" })
        return false
    }

    if (data.activa == undefined || data.activa == "" || data.activa == null) {
        response.json({ state: false, mensaje: "El campo activa es obligatorio" })
        return false
    }

    usuariosModel.ExisteId(data, function (existe) {

        if (existe.state == false) {
            response.status(500).json(existe)
            return false
        }

        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El _id no existe en la BD" })
        }
        else {
            usuariosModel.Actualizar(data, function (respuesta) {
                response.json({ state: true, mensaje: "Usuario Actualizado correctamente" })
            })
        }
    })
}

usuariosController.Eliminar = function (request, response) {
    var data = {

        _id: request.body._id,
    }

    if (data._id == undefined || data._id == "" || data._id == null) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    usuariosModel.ExisteId(data, function (existe) {
        if (existe.state == false) {
            response.status(500).json(existe)
            return false
        }

        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El _id no existe en la BD" })
        }
        else {
            usuariosModel.Eliminar(data, function (respuesta) {
                response.json({ state: true, mensaje: "Usuario Eliminado correctamente" })
            })
        }
    })
}


usuariosController.Login = async function (request, response) {
    var data = {
        email: request.body.email,
        password: request.body.password,
        token: request.body.token,
        idtracking: request.body.idtracking
    }

    if (data.email == undefined || data.email == "" || data.email == null) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (data.password == undefined || data.password == "" || data.password == null) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (data.token == undefined || data.token == "" || data.token == null) {
        response.json({ state: false, mensaje: "El campo token es obligatorio" })
        return false
    }

    data.password = SHA256(data.password + config.secret)

    var resTurnstile = await turnstile.verificar(data.token)
    if (resTurnstile.state == false) {
        response.json({ state: false, mensaje: resTurnstile.mensaje[0] })
        return false
    }

    usuariosModel.Login(data, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "Credenciales Incorrectas" })
        }
        else {

            if (existe[0].activa == "No") {
                response.json({ state: false, mensaje: "Debe verificar su corre electronico para Activar su cuenta e iniciar sesion" })
                return false
            }

            if (existe[0].activa == "Si") {
                request.session._id = existe[0]._id
                request.session.nombre = existe[0].nombre
                request.session.email = existe[0].email
                request.session.nombrerol = existe[0].nombrerol
                request.session.estado = existe[0].activa

                var datacar = {
                    idusuario: request.session._id,
                    idtracking: request.body.idtracking
                }

                carritosModel.asociaMailalTracking(datacar, function (res) {
                    response.json({ state: true, mensaje: "Bienvenido", datos: existe })
                    return true
                })


            }
        }
    })
}

usuariosController.Registrar = async function (request, response) {
    var data = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password,
        nombrerol: "Cliente",
        activa: "No",
        token: request.body.token
    }

    if (data.nombre == undefined || data.nombre == "" || data.nombre == null) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (data.email == undefined || data.email == "" || data.email == null) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (data.password == undefined || data.password == "" || data.password == null) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (data.token == undefined || data.token == "" || data.token == null) {
        response.json({ state: false, mensaje: "El campo token es obligatorio" })
        return false
    }

    data.password = SHA256(data.password + config.secret)

    var resTurnstile = await turnstile.verificar(data.token)
    if (resTurnstile.state == false) {
        response.json({ state: false, mensaje: resTurnstile.mensaje[0] })
        return false
    }

    usuariosModel.BuscarEmail(data, function (doc) {
        if (doc.length == 0) {
            var azar = "G-" + Math.floor(Math.random() * (99999 - 10000) + 10000);

            const transporter = nodemailer.createTransport({
                host: config.mail.host,
                port: config.mail.port,
                secure: false,
                requireTLS: true,
                auth: {
                    user: config.mail.user,
                    pass: config.mail.pass
                }
            })

            var frontendUrl = "http://localhost:4200";

            var linkActivacion =
                `${frontendUrl}/activarcuenta/${encodeURIComponent(data.email)}/${encodeURIComponent(azar)}`;

            var mailOptions = {
                from: config.mail.user,
                to: data.email,
                subject: "Activa tu cuenta DRAKO",
                html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activa tu cuenta DRAKO</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f5f2; font-family:Arial, Helvetica, sans-serif; color:#282622;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f5f2; padding:40px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border:1px solid #e8e4de; border-radius:8px; overflow:hidden;">

                    <tr>
                        <td align="center" style="padding:30px 24px; background-color:#282622;">
                            <div style="font-family:Georgia, 'Times New Roman', serif; color:#ffffff; font-size:30px; font-weight:bold; letter-spacing:4px;">
                                DRAKO
                            </div>
                            <div style="margin-top:8px; color:#d5b78e; font-size:11px; letter-spacing:2px;">
                                DETALLES QUE MARCAN
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:38px 40px 34px;">
                            <h1 style="margin:0 0 20px; color:#282622; font-family:Georgia, 'Times New Roman', serif; font-size:25px; font-weight:normal; text-align:center;">
                                ¡Bienvenido a DRAKO!
                            </h1>

                            <p style="margin:0 0 16px; color:#55514b; font-size:15px; line-height:1.7;">
                                Gracias por crear una cuenta. Para completar tu registro y comenzar a disfrutar de DRAKO, activa tu cuenta con el siguiente código:
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0;">
                                <tr>
                                    <td align="center" style="padding:22px 12px; background-color:#f6f5f2; border:1px solid #e8e4de; border-radius:6px;">
                                        <div style="margin-bottom:8px; color:#77716a; font-size:12px; letter-spacing:1px; text-transform:uppercase;">
                                            Código de activación
                                        </div>
                                        <div style="color:#8b693f; font-size:30px; font-weight:bold; letter-spacing:7px;">
                                            ${azar}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 24px; color:#55514b; font-size:15px; line-height:1.7; text-align:center;">
                                También puedes activar tu cuenta directamente desde el siguiente botón:
                            </p>

                            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 26px;">
                                <tr>
                                    <td align="center" bgcolor="#282622" style="border-radius:4px;">
                                        <a href="${linkActivacion}" style="display:inline-block; padding:14px 28px; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none;">
                                            ACTIVAR MI CUENTA
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 12px; color:#77716a; font-size:12px; line-height:1.6;">
                                Si el botón no funciona, copia y pega este enlace en tu navegador:
                            </p>
                            <p style="margin:0 0 24px; font-size:12px; line-height:1.6; overflow-wrap:anywhere;">
                                <a href="${linkActivacion}" style="color:#8b693f; text-decoration:underline;">${linkActivacion}</a>
                            </p>

                            <p style="margin:0; color:#77716a; font-size:13px; line-height:1.6;">
                                Si no creaste esta cuenta, puedes ignorar este correo.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:18px 24px; background-color:#f6f5f2; border-top:1px solid #e8e4de;">
                            <p style="margin:0; color:#817b73; font-size:11px; line-height:1.6;">
                                © 2026 DRAKO. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>
</html>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    response.json({ state: false, mensaje: "Se presento un error al enviar el correo electronico" })
                }
                else {
                    console.log(info)
                    data.codigo = azar
                    usuariosModel.Guardar(data, function (respuesta) {
                        response.json({ state: true, mensaje: "Usuario Guardado Correctamente" })
                    })
                }
            })
        }
        else {
            response.json({ state: false, mensaje: "El correo ya existe en la BD" })
        }
    })
}

usuariosController.Activar = function (request, response) {

    var data = {
        email: request.params.email,
        codigo: request.params.codigo
    }

    usuariosModel.Activar(data, function (respuesta) {
        if (respuesta == null) {
            response.json({ state: false, mensaje: "El codigo de Activacion esta Invalido" })
            return false
        }
        else {
            response.json({ state: true, mensaje: "La cuenta ya esta Activada correctamente, puede iniciar sesion" })
        }
    })
}

usuariosController.SolicitarCodigoRecuperacion = async function (request, response) {
    var data = {
        email: request.body.email,
        token: request.body.token
    }

    if (data.email == undefined || data.email == "" || data.email == null) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (data.token == undefined || data.token == "" || data.token == null) {
        response.json({ state: false, mensaje: "El campo token es obligatorio" })
        return false
    }

    var resTurnstile = await turnstile.verificar(data.token)
    if (resTurnstile.state == false) {
        response.json({ state: false, mensaje: resTurnstile.mensaje[0] })
        return false
    }

    usuariosModel.ultimaSolicitud(data, function (doc) {
        if (doc.length == 0) {
            response.json({ state: false, mensaje: "El email no es valido" })
        }
        else {
            var fechasolicitud = new Date(doc[0].fechasolicitudrec)
            var fechaactual = new Date()
            var diferencia = Math.floor((fechaactual - fechasolicitud) / 1000 / 60)

            if (diferencia < 5) {
                response.json({ state: false, mensaje: "No puedes generar mas codigos de recuperacion en" + diferencia + "minutos" })
            }
            else {
                var azar = "REC-" + Math.floor(Math.random() * (99999 - 10000) + 10000);

                const transporter = nodemailer.createTransport({
                    host: config.mail.host,
                    port: config.mail.port,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: config.mail.user,
                        pass: config.mail.pass
                    }
                })

                var frontendUrl = "http://localhost:4200";

                var linkRecuperacion =
                    `${frontendUrl}/crearcontrasena/${encodeURIComponent(data.email)}`;

                var mailOptions = {
                    from: config.mail.user,
                    to: data.email,
                    subject: "Código para recuperar tu contraseña DRAKO",
                    html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de contraseña DRAKO</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f5f2; font-family:Arial, Helvetica, sans-serif; color:#282622;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f5f2; padding:40px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border:1px solid #e8e4de; border-radius:8px; overflow:hidden;">

                    <tr>
                        <td align="center" style="padding:30px 24px; background-color:#282622;">
                            <div style="font-family:Georgia, 'Times New Roman', serif; color:#ffffff; font-size:30px; font-weight:bold; letter-spacing:4px;">
                                DRAKO
                            </div>
                            <div style="margin-top:8px; color:#d5b78e; font-size:11px; letter-spacing:2px;">
                                DETALLES QUE MARCAN
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:38px 40px 34px;">
                            <h1 style="margin:0 0 20px; color:#282622; font-family:Georgia, 'Times New Roman', serif; font-size:25px; font-weight:normal; text-align:center;">
                                Recupera tu contraseña
                            </h1>

                            <p style="margin:0 0 16px; color:#55514b; font-size:15px; line-height:1.7;">
                                Recibimos una solicitud para restablecer la contraseña de tu cuenta DRAKO. Utiliza el siguiente código para continuar:
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0;">
                                <tr>
                                    <td align="center" style="padding:22px 12px; background-color:#f6f5f2; border:1px solid #e8e4de; border-radius:6px;">
                                        <div style="margin-bottom:8px; color:#77716a; font-size:12px; letter-spacing:1px; text-transform:uppercase;">
                                            Código de recuperación
                                        </div>
                                        <div style="color:#8b693f; font-size:30px; font-weight:bold; letter-spacing:7px;">
                                            ${azar}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 24px; color:#55514b; font-size:15px; line-height:1.7; text-align:center;">
                                Ingresa el código en la página de recuperación para crear una nueva contraseña.
                            </p>

                            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 26px;">
                                <tr>
                                    <td align="center" bgcolor="#282622" style="border-radius:4px;">
                                        <a href="${linkRecuperacion}" style="display:inline-block; padding:14px 28px; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none;">
                                            RESTABLECER CONTRASEÑA
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 12px; color:#77716a; font-size:12px; line-height:1.6;">
                                Si el botón no funciona, copia y pega este enlace en tu navegador:
                            </p>
                            <p style="margin:0 0 24px; font-size:12px; line-height:1.6; overflow-wrap:anywhere;">
                                <a href="${linkRecuperacion}" style="color:#8b693f; text-decoration:underline;">${linkRecuperacion}</a>
                            </p>

                            <p style="margin:0; color:#77716a; font-size:13px; line-height:1.6;">
                                Si no solicitaste recuperar tu contraseña, ignora este correo. No compartas este código con nadie.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:18px 24px; background-color:#f6f5f2; border-top:1px solid #e8e4de;">
                            <p style="margin:0; color:#817b73; font-size:11px; line-height:1.6;">
                                © 2026 DRAKO. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>
</html>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        response.json({ state: false, mensaje: "Se presento un error al enviar el correo electronico" })
                    }
                    else {
                        console.log(info)
                        data.codigorec = azar

                        usuariosModel.GuardarCodigoRec(data, function (respuesta) {
                            response.json({ state: true, mensaje: "Hemos enviado un codigo de Recuperacion a tu correo" })
                        })
                    }
                })
            }
        }
    })



}

usuariosController.recuperarPassword = async function (request, response) {
    var data = {
        email: request.body.email,
        codigo: request.body.codigo,
        password: request.body.password,
        confirmar: request.body.confirmar,
        token: request.body.token
    }

    if (data.email == undefined || data.email == "" || data.email == null) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (data.codigo == undefined || data.codigo == "" || data.codigo == null) {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (data.password == undefined || data.password == "" || data.password == null) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (data.confirmar == undefined || data.confirmar == "" || data.confirmar == null) {
        response.json({ state: false, mensaje: "El campo confirmar es obligatorio" })
        return false
    }

    if (data.token == undefined || data.token == "" || data.token == null) {
        response.json({ state: false, mensaje: "El campo token es obligatorio" })
        return false
    }

    if (data.password != data.confirmar) {
        response.json({ state: false, mensaje: "El password y el confirmar no coinciden" })
    }

    var resTurnstile = await turnstile.verificar(data.token)
    if (resTurnstile.state == false) {
        response.json({ state: false, mensaje: resTurnstile.mensaje[0] })
        return false
    }

    data.password = SHA256(data.password + config.secret)
    usuariosModel.traerFechaRec(data, function (doc) {
        if (doc.length == 0) {
            response.json({ state: false, mensaje: "El email o el codigo de recuperacion no es valido" })
        }
        else {
            var fechasolicitud = new Date(doc[0].fechasolicitudrec)
            var fechaactual = new Date()
            var diferencia = Math.floor((fechaactual - fechasolicitud) / 1000 / 60)
            console.log(diferencia)
            if (diferencia > config.tiempopass) {
                response.json({ state: false, mensaje: "El token de recuperacion vencio hace" + diferencia + "Minutos, solicita un codigo nuevo" })
            }
            else {
                usuariosModel.recuperarPassword(data, function (respuesta) {
                    response.json({ state: true, mensaje: "Se ha restablecido el Password" })
                })
            }
        }
    })
}

usuariosController.cambiarPassword = function (request, response) {
    var data = {
        _id: request.session._id,
        passactual: request.body.passactual,
        password: request.body.password,
        confirm: request.body.confirm,
    }

    if (data.passactual == undefined || data.passactual == "" || data.passactual == null) {
        response.json({ state: false, mensaje: "El campo passactual es obligatorio" })
        return false
    }

    if (data.password == undefined || data.password == "" || data.password == null) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (data.confirm == undefined || data.confirm == "" || data.confirm == null) {
        response.json({ state: false, mensaje: "El campo confirm es obligatorio" })
        return false
    }

    if (data.confirm != data.password) {
        response.json({ state: false, mensaje: "La contraseña nueva y su confirm no coinciden" })
        return false
    }

    data.passactual = SHA256(data.passactual + config.secret)
    data.password = SHA256(data.password + config.secret)

    usuariosModel.cambiarPassword(data, function (mlpRes) {
        if (mlpRes.count != 0) {
            response.json({ state: true, mensaje: "Contraseña Actualizada" })
        }
        else {
            response.json({ state: false, mensaje: "No se pudo actualizar la contraseña" })
        }

    })
}


usuariosController.SubirAvatar = function (request, response) {

    var data = {
        carpeta: "/Avatares",
        nombre: request.session._id,
        extension: "png",
        size: 2 * 1024 * 1024,
        extensiones: [".png", ".jpeg", ".tif", ".jpg", ".jfif"],
        single: "file"
    }

    anexos.subirArchivos(request, response, data, function (respuesta) {
        response.json(respuesta)
    })
}

usuariosController.ActualizarMisDatos = function (request, response) {

    var data = {
        _id: request.session._id,
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

    usuariosModel.ActualizarMisDatos(data, function (res) {
        response.json({ state: true, mensaje: "Sus Datos se Actualizaron correctamente" })
    })

}

usuariosController.UploadFiles = function (request, response) {

    var nombrearchivo = crypto.randomUUID()

    var data = {
        carpeta: "/Documentos",
        nombre: nombrearchivo,
        size: 10 * 1024 * 1024,
        extensiones: [".pdf", ".doc", ".docx"],
        single: "file"
    }

    anexos.uploadFiles(request, response, data, function (respuesta) {
        response.json(respuesta)
    })
}

usuariosController.CargarMisArchivos = function (request, response) {

    var data = {
        usuario_id: request.session._id
    }
    filesModel.CargarMisArchivos(data, function (resModel) {
        response.json(resModel)
    })

}

usuariosController.contadorsesiones = function (request, response) {
    usuariosModel.contadorsesiones(null, function (res) {
        response.json(res)
    })
}

module.exports.usuariosController = usuariosController