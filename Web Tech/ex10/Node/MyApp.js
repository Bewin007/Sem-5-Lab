const http = require('http');
const fs = require('fs');


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
        .then(function(){
            console.log('DB Connected')
        })
const customerSchema = new mongoose.Schema({name:String,password:String,age:String,mobilenumber:String,email:String,gender:String,state:String});
const customermodel = mongoose.model('customers',customerSchema)


const server = http.createServer(function(req,res){
    if(req.url === '/'){
        res.writeHead('200',{'Content-Type':'text/html'});
        fs.createReadStream('home.html').pipe(res);
    }
    else if(req.url === '/register' && req.method === 'POST'){
        var rawdata = '';
        req.on('data',function(data){
            rawdata += data;
        })
        req.on('end',function(){
            var formdata = new URLSearchParams(rawdata);
            res.writeHead('200',{'Content-Type':'text/html'});
            customermodel.create({name:formdata.get('name'),
                                  password:formdata.get('password'),
                                  age:formdata.get('age'),
                                  mobilenumber:formdata.get('mobilenumber'),
                                  email:formdata.get('email'),
                                  gender:formdata.get('gender'),
                                  state:formdata.get('state')

        })
        res.write('Data Saved Successfully');
        res.end();
        })
    }
    else if(req.url === '/view' && req.method === "GET"){
        res.writeHead('200',{'Content-Type':'text/html'});
        customermodel.find().then(function(customers){
            res.write("List Customer Details");
            res.write("<table border=1 cellspacing=0 width=400>");
            res.write("<tr><th>Name</th><th>Password</th><th>Age</th><th>Mobile Number</th><th>Email</th><th>Gender</th><th>State</th>");
            customers.forEach(customers=>{
                res.write("<tr>");
                res.write("<td>"+customers.name+"</td>");
                res.write("<td>"+customers.password+"</td>");
                res.write("<td>"+customers.age+"</td>");
                res.write("<td>"+customers.mobilenumber+"</td>");
                res.write("<td>"+customers.email+"</td>");
                res.write("<td>"+customers.gender+"</td>");
                res.write("<td>"+customers.state+"</td>");
                res.write("</tr>");
            })
            res.end();
        })
    }
})
server.listen('8000',function(){
    console.log('Server started at port http://127.0.0.1:8000')
})