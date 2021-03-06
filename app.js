'use strict';
const http = require('http');
const debug = require('debug')('rest-api:server');
const express = require('express');
const app = express();
const server = http.createServer(app);
const vhost = require('vhost');
const admin = express.Router();

const bodyParser = require('body-parser');
const MongoSessionStore = require('session-mongoose')(require('connect'));
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./db/db')(app);
const config = require('./config');
const path = require('path');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';
app.set('port', PORT);

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'jade');
app.use('/public', express.static(path.join(__dirname, 'public')));

//set up sessions
const sessionStore = new MongoSessionStore({
  url: config.mongo[app.get('env')].connectionString
})
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret,
    store: sessionStore
}));

//logger
if (app.get('env') === 'development') {
    app.use(require('morgan')('dev'));
} else if ((app.get('env') === 'production')) {
    app.use(require('express-logger')({
        path: __dirname + '/log/request.log'
    }));
}
//set up auth
const auth = require('./lib/auth')(app,{
  baseUrl: process.env.BASE_URL,
  providers: config.authProviders,
  successRedirect: '/',
  failureRedirect: '/unauthorized'
});
auth.init();
auth.registerRoutes();

//using subdomens
app.use(vhost('admin.*', admin));
admin.get('/', (req, res, next) => {
  res.render('admin/admin');
});

app.use('/', require('./routes/routes'));

//error handling middleware
app.use((err, req ,res, next) => {
    // res.status(err.status);
    res.send({error: err.message});
    console.log(err.message);
});

//listening server
const startServer = () => {
    server.listen(PORT, IP, () => {
        console.log('server is running at port ' + PORT + ' в среде ' + app.get('env'));
    });

    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = typeof PORT === 'string'
            ? 'Pipe ' + PORT
            : 'Port ' + PORT;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

};

if(require.main === module) {
    startServer();
} else {
    module.exports = startServer;
}
