var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var exphbs = require('express-handlebars');
var _ = require('underscore');

var port = process.env.PORT || 3000;

// set view engine and express app
app.engine('handlebars', exphbs( { defaultLayout: 'main' } ));
app.set('view engine', 'handlebars');

// reset static files path
app.use('/css', express.static(__dirname + '/node_modules/materialize-css/dist/css'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/node_modules/materialize-css/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/handlebars/dist'));
app.use('/fonts', express.static(__dirname + '/node_modules/materialize-css/dist/fonts/'));
app.use('/sweetalert', express.static(__dirname + '/node_modules/sweetalert/dist'));


// Router area
app.get('/', function (req, res) {
    res.render('index');
});

// user for list all user
var users = [];

// socket.io function
io.on('connection', function(socket){

    // listen on 'new user added' events
    socket.on('join',function(name){
        socket.username = name;

        var userinfo = setUserIcon(socket.username);
        // {
        //     userName: name,
        //     userFirstChar: firstcha,
        //     userColor: userColor
        // }

        users.push(userinfo);

        io.emit('join', socket.username );
        socket.emit('setUserInfo', userinfo);

        // update user list
        updateClients();
    });

    // disconnect user event
    socket.on('disconnect', function(){

        for(var i=0; i<users.length; i++) {
            if(users[i].userName == socket.username) {
                users.splice(i, 1);
            }
        }



        console.log( socket.username + ' - disconnected');
        io.emit('disconnect', socket.username);
        updateClients();
    });


    // listen on 'chat message' events, emit to all user except sender
    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    });

});

function updateClients() {
    io.emit('update', users);
}

// set user represent name and color
function setUserIcon (name) {

    var firstcha = name.substr(0, 2);

    var colorpalette = ['#F44336', '#D32F2F', '#E91E63', '#C2185B', '#9C27B0', '#7B1FA2', '#673AB7', '#512DA8', '#3F51B5', '#303F9F', '#2196F3', '#0288D1', '#009688', '#00796B', '#FFC107', '#FF5722']
    var userColor = _.sample(colorpalette);

    return {
        userName: name,
        userFirstChar: firstcha,
        userColor: userColor
    }

}


http.listen(port, function () {
      console.log('Example app listening on port 3000!');
});
