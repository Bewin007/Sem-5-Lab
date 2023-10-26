const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');
const { URLSearchParams } = require('url'); // Required for parsing form data

mongoose.connect('mongodb://127.0.0.1:27017/UsersDB').then(function(){
    console.log('Database connected');
});

const userschema = new mongoose.Schema({
    Name: String,
    Password: String,
    Age: Number,
    MobileNumber: Number,
    Email: String,
    Gender: String,
    State: String
});

const usermodel = mongoose.model('Users', userschema);

const server = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('home.html').pipe(res); // Serve the HTML form
    } else if (req.url === '/save' && req.method === 'POST') {
        let rawdata = '';
        req.on('data', function(data) {
            rawdata += data;
        });

        req.on('end', function() {
            let formdata = new URLSearchParams(rawdata);
            usermodel.create({
                Name: formdata.get('name'),
                Password: formdata.get('pass'),
                Age: formdata.get('age'),
                MobileNumber: formdata.get('num'),
                Email: formdata.get('email'),
                Gender: formdata.get('gender'),
                State: formdata.get('state')
            }, function(err, user) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.write('Error saving data');
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write('Data Saved Successfully');
                    res.end();
                }
            });
        });
    }
});

server.listen(8000, function() {
    console.log('Server started');
});
