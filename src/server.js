const express = require('express');

/** load middlewares */
const { HttpExceptionTransformer } = require('http-exception-transformer');

/** load services */
const { initializeMongoDB } = require('./services/database');

/** load modules as routes */
const UserRoutes = require('./modules/user/user.routes');
const AuthRoutes = require('./modules/auth/auth.routes');
const ContactRoutes = require('./modules/contact/contact.routes');

/** declare application and load middleware */
const app = express();

/** to recognize the incoming Request Object as a JSON Object */
app.use(express.json());

/** initialize services */
initializeMongoDB();

app.get('/',(req,res) => {
    res.json({ alive: true });
})

app.use('/api/users',UserRoutes);
app.use('/api/contacts',ContactRoutes);
app.use('/api/auth',AuthRoutes);

/** transform all errors into standard messages */
app.use(HttpExceptionTransformer);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})