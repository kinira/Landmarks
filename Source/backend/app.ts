import * as path from 'path'
import * as express from 'express';
import * as favicon from 'serve-favicon'
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { v1 as neo4j } from 'neo4j-driver';
import {config} from './config'
import { router as index } from './routes/index';

var app = express();
var db = neo4j.driver(config.dbConnection, neo4j.auth.basic(config.dbUsername, config.dbPassword));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs'); // template engine

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/', index);

// If nothing matched: catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  next(err);
});

// error handler
app.use(function (err: Error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.message.indexOf("Not Found") >= 0 ? 404 : 500);
  res.json('error');
});

export default app;
export { db };
