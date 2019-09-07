const sql = require('mssql/msnodesqlv8');

var dbConfig = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={sysapp001};Database=gesa;Trusted_Connection={yes};'
};

let GetDatos = (Cuantos) => {

    return new Promise((resolve, reject) => {
        sql.connect(dbConfig, function(err) {
            if (err) {
                reject("Error mientras se conectaba a la BD :- " + err);
                sql.close();
            } else {
                var request = new sql.Request();
                request.execute('[sp_Obtiene_Correos]', function(err, data) {
                    if (err) {
                        reject("Error mientras se conectaba a la BD  :- " + err);
                    } else {
                        resolve(data.recordset)
                    }
                    sql.close();
                });
            }
        });

    })

};


module.exports = { GetDatos }