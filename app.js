var express = require('express')
var bodyParser = require('body-parser')

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'task 2'
});
 
connection.connect();

var app = express();

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res){

    var query = "select * from admin"

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.render('index',{results});
      });
})

app.post('/',function(req,res){

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var contact = req.body.contact;
    var gender = req.body.gender;

    var query = "insert into admin(name,email,password,contact,gender)values('"+name+"','"+email+"','"+password+"','"+contact+"','"+gender+"')"

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/dash');
      });

});



app.post('/user',function(req,res){

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var contact = req.body.contact;
    var gender = req.body.gender;

    var query = "insert into user(name,email,password,contact,gender)values('"+name+"','"+email+"','"+password+"','"+contact+"','"+gender+"')"

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/dash');
      });

});

app.get('/delete/:id',function(req,res){
    
    var id=req.params.id;

    var query="delete from user where id="+id;

    connection.query(query,function (error, results, fields) {
        if (error) throw error;
        res.redirect('/dash')
    });
})




app.get('/dash',function(req,res){
    var query = "select * from user"
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.render('dash',{results})
      });
})

app.get('/dash',function(req,res){
    var query = "insert into user(name,email,password,contact,gender)values('"+name+"','"+email+"','"+password+"','"+contact+"','"+gender+"')"
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/user')
      });
})



app.listen(3000);