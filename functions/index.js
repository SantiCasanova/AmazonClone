const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")
const stripe = require("stripe")('sk_test_51KP5OLHMLwnthcDCAES40Z3LfEgMd03q7qFW03VVO99yuBV08CJcdJRumCFIsLB4y9kC8psJfTfxht1ZxJHBu0CG00FM7XH5JB')

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('payment total ---> ', total);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// http://localhost:5001/clone-e4359/us-central1/api

exports.api = functions.https.onRequest(app);