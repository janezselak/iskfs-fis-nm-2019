var http = require("http").createServer(handler); 
var io = require("socket.io").listen(http); 
var fs = require("fs"); 
var firmata = require("firmata") ; 

console.log("Startanje JS kodo") ; 

var board = new firmata.Board("/dev/ttyACM0", function(){
        console.log("Povezovanje na Arduino") ; 
        console.log("Aktivacija pina 13") ; 
        board.pinMode(13,board.MODES.OUTPUT); 
    }); 
    
   function handler (req, res){
       fs.readFile(__dirname + "/primer04.html", function(err, data){
        
                if(err){
                    res.writeHead(500,{"Content-type":"text/plain"}); 
                    res.end("Napaka pri nalagnju strani!") ; 
                    return; }
                res.writeHead(200); 
                res.end(data); 
           
            }
       );
   }
   
 
   http.listen(8080);
   
   io.sockets.on("connection", function(socket){
       socket.on("ukazOdArduina", function(stukaza) {
                    if(stukaza=="0") {
                        board.digitalWrite(13,board.MODES.LOW) ; 
                    }
                    if(stukaza=="1"){
                        board.digitalWrite(13,board.MODES.HIGH) ; 
                    }
                }
           );
    }
       
);