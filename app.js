const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const expHbs = require('express-handlebars');

const app =express();

//Handlebars middleware
app.engine('handlebars', expHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static folder
app.use(express.static(`${__dirname}/public`));

//Index Route
app.get('/',(req,res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

//charge route
app.post('/charge', (req,res) => {
    const amount = 2000;
    console.log(req.body);
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount: 2000,
        description:'Web Development EBook',
        currency: 'cad',
        customer: customer.id
    }))   
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});