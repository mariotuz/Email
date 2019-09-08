const nodemailer = require('nodemailer');
const { GetDatos, ActualizarStatus } = require('./DB');

var ObjEmail;

class Email {

    constructor(_Config) {

        ObjEmail = nodemailer.createTransport(_Config);

    }

    enviarCorreo(Mensaje, Info) {

        ObjEmail.sendMail(Mensaje, function(errores) {

            if (errores) {
                console.log(('Error al enviar...' + errores).red);
                ActualizarStatus({ IdEmail: Info.IdEmail, Comentarios: errores }).then(Datos => {;
                }).catch(err => console.log(err.red));
            } else {

                console.log(('Enviando...' + Info.No + ' de ' + Info.Total).green);
                ActualizarStatus({ IdEmail: Info.IdEmail, Comentarios: 'Ok' }).then(Datos => {;
                }).catch(err => console.log(err.red));
            }
        });

    }

}

module.exports = Email;