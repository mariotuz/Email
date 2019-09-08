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
        pass: 'olimp123.'
    },
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true
});

ConstruyeCorreos = function(Datos) {

    for (let i = 0; i < Datos.length; i++) {
        const mail = Datos[i];
        let Mensaje = {
            from: Cuenta,
            to: 'mariotuz1990@gmail.com',
            subject: mail.Subject,
            html: mail.Body
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

    GetDatos('').then(Datos => {
        ConstruyeCorreos(Datos)
    }).catch(err => console.log(err));

    sleep(2 * 60 * 1000);
}