const express = require('express');
/** load middlewares */

/** load services */

/** load modules as routes */
const UserRoutes = require('./modules/user/user.routes');
const AuthRoutes = require('./modules/auth/auth.routes');
const ContactRoutes = require('./modules/contact/contact.routes');

/** declare application and load middleware */
const app = express();

app.get('/',(req,res) => {
    res.json({ alive: true });
})

app.use('/api/users',require(UserRoutes));
app.use('/api/contacts',require(ContactRoutes));
app.use('/api/auth',require(AuthRoutes));


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})