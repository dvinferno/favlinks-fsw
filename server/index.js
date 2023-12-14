const bodyParser = require('body-parser');
const db = require('./db')
const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

const clientPath = path.resolve(__dirname, '../client/dist')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(clientPath))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

app.get('/api/links', db.getLinks)
app.post('/api/links', db.createLink)
app.post('/api/links/delete', db.deleteLink)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
