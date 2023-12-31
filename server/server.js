const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const dreamRouter = require('./routes/dream.router');
const interpretationRouter = require('./routes/interpretation.router');
const titleRouter = require('./routes/title.router')
const dreamImageRouter = require('./routes/dreamimage.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/dream', dreamRouter);
app.use('/api/interpretation', interpretationRouter);
app.use('/api/title', titleRouter);
app.use('/api/image', dreamImageRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
