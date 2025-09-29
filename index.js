import express from 'express'
import pool from './config/conexion.js'
const app = express()
const port = 3000

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
    const id = req.params.id
    const sql = 'select * from users where ID_User = ?'
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id])
        connection.release()
        res.json(rows)
    } catch(error){
        res.status(500).send('Error con la consulta')
    }
})

app.post('/users', (req, res) => {
    
})
app.put('/users', (req, res) => {
    
})
app.delete('/users', (req, res) => {
    
})
app.use((req,res) =>{
    res.status(404).send('Pagina Inexistente')
})
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`))