const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv');
const CORSMiddleware = require('./controller/http/middleware/CORS.middleware');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.route');
const expertRouter = require('./routes/expert.route');
const expertiseRouter = require('./routes/expertise.route');
const forgotRouter = require('./routes/forgot.route');
const languageRouter = require('./routes/language.route');
const listingRouter = require('./routes/listing.route');
const profileRouter = require('./routes/profile.route');
const profileExpertRouter = require('./routes/profileexpert.route');
const reviewRouter = require('./routes/review.route');
const cityRouter = require('./routes/city.route');
const tagsRouter = require('./routes/tags.route');
const protipRouter = require('./routes/protip.route');
const cacheRouter = require('./routes/cache.route');
const bannerRouter = require('./routes/banner.route');
const pagesRouter = require('./routes/pages.route');
const reportRouter = require('./routes/report.route');
const searchRouter = require('./routes/search.route');
const orderRouter = require('./routes/order.route');
const listingIndexRouter = require('./routes/listing_index.route');

env.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ imit: '50mb', extended: true }));

app.use(express.json());
app.use(logger('dev'));
app.use(CORSMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/user', authRouter);
app.use('/user', expertRouter);
app.use('/user', expertiseRouter);
app.use('/user', forgotRouter);
app.use('/user', languageRouter);
app.use('/user', listingRouter);
app.use('/user', profileRouter);
app.use('/user', profileExpertRouter);
app.use('/user', reviewRouter);
app.use('/user', cityRouter);
app.use('/user', tagsRouter);
app.use('/user', bannerRouter);
app.use('/user', cacheRouter);
app.use('/user', pagesRouter);
app.use('/user', protipRouter);
app.use('/user', reportRouter);
app.use('/user', orderRouter);
app.use('/', searchRouter);
app.use('/user', listingIndexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
