const express = require('express');
require('dotenv').config();
process.env.SERVER_SESSION_SECRET;

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const destinationRouter = require('./routes/destination.router');
const habitsRouter = require('./routes/habits.router');
const dailyRouter = require('./routes/daily.router')

// Express middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/destinations', destinationRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/daily', dailyRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
