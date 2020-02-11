const sql = require('mssql/msnodesqlv8');

var dbConfig = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={sysapp001};Database=gesa;Trusted_Connection={yes};'
};

// var dbConfig = {
//     driver: 'msnodesqlv8',
//     connectionString: 'Data Source=sysapp001;User Id=usr_grupos;Password=p_grupos;Initial Catalog=gesa;Integrated Security=True";'
// };

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
                        console.log('---Obtiene correos de la BD---'.yellow);
                        console.log(('Total de correos a enviar: ' + (data.recordset.length)).yellow);
                        resolve(data.recordset)
                    }
                    sql.close();
                });
            }
        });

    });

};

let ActualizarStatus = (InfoStatus) => {

    return new Promise((resolve, reject) => {
        sql.connect(dbConfig, function(err) {
            if (err) {
                reject("Error mientras se conectaba a la BD :- " + err);
                sql.close();
            } else {
                var request = new sql.Request();
                request.execute("[Actualiza_Correo] @Id_Email = " + parseInt(InfoStatus.IdEmail) + ",  @Comentarios = '" + InfoStatus.Comentarios + "'", function(err, data) {
                    if (err) {
                        reject("Error en Update  : " + err);
                    } else {
                        console.log(('Respuesta: ' + (data.recordset[0].Respuesta)).bgGreen);
                        resolve(data.recordset);
                    }
                    sql.close();
                });
            }
        });

    });

};

module.exports = { GetDatos, ActualizarStatus }

//https://social.technet.microsoft.com/wiki/contents/articles/36720.sql-server-crud-actions-using-node-js.aspx