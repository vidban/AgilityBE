const express = require('express');
const ExpressError = require('./expressError');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const eventsRoutes = require('./routes/events');
const todosRoutes = require("./routes/todos");
const morgan = require('morgan');
const {logger} = require("./middleware");
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true}));
app.use(logger);
app.use(morgan('tiny'));

app.use('/todos', todosRoutes);
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);
app.use('/', authRoutes);

app.use((error, req,res,next)=> {
    let status = error.status || 500;

    return res.status(status).json({
        error: {
            message: error.message,
            status: status
        }
    });
});


module.exports = app;

