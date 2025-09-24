import mysql from 'mysql2/promise'
const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    passwoord:"",
    database:'tienda',
    connectionlimit: 5
})
//test de conexion
pool.getConnection()
.then(connection => {
    console.log('Conexion exitosa')
    connection.release //liberar la conexion
})
.catch(error => {
    console.log('Error de conexion')
})

export default pool