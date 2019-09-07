const email = require('./email');
//const DB = require('./DBConexion');
const { GetDatos } = require('./DB');

// const _DB = new DB();

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

let Mensaje = {
    from: Cuenta,
    to: 'mariotuz1990@gmail.com',
    subject: 'Prueba Correo',
    html: '<h1>Mi mensaje!</h1><br/><span> Prueba mensaje en span</span><h2>Mario Tuz</h2>'
        //,
        // attachments: [{
        //     path: '/home/matrix/Descargas/Ejemplo.pdf'
        // }]
}


GetDatos('Hola').then(Datos => console.log(Datos))
    .catch(err => console.log(err));