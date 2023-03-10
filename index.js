const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const Post = require('./models/Post');

//CONFIG
//Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main', runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true, }, }))
app.set('view engine', 'handlebars')
//BODY PARSER
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

//ROUTES

app.get('/', function (req, res) {

    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
        res.render('home', { posts: posts })
    })
})

app.get('/cadastro', function (req, res) {

    res.render('formulario')

})

app.post('/add', function (req, res) {

    Post.create({

        titulo: req.body.titulo,
        conteudo: req.body.conteudo

    }).then(function () {

        res.redirect('/')

    }).catch(function (erro) {

        res.send('Ocorreu um erro: ' + erro)

    })

})

app.get('/deletar/:id', function (req, res) {

    Post.destroy({ where: { id: req.params.id } }).then(function () {

        res.send("Postagem deletada!")

    }).catch(function (erro) {

        res.send("Erro ao deletar " + erro)

    })

})


app.listen(8000, function () {

    console.log("Servidor rodando na url http://localhost:8000");

})