import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('API_REST_FUL__MYSQL')
})
app.post('/', (req, res) => {
    
})
app.put('/', (req, res) => {
    
})
app.delete('/', (req, res) => {
    
})
app.use((req,res) =>{
    res.status(404).send('Pagina Inexistente')
})
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))