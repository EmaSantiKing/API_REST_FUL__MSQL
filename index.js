    import express from 'express'
    import pool from './config/conexion.js'
    const app = express()
    const port = 3000

    app.use(express.json())
    app.get('/', (req, res) => {
        res.send('API_REST_FUL__MYSQL')
    })

    app.get('/users', async (req, res) => {
        const sql = 'select * from users'
        try{
            const connection = await pool.getConnection()
            const [rows] = await connection.query(sql)
            connection.release()
            res.json(rows)
        } catch(error){
            res.status(500).send('Error con la consulta')
        }
    })

    app.get('/users/:id', async (req,res) => {
        const id = parseInt(req.params.id)
        const sql = 'select * from users where ID_User = ?'
        try{
            const connection = await pool.getConnection()
            const [rows] = await connection.query(sql, [id])
            connection.release()
            if (rows[0]) {res.json(rows[0])} else {res.status(404).send("User no existe")}
            // (rows[0])? res.json(rows[0]) : res.status(404).send(`User no existe`)
        } catch(error){
            res.status(500).send('Error con la consulta')
        }
    })

    app.post('/users', async (req, res) => {
    const values = req.body;
    const sql = "INSERT INTO users SET ?";
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [values]);
        connection.release();   
        res.status(201).send(`Nuevo user creado con ID: ${result.insertId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error con la inserción');
    }
});

    app.put("/users/:id", async(req, res) => {
  const id = req.params.id;
  const newValues = req.body
  const sql = `UPDATE users SET ? WHERE id_user = ?`;

  try{ 
    const conection = await pool.getConnection(); 
    const [rows] = await conection.query(sql, [newValues, id]);
    conection.release(); 
    
    console.log(rows);
    (rows.affectedRows == 0)? res.status(404).send("Usuario no existe") : res.send("Datos actualizados")

  }catch(error){ 
    res.status(500).send("algo salio mal")
  }
});

app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).send("ID inválido");

    const sql = "DELETE FROM users WHERE ID_User = ?";

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(sql, [id]);
        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).send("Usuario no existe");
        } else

        res.send(`Usuario con ID: ${id} eliminado`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error con la consulta");
    }
});


    app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))