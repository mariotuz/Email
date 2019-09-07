const email = require('./email');


const _Email = new email({
                            service: 'hotmail',
                            auth:{
                                    user: 'miii@hhh.com',
                                    pass: '*****'
                            }
                        });

let Mensaje = {
    from: 'miii@hhh.com',
    to: 'mariotuz1990@gmail.com',
    subject: 'Prueba Correo',
    html: '<h1>Mi mensaje!</h1><br/><span> Prueba mensaje en span</span><h2>Mario Tuz</h2>',
    attachments: [{
        path: '/home/matrix/Descargas/Ejemplo.pdf'
    }]
}

_Email.enviarCorreo(Mensaje);


