require('dotenv').config();

const express = require('express');
const app = express();
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const certificates = require('./init/data'); 
const Certificate = require('./models/certificate');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//middlewares
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.get("/", (req, res) => res.send("hi"));
app.get("/", (req, res) => res.render("pages/home"));
app.get("/events", (req, res) => res.render("pages/events"));
app.get("/gallery", (req, res) => res.render("pages/gallery"));
app.get("/donate", (req, res) => res.render("pages/donate"));
app.get("/donors", (req, res) => res.render("pages/donors"));
app.get("/privacy", (req, res) => res.render("pages/privacy"));
app.get("/workshops", (req, res) => res.render("pages/workshops"));
app.get("/trees", (req, res) => res.render("pages/trees"));
app.get("/suv_events", (req, res) => res.render("pages/suv_event"));
app.get("/animal", (req, res) => res.render("pages/animal"));
app.get("/books", (req, res) => res.render("pages/books"));
app.get("/clothes", (req, res) => res.render("pages/clothes"));
app.get("/education", (req, res) => res.render("pages/education"));
app.get("/emp_women", (req, res) => res.render("pages/emp_women"));
app.get("/food", (req, res) => res.render("pages/food"));
app.get("/free", (req, res) => res.render("pages/free"));
app.get("/online", (req, res) => res.render("pages/online"));
app.get("/women", (req, res) => res.render("pages/women"));

// Certificate Verification 
app.get('/verify-certificate', (req, res) => {
  res.render('pages/verify', { cert: null, error: null });
});
// app.use(CORS())

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
    res.render('pages/verify', { cert: null, error: 'Something went wrong. Try again later.' });
  }
});
//donation
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
            product_data: { name: 'Donation to Suvidha Foundation' },
            unit_amount: parseInt(amount * 100), // cents
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


mongoose.connect("process.env.MONGO_URI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log(" Local MongoDB Connected");

  
  app.listen(3000, () => {
    console.log(" App is listening on port 3000");
  });
})
.catch(err => console.error(" MongoDB connection failed:", err));
