
var mysql = require("mysql");

export async function conn() {
    const connect = mysql.createConnection({
        host:'34.66.117.163',
        user:'root',
        password:'SA12345',
        database: 'proyectosa'
    })  ;
    return connect;
}


/*var connection = mysql.createConnection({

    host:'34.66.117.163',
    user:'root',
    password:'SA12345',
    database: 'proyectosa'
  });
*/
  