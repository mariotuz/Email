const sql = require('mssql/msnodesqlv8');
var dbConfig;

class DBConexion {
    constructor() {
        dbConfig = {
            driver: 'msnodesqlv8',
            connectionString: 'Driver={SQL Server Native Client 11.0};Server={sysapp001};Database=gesa;Trusted_Connection={yes};'
        };
    }

    getDatos() {
        sql.connect(dbConfig, function(err) {
            if (err) {
                console.log("Error mientras se conectaba a la BD :- " + err);
                sql.close();
            } else {
                var request = new sql.Request();
                request.execute('[sp_Obtiene_Correos]', function(err, data) {
                    if (err) {
                        console.log("Error mientras se conectaba a la BD  :- " + err);
                    } else {
                        var Datos = data.recordset;
                        return Datos;
                    }
                    sql.close();
                });
            }
        });
    }

}



module.exports = DBConexion;