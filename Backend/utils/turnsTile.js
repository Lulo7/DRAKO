var turnstile = {}

turnstile.verificar = async function (token) {

    if (config.turnstile.tokenTest.indexOf(token) === -1) {
        //verificar contra cloudflare
        const respuestatoken = await axios.post("https://challenges.cloudflare.com/turnstile/v0/siteverify",
            new URLSearchParams({
                secret: config.turnstile.secret,
                response: token
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        console.log(respuestatoken)
        if (config.turnstile.whitelist.indexOf(respuestatoken.data.hostname) === -1) {
            return { state: false, mensaje: ["Origen de la captcha no autorizado " + respuestatoken.data.hostname] }
        }

        if (respuestatoken.data.success == true) {
            return { state: true, mensaje: "Token correcto" }
        }

        if (respuestatoken.data.success == false) {
            return { state: false, mensaje: respuestatoken.data["error-codes"] }
        }
    }
    else{
        return {state:true, mensaje:"Token Privilegiado"}
    }

}

module.exports.turnstile = turnstile