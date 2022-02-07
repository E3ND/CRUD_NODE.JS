// Configuração inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

//Necessario para o front ler
var cors = require('cors')
app.use(cors())

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// Chamando a rota person e enserindo ela
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);


// Rota inicial/endpoint
app.get('/', (req, res) =>{

    // Mostrar requisição
    res.json({message: 'Tudo certo por aqui!'})

})

// 45.227.76.153 IP
// 8299102 Senha
// mongodb+srv://Bruno:8299102@nodecluster0.dcnx3.mongodb.net/bancodaapi?retryWrites=true&w=majority

// Caso de erro de na conecção unescaped
// const DB_USER = 'Bruno';
// const DB_PASSWORD = encodeURIComponent('8299102');

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@nodecluster0.dcnx3.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conectado ao MongoBD")
        // Entregar uma porta
        app.listen(3000);
    })
    .catch((err) => console.log(err))