require('dotenv').config();

const express = require('express')
const app = express()
const ejsMate=require("ejs-mate");
const mongoose = require('mongoose');
const certificates = require('./init/data'); 
const Certificate = require('./models/certificate');

// const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const path = require('path');


app.set('view engine', 'ejs');
app.engine('ejs',ejsMate);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


// app.get('/success', (req, res) => {
//   res.send(' Thank you for your donation! (Demo)');
// });
app.get("/",(req,res)=>{
  // res.send("events page");
  res.render("pages/home.ejs");
})

app.get("/events",(req,res)=>{
  // res.send("events page");
  res.render("pages/events.ejs");
})


app.get("/gallery",(req,res)=>{
  // res.send("events page");
  res.render("pages/gallery.ejs");
});

app.get("/donate",(req,res)=>{
  // res.send("events page");
  res.render("pages/donate.ejs");
});

app.get("/donors",(req,res)=>{
  // res.send("events page");
  res.render("pages/donors.ejs");
});
app.get("/privacy",(req,res)=>{
  // res.send("events page");
  res.render("pages/privacy.ejs");
});

// app.get("/backend/events",(req,res)=>{
//   // res.send("events page");
//   res.render("events.ejs");
// })


// app.get('/', (req, res) => {
//   // res.render("index.html");
//   res.send("hello!");
// })

app.get('/workshops', (req, res) => {
  res.render('pages/workshops'); 
});

app.get('/trees', (req, res) => {
  res.render('pages/trees'); 
});

app.get('/suv_events', (req, res) => {
  res.render('pages/suv_event'); 
});

app.get('/animal', (req, res) => {
  res.render('pages/animal'); 
});
app.get('/books', (req, res) => {
  res.render('pages/books'); 
});
app.get('/clothes', (req, res) => {
  res.render('pages/clothes'); 
});
app.get('/education', (req, res) => {
  res.render('pages/education'); 
});
app.get('/emp_women', (req, res) => {
  res.render('pages/emp_women'); 
});
app.get('/food', (req, res) => {
  res.render('pages/food'); 
});
app.get('/free', (req, res) => {
  res.render('pages/free'); 
});

app.get('/online', (req, res) => {
  res.render('pages/online'); 
});

app.get('/women', (req, res) => {
  res.render('pages/women'); 
});


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // if you have CSS/JS/assets


app.get('/verify-certificate', (req, res) => {
  res.render('pages/verify.ejs', { cert: null, error: null });
});


app.post('/verify-certificate', async (req, res) => {
  const { certificate_id } = req.body;

  try {
    const cert = await Certificate.findOne({ certificate_id: certificate_id.trim() });

    if (!cert) {
      return res.render('pages/verify', { cert: null, error: 'Invalid Certificate ID' });
    }

    res.render('pages/verify', { cert, error: null });
  } catch (err) {
    console.error(err);
    res.render('verify', { cert: null, error: 'Something went wrong. Try again later.' });
  }
});

// mongoose.connect('mongodb://127.0.0.1:27017/suvidha_certificates', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(async () => {
//   console.log(' MongoDB connected in app.js');

  // const existing = await Certificate.countDocuments();
  // if (existing === 0) {
  //   await Certificate.insertMany(certificates);
  //   console.log('Sample certificates inserted into DB');
  // } else {
  //   console.log(' Certificates already exist, skipping insert');
  // }

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log(' MongoDB connected');

    const existing = await Certificate.countDocuments();
    if (existing === 0) {
      await Certificate.insertMany(certificates);
      console.log('Sample certificates inserted into DB');
    } else {
      console.log('Certificates already exist, skipping insert');
    }


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.use(express.json());

app.get('/donate', (req, res) => {
  res.render('pages/donate');
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount < 1) {
    return res.status(400).json({ error: 'Invalid donation amount' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Suvidha Foundation',
            },
            unit_amount: parseInt(amount * 100), 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


app.listen(3000, (req,res) => {
  console.log("app is listening on port 3000");
});

})
.catch(err=>console.error("failed",err));