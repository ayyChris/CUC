//request data
const axios = require('axios');

//render different files using router

exports.homeRoutes = (req, res) => {
    //pedir request a /API/Users
    axios.get("http://localhost:3001/API/Users")
        .then(function (response) {
            res.render('index', { maestros: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.registar_maestro = (req, res) => {
    res.render('registrarMaestro');
}

exports.modificar_maestro = (req, res) => {
    axios.get('http://localhost:3001/API/Users', { params: { id: req.query.id } })
        .then(function (userdata) {
            const data = userdata.data.filter(element => element._id === req.query.id )
            res.render("modificar_maestro", { maestro: data })
        })
        .catch(err => {
            res.send(err);
        })
}