import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressLayouts from 'express-ejs-layouts';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import msauthRouter from "./routes/msauth/msauthRouter.ts";
import {Path} from "./routes/msauth/msauthRouterPaths.ts";

const app = express();

// view engine setup
app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(Path.fullRoot, msauthRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
