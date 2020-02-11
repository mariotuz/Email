const email = require('./email');
const { GetDatos } = require('./DB');
const sleep = require('system-sleep');
const colors = require('colors');

var Cuenta = 'gesa@playaresorts.com';
const _Email = new email({
    host: 'smtp.office365.com', // Office 365 server
    port: 587, // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    auth: {
        user: Cuenta,
        pass: '.Ene29Segunda'
    },
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true
});

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

ConstruyeCorreos = function(Datos) {

    const Previo = '<p>    Buen dia,</p><p></p>Este es un correo de prueba, donde el grupo puede presentar los siguientes status:</p><ul>    <li>MISSING ROOMING LIST: El grupo ya debio haber mandado el rooming list.</li>    <li>DEPOSIT_DUE: Sin pago inicial realizado despues de la fecha acordada.</li>    <li>COMPLEMENT DEPOSIT DUE: Se ha hecho parte del pago inicial, pero si el grupo incrementa mas de un 20% su ocupacion respecto al numero de cuartos en el contrato firmado, este debe reflejar el saldo restante.</li>    <li>FINAL PAYMENT DUE: El pago final no se ha realizado en la fecha acordada.</li></ul><p>Por favor podrian confirmarme al correo it.revenue@playaresorts.com si el correo es correcto.</p><p>A continuacion se muestra el tipo de correo correspondiente al grupo.</p>';
    const Pie = '<br><br><br> <b>***** Please, DO NOT answer this message, it is an automatic sending  ****</b>';
    for (let i = 0; i < Datos.length; i++) {
        const mail = Datos[i];
        let Mensaje = {
            from: Cuenta,
            to: mail.Titular /*'mtuz@playaresorts.com' */ ,
            subject: mail.Subject,
            //            html: Previo + '<p>' + mail.Subject + '</p>' + mail.Body,
            html: mail.Body + Pie,
            bcc: mail.BCC
                //,
                // attachments: [{
                //     path: '/home/matrix/Descargas/Ejemplo.pdf'
                // }]
        }

        let Info = { IdEmail: mail.Id_Email, No: i + 1, Total: Datos.length }
        _Email.enviarCorreo(Mensaje, Info);
        sleep(3000);
    }
}

var Minutos = 2;

console.log('===== Envio de correos GESA ====='.green);

while (true) {
    console.log('===== Ciclo reiniciado ====='.blue);
    console.log('===== ' + ((new Date().addHours(-5)).toUTCString()) + ' ====='.blue);

    GetDatos('').then(Datos => {
        ConstruyeCorreos(Datos)
    }).catch(err => console.log(err));

    sleep(Minutos * 60 * 1000);
}