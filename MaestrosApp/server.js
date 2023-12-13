const express = require('express');
const dotenv = require('dotenv');/*creacion de dotenv para no mostrar el verdadero localhost*/
const morgan = require('morgan');
//modules
const bodyparser = require("body-parser")
const path = require('path');

//llamar a mongodb luego de config.env
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( {path:'config.env'} )
const PORT =process.env.PORT || 8080/*opcion de port*/

//log requests
app.use(morgan('tiny'))

//mongodb conexion
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine, visuales porqué en default es 'view', así que la siguiente linea deabajo es el fix  
app.set('views', path.join(__dirname, 'visuales'));
app.set("view engine", "ejs")
//app.set("visuales",path.resolve(__dirname, "visuales/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
//css/style.css
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//cargar routers
app.use('/', require('./server/routes/router'));


app.listen(PORT, () => {
    console.log(`El servidor está funcionando en: http://localhost:${PORT}`);
});/* port env*/
