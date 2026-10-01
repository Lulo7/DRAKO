var config = {
    bd:{},
    mail:{},
    turnstile:{}
}

config.empresa = "DRAKO"
config.urlreal = "http://localhost:3001"
config.tiempopass = 5

config.bd.ip = "127.0.0.1"
config.bd.puerto = "27017"
config.bd.nombre = "DRAKO"

config.mail.host = "smtp.gmail.com"
config.mail.port = 587
config.mail.user = "tu-correo@gmail.com"
config.mail.pass = "tu-contraseña-de-aplicacion"

config.whitelist = [
    "http://localhost:4200"
]

config.secret = "genera-un-secret-largo-aqui"

config.puerto = 3001

config.expiracion = 1000 * 60 * 30

config.turnstile.secret = "tu-secret-de-turnstile"
config.turnstile.whitelist = ["localhost"]
config.turnstile.tokenTest = ["pocoyo"]



module.exports.config = config
