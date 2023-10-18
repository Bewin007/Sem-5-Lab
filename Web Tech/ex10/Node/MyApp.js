const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req,res){

    if (req.url == '/'){
        res.writeHead(200,{'Content-Type': 'text/html'})
        fs.createReadStream('app.html').pipe(res)
        


    }
})

server.listen('3000',function(){
    console.log('server stated')
})