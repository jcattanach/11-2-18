const express = require('express')
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
var session = require('express-session')
const app = express()
const port = 3000

let users = []
let products = [{ product : 'apple watch', price : '300', seller : 'apple'},{ product : 'iPhone X', price : '900', seller : 'apple'},{ product : 'iPhone 8', price : '800', seller : 'apple'},{ product : 'Galaxy 8', price : '800', seller : 'samsung'},{ product : 'Galaxy Note 9', price : '900' , seller : 'samsung'}]

app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')
app.use(session({
  secret: '1a2s3d4f',
  resave: false,
  saveUninitialized: false
}))

app.get('/register', function(req,res){
  res.render('register')
})
app.post('/register', function(req,res){
  let registerUsername = req.body.username
  let registerPassword = req.body.password

  let userInfo = { username : registerUsername, password : registerPassword}
  users.push(userInfo)
  console.log(users)

  res.redirect('/login')
})

app.get('/login', function(req,res){
  res.render('login')
})

app.post('/login', function(req,res){
  let loginUsername = req.body.username
  let loginPassword = req.body.password

  for(let index = 0; index < users.length; index++){
    if (loginUsername == users[index].username && loginPassword == users[index].password){
      console.log("Login successful")
      res.redirect('/products')
    } else {
      console.log('Username or password is incorrect')
      res.redirect('/login')
    }
  }
})

app.get('/products', function(req,res){
  res.render('products',{ productsElement : products })
})

app.get('/checkout', function(req,res){
  res.render('checkout')
})


app.get('/', function(req,res){
  res.redirect('/login')
})

app.listen(port, function(){
  console.log('server is running....')
})
