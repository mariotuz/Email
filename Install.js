var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'Envio_Emails_GESA',
    description: 'Envia correos del sistema GESA',
    script: 'C:\\Users\\mario.tuz\\Documents\\Produccion\\Email\\AppEmail.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    svc.start();
});

svc.install();