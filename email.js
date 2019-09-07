const nodemailer = require('nodemailer');

var ObjEmail;

class Email{    

    constructor(_Config){

        ObjEmail = nodemailer.createTransport(_Config);

    }

    enviarCorreo(Mensaje){

            ObjEmail.sendMail(Mensaje, function(errores){

                if(errores){
                    console.log('Error al enviar...' + errores);
                }

                console.log('Enviado...');
            });

    }

}

module.exports = Email;
